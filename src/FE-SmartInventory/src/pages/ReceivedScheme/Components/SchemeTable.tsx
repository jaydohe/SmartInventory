import React from 'react';
import { Table, Tooltip, Button, Space, Progress, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import StatusTag from '../../Scheme/Components/StatusTag';
import { TScheme } from '@/interface/TScheme';
import { SchemeStatus } from '@/Constant';

const { Text } = Typography;

interface SchemeTableProps {
  data: TScheme[] | undefined;
  pagination: any;
  handleOpenDrawer: (schemeId: string) => void;
}

const SchemeTable: React.FC<SchemeTableProps> = ({ data, pagination, handleOpenDrawer }) => {
  const tableColumns = [
    {
      title: 'Tên kế hoạch',
      dataIndex: 'name',
      key: 'name',
      className: 'max-w-40',
      ellipsis: {
        showTitle: true,
      },
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Người tạo',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => <span> {user.name || 'Không xác định'}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: SchemeStatus) => <StatusTag status={status} />,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => <Text type="secondary">{new Date(date).toLocaleDateString()}</Text>,
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expireAt',
      key: 'expireAt',
      render: (date: string) =>
        date ? <Text type="secondary">{new Date(date).toLocaleDateString()}</Text> : '',
    },
    {
      title: 'Tiến độ hoàn thành',
      dataIndex: 'completedPercent',
      key: 'completedPercent',
      render: (percent: number) => <Progress percent={percent} />,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Tooltip title="Chi tiết">
            <Button
              variant="solid"
              size="middle"
              shape="circle"
              icon={<MoreOutlined />}
              onClick={() => handleOpenDrawer(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.id}
      columns={tableColumns}
      dataSource={data}
      tableLayout={'auto'}
      scroll={{ x: 900 }}
      className="rounded-md bg-white"
      pagination={pagination}
    />
  );
};

export default SchemeTable;
