import React, { useState, useEffect } from 'react';
import { Table, Tag, Typography, Card, Space, Button, Modal, message, Badge } from 'antd';
import { AlertOutlined, SafetyOutlined, StopOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../utils/api';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/reports');
      setReports(res.data);
    } catch (err) {
      console.error(err);
      message.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action, reportId) => {
    Modal.confirm({
      title: `Confirm ${action}`,
      content: `Are you sure you want to ${action} this report?`,
      onOk: async () => {
        try {
          message.success(`${action} successful`);
          fetchReports();
        } catch (err) {
          message.error(`Failed to ${action}`);
        }
      }
    });
  };

  const columns = [
    {
      title: 'Reported Profile',
      dataIndex: 'reported_id',
      key: 'reported',
      render: (id) => <Text strong>User ID: {id}</Text>
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => <Tag color="error">{reason}</Tag>
    },
    {
      title: 'Reporter',
      dataIndex: 'reporter_id',
      key: 'reporter',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'date',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge status={status === 'pending' ? 'processing' : 'default'} text={status.toUpperCase()} />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<SafetyOutlined />} onClick={() => handleAction('dismiss', record.id)}>Dismiss</Button>
          <Button size="small" type="primary" danger icon={<StopOutlined />} onClick={() => handleAction('block', record.id)}>Block User</Button>
        </Space>
      )
    }
  ];

  return (
    <Card bordered={false} className="shadow-md rounded-xl">
      <div className="mb-6">
        <Title level={3}>Moderation Queue</Title>
        <Text type="secondary">Review and act on user reports and suspicious profiles</Text>
      </div>

      <Table 
        columns={columns} 
        dataSource={reports} 
        rowKey="id"
        loading={loading}
      />
    </Card>
  );
};

export default Reports;
