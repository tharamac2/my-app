import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('username', values.email);
      formData.append('password', values.password);

      const response = await axios.post('/api/v1/admin/auth/login', formData);
      
      const token = response.data.access_token;
      localStorage.setItem('admin_token', token);
      
      // Verify if user is actually an admin
      const userRes = await axios.get('/api/v1/admin/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!userRes.data.role.includes('admin')) {
        localStorage.removeItem('admin_token');
        message.error('Access denied. You do not have admin privileges.');
      } else {
        onLogin(userRes.data);
        message.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg border-none">
        <div className="text-center mb-8">
          <Title level={2} style={{ color: '#134377' }}>RATAN MATRIMONY</Title>
          <Text type="secondary">Admin Control Panel</Text>
        </div>
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email Address" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading} style={{ backgroundColor: '#134377' }}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
