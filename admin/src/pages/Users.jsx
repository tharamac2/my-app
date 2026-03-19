import React, { useState, useEffect } from 'react';
import { 
  Table, Tag, Space, Button, Input, Modal, message, 
  Typography, Avatar, Descriptions, Divider, List, Image, Form, Spin 
} from 'antd';
import { 
  SearchOutlined, 
  CheckCircleOutlined, 
  StopOutlined, 
  EyeOutlined, 
  LockOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  LoginOutlined
} from '@ant-design/icons';
import api from '../utils/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [viewingUser, setViewingUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleViewDetails = async (id) => {
    try {
      const res = await api.get(`/admin/users/${id}`);
      setViewingUser(res.data);
      setIsModalVisible(true);
    } catch (err) {
      message.error('Failed to load user details');
    }
  };

  const handleVerify = async (id) => {
    try {
      await api.post(`/admin/users/${id}/verify`);
      message.success(`User verified successfully`);
      fetchUsers();
    } catch (err) {
      message.error('Failed to verify user');
    }
  };

  const handleBlock = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to block this user?',
      content: 'This will prevent them from logging in.',
      onOk: async () => {
        try {
          await api.post(`/admin/users/${id}/block`);
          message.warning(`User has been blocked`);
          fetchUsers();
        } catch (err) {
          message.error('Failed to block user');
        }
      },
    });
  };

  const handleResetPassword = async (values) => {
    try {
      await api.post(`/admin/users/${viewingUser.id}/reset-password`, null, {
        params: { new_password: values.password }
      });
      message.success('Password reset successfully');
      setResetModalVisible(false);
      form.resetFields();
    } catch (err) {
      message.error('Failed to reset password');
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'full_name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: '#134377' }}>{text ? text[0] : 'U'}</Avatar>
          <div>
            <div className="font-semibold">{text || 'Anonymous'}</div>
            <div className="text-xs text-gray-400">{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Location',
      key: 'location',
      render: (_, record) => record.location ? `${record.location.city}, ${record.location.state}` : 'N/A'
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Space>
          {record.is_verified ? <Tag color="success">Verified</Tag> : <Tag color="warning">Pending</Tag>}
          {record.is_active ? <Tag color="processing">Active</Tag> : <Tag color="error">Blocked</Tag>}
        </Space>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'last_login',
      key: 'last_login',
      render: (date) => date ? dayjs(date).format('MMM DD, HH:mm') : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            size="small" 
            onClick={() => handleViewDetails(record.id)}
            title="View Details" 
          />
          {!record.is_verified && (
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />} 
              size="small" 
              onClick={() => handleVerify(record.id)}
            >
              Verify
            </Button>
          )}
          {record.is_active ? (
            <Button 
              danger 
              icon={<StopOutlined />} 
              size="small" 
              onClick={() => handleBlock(record.id)}
            >
              Block
            </Button>
          ) : (
            <Button type="link" size="small" onClick={() => message.info('Unblock functionality to be added')}>Unblock</Button>
          )}
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchText.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3}>User Management</Title>
          <Text type="secondary">View and manage all registered application users</Text>
        </div>
        <Input 
          placeholder="Search by name or email" 
          prefix={<SearchOutlined />} 
          style={{ width: 300 }}
          onChange={e => setSearchText(e.target.value)}
        />
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredUsers} 
        loading={loading}
        rowKey="id"
        className="shadow-sm border rounded-lg"
      />

      {/* User Details Modal */}
      <Modal
        title={<Space><EyeOutlined /> User Profile Details</Space>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="reset" icon={<LockOutlined />} onClick={() => setResetModalVisible(true)}>Reset Password</Button>,
          <Button key="close" type="primary" onClick={() => setIsModalVisible(false)}>Close</Button>,
        ]}
        width={800}
      >
        {viewingUser && (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar size={80} style={{ backgroundColor: '#134377' }}>{viewingUser.full_name[0]}</Avatar>
              <div>
                <Title level={3} style={{ margin: 0 }}>{viewingUser.full_name}</Title>
                <Text type="secondary">{viewingUser.email} • ID: {viewingUser.id}</Text>
                <div className="mt-2">
                  <Tag color={viewingUser.is_active ? 'green' : 'red'}>{viewingUser.is_active ? 'ACTIVE' : 'BLOCKED'}</Tag>
                  <Tag color={viewingUser.is_verified ? 'blue' : 'orange'}>{viewingUser.is_verified ? 'VERIFIED' : 'PENDING VERIFICATION'}</Tag>
                </div>
              </div>
            </div>

            <Divider orientation="left">Personal & Professional Info</Divider>
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="Gender">{viewingUser.profile?.gender || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="DOB">{viewingUser.profile?.dob || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Religion">{viewingUser.profile?.religion || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Caste">{viewingUser.profile?.caste || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Education">{viewingUser.details?.education || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Occupation">{viewingUser.details?.occupation || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Income">{viewingUser.details?.annual_income || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Location">
                {viewingUser.location ? `${viewingUser.location.city}, ${viewingUser.location.state}` : 'N/A'}
              </Descriptions.Item>
            </Descriptions>


            <Divider orientation="left">Photo Gallery</Divider>
            <div className="flex flex-wrap gap-4">
              {viewingUser.photos?.map((photo, index) => (
                <Image 
                  key={index}
                  width={120}
                  height={120}
                  className="rounded-lg object-cover"
                  src={photo.photo_url}
                  placeholder={<Spin />}
                />
              ))}
              {(!viewingUser.photos || viewingUser.photos.length === 0) && <Text type="secondary">No photos uploaded</Text>}
            </div>

            <Divider orientation="left">Meta Info</Divider>
            <Descriptions size="small" column={2}>
              <Descriptions.Item label={<Space><CalendarOutlined /> Registered</Space>}>
                {dayjs(viewingUser.created_at).format('MMM DD, YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label={<Space><LoginOutlined /> Last Login</Space>}>
                {viewingUser.last_login ? dayjs(viewingUser.last_login).format('MMM DD, YYYY HH:mm') : 'Never'}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>

      {/* Password Reset Modal */}
      <Modal
        title="Reset User Password"
        open={resetModalVisible}
        onCancel={() => setResetModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleResetPassword}>
          <Form.Item 
            name="password" 
            label="New Password" 
            rules={[{ required: true, message: 'Please enter a new password' }, { min: 6, message: 'Min 6 characters' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Enter new password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
