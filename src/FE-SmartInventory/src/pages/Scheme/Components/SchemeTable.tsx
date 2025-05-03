import React from 'react';
import { Table, Tooltip, Button, Space, Progress, Typography, Avatar } from 'antd';
import { DeleteOutlined, EyeOutlined, MoreOutlined } from '@ant-design/icons';
import StatusTag from './StatusTag';
import { TScheme } from '@/interface/TScheme';

import moment from 'moment';
import { ColumnsType } from 'antd/es/table';
import { SchemeStatus } from '@/Constant';
import { authStoreSelectors } from '@/Stores/userStore';

const { Text } = Typography;

interface SchemeTableProps {
  data: TScheme[] | undefined;
  pagination: any;
  handleOpenDrawer: (schemeId: string) => void;
  handleOpenDelete?: (scheme: TScheme) => void;
}

const SchemeTable: React.FC<SchemeTableProps> = ({
  data,
  pagination,
  handleOpenDrawer,
  handleOpenDelete,
}) => {
  const userId = authStoreSelectors.use.userId();
  const tableColumns: ColumnsType<TScheme> = [
    {
      title: 'Tên kế hoạch',
      dataIndex: 'name',
      key: 'name',
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
      // render: (date: string) => <Text >{new Date(date).toLocaleDateString()}</Text>,
      render: (date: string) => <p className="">{moment(date).format('DD/MM/YYYY HH:mm')}</p>,
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'expireAt',
      key: 'expireAt',
      // render: (date: string) => (date ? <Text>{new Date(date).toLocaleDateString()}</Text> : ''),
      render: (date: string) =>
        date ? <p className="">{moment(date).format('DD/MM/YYYY HH:mm')}</p> : 'Không có',
    },
    {
      title: 'Tiến độ hoàn thành',
      dataIndex: 'completedPercent',
      key: 'completedPercent',
      render: (percent: number) => <Progress percent={percent} />,
    },

    {
      title: `Thao tác`,
      key: 'action',

      render: (_, record) => (
        <Space wrap>
          <Tooltip title="Chi tiết">
            <Avatar
              className="cursor-pointer	"
              style={{ backgroundColor: '#e6f4ff', color: '#4096ff' }}
              icon={<EyeOutlined />}
              onClick={() => handleOpenDrawer(record.id)}
            />
          </Tooltip>
          {/* <Tooltip title="Chỉnh sửa">
            <Avatar
              className="cursor-pointer	"
              style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
              icon={<EditOutlined />}
              onClick={() => {
                setIsOpenDevice({
                  isOpen: true,
                  type: 'EDIT',
                  detailDevice: record,
                });
              }}
            />
          </Tooltip> */}

          {(record.status === SchemeStatus.CREATED || record.status === SchemeStatus.COMPLETED) &&
            record.userId === userId && (
              <Tooltip title="Xoá">
                <Avatar
                  className="cursor-pointer	"
                  style={{ backgroundColor: '#ffccc7', color: '#ff4d4f' }}
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    handleOpenDelete && handleOpenDelete(record);
                  }}
                />
              </Tooltip>
            )}
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.id}
      columns={tableColumns}
      dataSource={data}
      tableLayout={'fixed'}
      scroll={{ x: 900 }}
      className="rounded-md bg-white"
      pagination={pagination}
    />
  );
};

export default SchemeTable;
