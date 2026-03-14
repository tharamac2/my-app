import React, { useState } from 'react';
import { 
  Card, Form, Input, Select, Button, Typography, 
  Space, Alert, message, Divider, Tag, Modal 
} from 'antd';
import { 
  SendOutlined, 
  BellOutlined, 
  ThunderboltOutlined,
  NotificationOutlined
} from '@ant-design/icons';
import api from '../utils/api';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AdminNotifications = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    Modal.confirm({
      title: 'Confirm Broadcast',
      content: `This will send a notification to all ${values.target} users. Are you sure?`,
      okText: 'Send Now',
      okType: 'primary',
      onOk: async () => {
        setLoading(true);
        try {
          const res = await api.post('/admin/notifications/broadcast', values);
          message.success(res.data.message);
          form.resetFields();
        } catch (err) {
          console.error(err);
          message.error('Failed to send broadcast');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <Title level={3}>Notification Management</Title>
        <Text type="secondary">Send system-wide broadcasts, announcements, and promotional offers</Text>
      </div>

      <Alert
        message="Broadcast Warning"
        description="Notifications sent here will be delivered instantly to the notification center of selected users' mobile applications. Please verify content before sending."
        type="warning"
        showIcon
        className="rounded-xl"
      />

      <Card bordered={false} className="shadow-md rounded-xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ target: 'all', type: 'announcement' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="target"
              label="Recipient Group"
              rules={[{ required: true }]}
            >
              <Select size="large">
                <Option value="all">
                  <Space><NotificationOutlined /> All Users</Space>
                </Option>
                <Option value="premium">
                  <Space><ThunderboltOutlined className="text-gold-500" /> Premium Users Only</Space>
                </Option>
                <Option value="free">
                  <Space><Text type="secondary">Free Users Only</Text></Space>
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="type"
              label="Message Type"
              rules={[{ required: true }]}
            >
              <Select size="large">
                <Option value="announcement">Announcement</Option>
                <Option value="offer">Special Offer / Promotion</Option>
                <Option value="system">System Alert</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="title"
            label="Notification Title"
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input size="large" placeholder="E.g. Weekend Special: 20% Off Elite Plan" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Message Content"
            rules={[{ required: true, message: 'Please enter message content' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Enter the detailed message here..." 
              maxLength={250}
              showCount
            />
          </Form.Item>

          <Divider />

          <div className="flex justify-between items-center">
            <div className="text-gray-400 text-sm">
              <Space direction="vertical" size={0}>
                <span>Max length: 250 characters</span>
                <span>Type: In-App Notification</span>
              </Space>
            </div>
            <Button 
              type="primary" 
              size="large" 
              icon={<SendOutlined />} 
              loading={loading}
              htmlType="submit"
              className="px-8 h-12 rounded-lg bg-[#134377]"
            >
              Send Broadcast
            </Button>
          </div>
        </Form>
      </Card>

      <Card title="Quick Templates" bordered={false} className="shadow-md rounded-xl">
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={() => form.setFieldsValue({ 
              title: "Profile Completion Reminder", 
              message: "Complete your profile today to get better matches! Users with 100% completion get 3x more interests.",
              type: "announcement"
            })}
          >
            Profile Reminder
          </Button>
          <Button 
            onClick={() => form.setFieldsValue({ 
              title: "New Premium Feature", 
              message: "We've added 'Verified Badges' for Elite members. Upgrade now to stand out!",
              type: "offer",
              target: "free"
            })}
          >
            Upgrade Promo
          </Button>
          <Button 
            onClick={() => form.setFieldsValue({ 
              title: "System Maintenance", 
              message: "The application will be under maintenance on Sunday from 2 AM to 4 AM IST.",
              type: "system",
              target: "all"
            })}
          >
            Maintenance Alert
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminNotifications;
