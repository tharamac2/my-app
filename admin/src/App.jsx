import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Space, Typography, Avatar, Badge } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  HeartOutlined,
  MessageOutlined,
  CrownOutlined,
  BellOutlined,
  AlertOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MonitorOutlined,
} from '@ant-design/icons';

import Dashboard from './pages/Dashboard';
import UserManagement from './pages/Users';
import ActivityLogs from './pages/ActivityLogs';
import Reports from './pages/Reports';
import Subscriptions from './pages/Subscriptions';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import api from './utils/api';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// Remaining Placeholder Pages
const Settings = () => <Title level={2}>Admin Settings</Title>;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        try {
          const res = await api.get('/admin/auth/me');
          if (res.data.role.includes('admin')) {
            setUser(res.data);
          } else {
            localStorage.removeItem('admin_token');
          }
        } catch (err) {
          localStorage.removeItem('admin_token');
        }
      }
      setCheckingAuth(false);
    };
    checkToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
    navigate('/login');
  };

  if (checkingAuth) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user && location.pathname !== '/login') {
    return <Routes><Route path="*" element={<Login onLogin={setUser} />} /></Routes>;
  }

  const menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/users', icon: <UserOutlined />, label: 'Manage Users' },
    { key: '/activities', icon: <MonitorOutlined />, label: 'Activity Logs' },
    { key: '/reports', icon: <AlertOutlined />, label: 'Moderation' },
    { key: '/subscriptions', icon: <CrownOutlined />, label: 'Subscriptions' },
    { key: '/notifications', icon: <BellOutlined />, label: 'Notifications' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Admin Settings' },
  ];

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route
        path="/*"
        element={
          <Layout className="min-h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="shadow-md">
              <div className="flex items-center justify-center h-16 border-b">
                <Title level={4} style={{ margin: 0, color: '#134377' }}>
                  {collapsed ? 'R' : 'RATAN ADMIN'}
                </Title>
              </div>
              <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={({ key }) => navigate(key)}
                className="border-r-0 mt-4"
              />
              <div className="absolute bottom-4 left-0 w-full px-4">
                <Button 
                  type="text" 
                  danger 
                  icon={<LogoutOutlined />} 
                  className="w-full text-left"
                  onClick={handleLogout}
                >
                  {!collapsed && 'Log Out'}
                </Button>
              </div>
            </Sider>
            <Layout>
              <Header className="bg-white flex items-center justify-between px-6 shadow-sm">
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ fontSize: '16px', width: 64, height: 64 }}
                />
                <Space size="large" className="pr-4">
                  <Badge count={5}>
                    <Button type="text" icon={<BellOutlined />} style={{ fontSize: '18px' }} />
                  </Badge>
                  <Space className="ml-4 cursor-pointer">
                    <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#134377' }} />
                    <div className="hidden sm:block">
                      <Text strong>{user?.full_name || 'Admin User'}</Text>
                      <div className="text-xs text-gray-400">Super Admin</div>
                    </div>
                  </Space>
                </Space>
              </Header>
              <Content className="m-6 p-6 bg-white rounded-lg shadow-sm min-h-[280px]">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/activities" element={<ActivityLogs />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
