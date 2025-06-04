import React from 'react';
import { Table, Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { TBom } from '@/interface/TBom';
import { formatDate } from '@/utils/formatDate';

interface BomTableProps {
  data?: TBom[];
  loading?: boolean;
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onEditBom?: (bom: TBom) => void;
  onDeleteBom?: (bom: TBom) => void;
  onViewDetail?: (bom: TBom) => void;
  permissions?: {
    canUpdate: () => boolean;
    canDelete: () => boolean;
  };
}

const BomTable: React.FC<BomTableProps> = ({
  data = [],
  loading = false,
  totalRecords = 0,
  currentPage = 1,
  pageSize = 10,
  onPageChange,
  onEditBom,
  onDeleteBom,
  onViewDetail,
  permissions,
}) => {
  const columns: ColumnsType<TBom> = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: 'Mã định mức',
      dataIndex: 'code',
      key: 'code',
      width: 120,
      render: (code: string) => <span className="font-medium text-blue-600">{code}</span>,
    },
    {
      title: 'Sản phẩm',
      key: 'product',
      width: 200,
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.product?.name}</div>
          <div className="text-sm text-gray-500">Đơn vị: {record.product?.unit}</div>
        </div>
      ),
    },
    {
      title: 'Số lượng nguyên vật liệu',
      key: 'materialCount',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <Tag color="blue">{record.billOfMaterialDetails?.length || 0} Nguyên vật liệu</Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Ngày sửa',
      dataIndex: 'modifiedOn',
      key: 'modifiedOn',
      width: 120,
      render: (date: string) => formatDate(date),
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 180,
      align: 'center',
      render: (_, record) => (
        <Space wrap>
          <Button
            type="default"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => onViewDetail?.(record)}
            className="border-green-500 text-green-500 hover:bg-green-50"
          >
            Chi tiết
          </Button>
          {permissions?.canUpdate() && (
            <Button
              type="primary"
              ghost
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEditBom?.(record)}
              className="border-blue-500 text-blue-500 hover:bg-blue-50"
            >
              Sửa
            </Button>
          )}
          {permissions?.canDelete() && (
            <Button
              type="primary"
              danger
              ghost
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteBom?.(record)}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              Xóa
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          position: ['bottomCenter'],
          defaultCurrent: 1,
          showSizeChanger: true,
          onChange: onPageChange,
          total: totalRecords,
          current: currentPage,
          pageSize: pageSize,
        }}
        scroll={{ x: 800 }}
      />
    </>
  );
};

export default BomTable;
