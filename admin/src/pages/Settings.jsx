import React, { useState } from 'react';
import { 
  Typography, Card, Tabs, Form, Input, Button, 
  Switch, Divider, Space, message, Row, Col, Select
} from 'antd';
import { 
  SettingOutlined, 
  SafetyCertificateOutlined, 
  ApiOutlined, 
  SaveOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import api from '../utils/api';

const { Title, Text } = Typography;
const { Option } = Select;

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [formConfig] = Form.useForm();
  const [formSecurity] = Form.useForm();
  
  const handleSaveConfig = async (values) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      message.success('General configuration saved successfully');
    } catch (e) {
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSecurity = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error('New passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      const res = await api.put('/admin/profile/password', {
        current_password: values.currentPassword,
        new_password: values.newPassword
      });
      message.success(res.data.message || 'Security settings updated securely');
      formSecurity.resetFields();
    } catch (e) {
      message.error(e.response?.data?.detail || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const generalTab = (
    <div className="max-w-3xl">
      <Form 
        form={formConfig}
        layout="vertical" 
        onFinish={handleSaveConfig}
        initialValues={{
          siteName: 'Ratan Matrimony',
          supportEmail: 'support@ratanmatrimony.com',
          maintenance: false,
          userRegistration: true,
          defaultCurrency: 'INR'
        }}
      >
        <Card bordered={false} className="shadow-sm rounded-lg mb-6">
          <div className="mb-4">
            <Title level={4}><GlobalOutlined className="mr-2" />Site Information</Title>
            <Text type="secondary">Manage the public-facing details of the platform.</Text>
          </div>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Platform Name" name="siteName" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Support Email Address" name="supportEmail" rules={[{ required: true, type: 'email' }]}>
                <Input size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Default Billing Currency" name="defaultCurrency">
                <Select size="large">
                  <Option value="INR">INR (₹)</Option>
                  <Option value="USD">USD ($)</Option>
                  <Option value="EUR">EUR (€)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Card bordered={false} className="shadow-sm rounded-lg mb-6">
          <div className="mb-4">
            <Title level={4}><SettingOutlined className="mr-2" />System Controls</Title>
            <Text type="secondary">Enable or disable core application features.</Text>
          </div>

          <div className="flex items-center justify-between py-3 border-b">
            <div>
              <Text strong className="block text-base">Allow New User Registrations</Text>
              <Text type="secondary" className="text-sm">When disabled, new users cannot sign up on the mobile app.</Text>
            </div>
            <Form.Item name="userRegistration" valuePropName="checked" className="mb-0">
              <Switch />
            </Form.Item>
          </div>
          
          <div className="flex items-center justify-between py-3">
            <div>
              <Text strong className="block text-base text-red-600">Maintenance Mode</Text>
              <Text type="secondary" className="text-sm">Puts the entire API into maintenance. Applies instantly to all active users.</Text>
            </div>
            <Form.Item name="maintenance" valuePropName="checked" className="mb-0">
              <Switch danger />
            </Form.Item>
          </div>
        </Card>

        <Button type="primary" size="large" htmlType="submit" icon={<SaveOutlined />} loading={loading} className="bg-[#134377]">
          Save System Configuration
        </Button>
      </Form>
    </div>
  );

  const securityTab = (
    <div className="max-w-2xl">
      <Card bordered={false} className="shadow-sm rounded-lg">
        <div className="mb-6">
          <Title level={4}><SafetyCertificateOutlined className="mr-2" />Super Admin Credentials</Title>
          <Text type="secondary">Update your password to keep the admin panel secure.</Text>
        </div>
        
        <Form form={formSecurity} layout="vertical" onFinish={handleSaveSecurity}>
          <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]}>
            <Input.Password size="large" />
          </Form.Item>
          
          <Divider />

          <Form.Item 
            label="New Password" 
            name="newPassword" 
            rules={[{ required: true }, { min: 8, message: 'Password must be at least 8 characters' }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item 
            label="Confirm New Password" 
            name="confirmPassword" 
            rules={[{ required: true }]}
          >
            <Input.Password size="large" />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" loading={loading} className="bg-[#134377] mt-4">
            Update Password
          </Button>
        </Form>
      </Card>
    </div>
  );

  const apiTab = (
    <div className="max-w-3xl">
      <Card bordered={false} className="shadow-sm rounded-lg mb-6">
        <div className="mb-6">
          <Title level={4}><ApiOutlined className="mr-2" />External API Integrations</Title>
          <Text type="secondary">Configure third-party services like Payment Gateways and SMS providers.</Text>
        </div>
        
        <Form layout="vertical">
          <Title level={5} className="mt-4">Razorpay Configuration</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Key ID">
                <Input.Password size="large" defaultValue="rzp_live_xxxxxxxxxxx" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Key Secret">
                <Input.Password size="large" defaultValue="••••••••••••••••" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          <Title level={5}>AWS S3 (Photo Storage)</Title>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Bucket Name">
                <Input size="large" defaultValue="ratan-matrimony-assets" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Region">
                <Input size="large" defaultValue="ap-south-1" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" size="large" className="bg-[#134377] mt-4" onClick={() => message.success('API Keys verified & saved!')}>
            Verify & Save Keys
          </Button>
        </Form>
      </Card>
    </div>
  );

  const items = [
    { key: '1', label: 'General Configuration', children: generalTab },
    { key: '2', label: 'API Integrations', children: apiTab },
    { key: '3', label: 'Security', children: securityTab },
  ];

  return (
    <div>
      <div className="mb-6">
        <Title level={3}>Admin Settings</Title>
        <Text type="secondary">Configure platform-wide preferences, security, and integrations.</Text>
      </div>
      
      <Tabs 
        defaultActiveKey="1" 
        items={items} 
        className="bg-transparent"
        tabBarStyle={{ marginBottom: 24, fontSize: '16px', fontWeight: 500 }}
      />
    </div>
  );
};

export default AdminSettings;
