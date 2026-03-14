import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Typography, Table, Tag, Spin, message } from 'antd';
import { 
  UserOutlined, 
  CrownOutlined, 
  MessageOutlined, 
  DollarOutlined,
  RiseOutlined,
  ThunderboltOutlined,
  AlertOutlined
} from '@ant-design/icons';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import api from '../utils/api';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/stats');
        setData(res.data);
      } catch (err) {
        console.error(err);
        message.error('Failed to fetch dashboard statistics');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    // Refresh every 30 seconds for real-time feel
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statsCards = [
    { title: 'Total Users', value: data?.total_users || 0, icon: <UserOutlined />, color: '#134377' },
    { title: 'Active Today', value: data?.active_users_today || 0, icon: <ThunderboltOutlined />, color: '#faad14' },
    { title: 'Interests Sent (24h)', value: data?.interests_sent_today || 0, icon: <RiseOutlined />, color: '#52c41a' },
    { title: 'Total Revenue', value: `₹ ${data?.total_revenue?.toLocaleString() || '0'}`, icon: <DollarOutlined />, color: '#722ed1' },
  ];

  if (loading && !data) {
    return <div className="flex h-screen items-center justify-center bg-gray-50"><Spin size="large" /></div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title level={2}>Dashboard Analytics</Title>
          <Text type="secondary">Real-time monitoring of Ratan Matrimony</Text>
        </div>
        <Tag color="processing" icon={<ThunderboltOutlined />}>Live Data Enabled</Tag>
      </div>
      
      <Row gutter={[24, 24]}>
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card bordered={false} className="shadow-md hover:shadow-lg transition-all duration-300 rounded-xl">
              <Statistic
                title={<span className="text-gray-500 font-medium">{stat.title}</span>}
                value={stat.value}
                prefix={<div className="p-2 rounded-lg bg-gray-50" style={{ color: stat.color }}>{stat.icon}</div>}
                valueStyle={{ color: stat.color, fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} className="mt-8">
        <Col span={24} lg={12}>
          <Card title="Registration Trends (14 Days)" bordered={false} className="shadow-md rounded-xl">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={data?.registration_trends}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#134377" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#134377' }} 
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        <Col span={24} lg={12}>
          <Card title="Revenue Growth (INR)" bordered={false} className="shadow-md rounded-xl">
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={data?.revenue_trends}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#722ed1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#722ed1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#722ed1" 
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="mt-8">
        <Col span={24} lg={16}>
          <Card 
            title="Recent User Activity" 
            bordered={false} 
            className="shadow-md rounded-xl"
            extra={<Tag color="blue">{data?.new_registrations_today || 0} New Today</Tag>}
          >
            <Table 
              dataSource={data?.recent_users || []} 
              rowKey="id"
              columns={[
                { 
                  title: 'Name', 
                  dataIndex: 'full_name', 
                  key: 'name',
                  render: (text) => <Text strong>{text}</Text>
                },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                { 
                  title: 'Joined', 
                  dataIndex: 'created_at', 
                  key: 'joined' 
                },
                {
                  title: 'Status',
                  dataIndex: 'is_verified',
                  key: 'status',
                  render: (verified) => (
                    <Tag color={verified ? 'success' : 'processing'} bordered={false}>
                      {verified ? 'Verified' : 'Pending'}
                    </Tag>
                  )
                }
              ]}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
        <Col span={24} lg={8}>
          <div className="space-y-6">
            <Card title="Critical Alerts" bordered={false} className="shadow-md rounded-xl">
              <div className="space-y-6">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertOutlined className="text-red-500 text-lg" />
                    <span className="font-medium text-red-700">Pending Verification</span>
                  </div>
                  <Tag color="red" className="font-bold">{data?.pending_verifications || 0}</Tag>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <MessageOutlined className="text-orange-500 text-lg" />
                    <span className="font-medium text-orange-700">Unresolved Reports</span>
                  </div>
                  <Tag color="orange" className="font-bold">{data?.unresolved_reports || 0}</Tag>
                </div>
              </div>
            </Card>

            <Card className="shadow-md rounded-xl bg-gradient-to-br from-[#134377] to-[#1a5a9e] text-white">
              <Statistic 
                title={<span className="text-blue-100">Monthly Revenue Goal</span>} 
                value={75} 
                suffix="%" 
                valueStyle={{ color: 'white', fontWeight: 'bold' }}
              />
              <div className="mt-4 h-2 bg-blue-900 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[75%] shadow-[0_0_10px_#60a5fa]" />
              </div>
              <p className="mt-3 text-blue-100 text-sm">₹{data?.revenue_mtd?.toLocaleString()} earned this month</p>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
