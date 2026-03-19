import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Space, Typography, Avatar, Badge, Popover, List, Spin, Dropdown } from 'antd';
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
import dayjs from 'dayjs';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

import Settings from './pages/Settings';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        try {
          const res = await api.get('/profile/me');
          if (res.data.role === 'admin') {
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

  React.useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          setLoadingNotifs(true);
          const res = await api.get('/admin/activity-logs');
          // Sort by newest first and take top 5
          const sorted = res.data.sort((a, b) => dayjs(b.created_at).unix() - dayjs(a.created_at).unix());
          setNotifications(sorted.slice(0, 5));
        } catch (err) {
          console.error('Failed to load activity for notifications', err);
        } finally {
          setLoadingNotifs(false);
        }
      };
      fetchNotifications();
    }
  }, [user]);

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

  const notificationContent = (
    <div style={{ width: 320 }}>
      {loadingNotifs ? (
        <div className="flex justify-center p-4"><Spin /></div>
      ) : notifications.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item className="px-2">
              <List.Item.Meta
                title={<span className="text-sm font-semibold">{item.user_name} - {item.activity_type.toUpperCase()}</span>}
                description={
                  <div className="text-xs mt-1">
                    <span className="text-gray-400">{dayjs(item.created_at).format('MMM DD, YYYY HH:mm')}</span>
                    <p className="mt-1 mb-0 text-gray-600 line-clamp-2">{item.description}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <div className="text-center text-gray-400 p-4">No new notifications</div>
      )}
      <div className="text-center mt-2 border-t pt-2">
        <Button type="link" onClick={() => navigate('/activities')}>View All Activity</Button>
      </div>
    </div>
  );


  const userMenuItems = [
    {
      key: 'profile',
      label: 'My Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Log Out',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

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
                  <Popover content={notificationContent} title="Activity Notifications" trigger="click" placement="bottomRight">
                    <Badge count={notifications.length} overflowCount={99} className="cursor-pointer">
                      <Button type="text" icon={<BellOutlined />} style={{ fontSize: '18px' }} />
                    </Badge>
                  </Popover>
                  <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                    <div className="ml-4 cursor-pointer flex items-center gap-3 hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
                      <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#134377' }} />
                      <div className="hidden sm:flex flex-col justify-center">
                        <Text strong style={{ lineHeight: '1.2' }}>{user?.full_name || 'Admin User'}</Text>
                        <Text type="secondary" style={{ fontSize: '12px', lineHeight: '1.2' }}>Super Admin</Text>
                      </div>
                    </div>
                  </Dropdown>
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
