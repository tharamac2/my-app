import React, { useState, useEffect } from 'react';
import { Table, Tag, Typography, Card, Space, Input, DatePicker, message, Spin } from 'antd';
import { SearchOutlined, MonitorOutlined } from '@ant-design/icons';
import api from '../utils/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const ActivityLogs = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/activity-logs');
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      message.error('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Time',
      dataIndex: 'created_at',
      key: 'time',
      render: (date) => dayjs(date).format('MMM DD, YYYY HH:mm:ss'),
      sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
      defaultSortOrder: 'descend',
    },
    {
      title: 'User',
      dataIndex: 'user_name',
      key: 'user',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Activity',
      dataIndex: 'activity_type',
      key: 'type',
      render: (type) => {
        let color = 'blue';
        if (type === 'registration') color = 'green';
        if (type === 'login') color = 'cyan';
        if (type === 'payment') color = 'gold';
        return <Tag color={color}>{type.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'desc',
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
      render: (device) => (
        <Space>
          <MonitorOutlined size={14} />
          <Text type="secondary">{device || 'Unknown'}</Text>
        </Space>
      )
    },
    {
      title: 'IP Address',
      dataIndex: 'ip_address',
      key: 'ip',
      render: (ip) => <Text code>{ip}</Text>
    }
  ];

  const filteredLogs = logs.filter(log => 
    log.user_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    log.activity_type?.toLowerCase().includes(searchText.toLowerCase()) ||
    log.description?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Card bordered={false} className="shadow-md rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3}>Activity Logs</Title>
          <Text type="secondary">Monitor real-time user engagement and actions</Text>
        </div>
        <Space>
          <RangePicker />
          <Input 
            prefix={<SearchOutlined />} 
            placeholder="Search logs..." 
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
        </Space>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredLogs} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 15 }}
      />
    </Card>
  );
};

export default ActivityLogs;
