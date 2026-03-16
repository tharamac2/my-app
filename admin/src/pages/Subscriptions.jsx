import React, { useState, useEffect } from 'react';
import { Table, Tag, Typography, Card, Statistic, Row, Col, Space, Badge, message } from 'antd';
import { CrownOutlined, DollarOutlined, TransactionOutlined } from '@ant-design/icons';
import api from '../utils/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Subscriptions = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      // For now using user list or stats to show premium users
      const res = await api.get('/admin/users');
      const premiumUsers = res.data.filter(u => u.subscription?.tier !== 'free');
      setData(premiumUsers);
    } catch (err) {
      console.error(err);
      message.error('Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'full_name',
      key: 'user',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <div className="text-xs text-gray-400">{record.email}</div>
        </div>
      )
    },
    {
      title: 'Plan',
      dataIndex: ['subscription', 'tier'],
      key: 'plan',
      render: (tier) => (
        <Tag color={tier === 'elite' ? 'purple' : tier === 'pro' ? 'gold' : 'blue'}>
          {tier?.toUpperCase() || 'FREE'}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: ['subscription', 'status'],
      key: 'status',
      render: (status) => (
        <Badge status={status === 'active' ? 'success' : 'default'} text={status?.toUpperCase() || 'INACTIVE'} />
      )
    },
    {
      title: 'Expiry Date',
      dataIndex: ['subscription', 'expires_at'],
      key: 'expiry',
      render: (date) => date ? dayjs(date).format('MMM DD, YYYY') : 'N/A'
    }
  ];

  return (
    <div className="space-y-6">
      <Row gutter={[24, 24]}>
        <Col span={24} lg={8}>
          <Card bordered={false} className="shadow-md rounded-xl">
            <Statistic 
              title="Active Premium Users" 
              value={data.length} 
              prefix={<CrownOutlined className="text-gold-500" />} 
              valueStyle={{ color: '#D4AF37' }}
            />
          </Card>
        </Col>
        <Col span={24} lg={8}>
          <Card bordered={false} className="shadow-md rounded-xl">
            <Statistic 
              title="Estimated Monthly MRR" 
              value={data.length * 999} 
              prefix={<DollarOutlined />} 
              suffix="INR"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className="shadow-md rounded-xl" title="Premium Subscriptions">
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey="id"
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default Subscriptions;
