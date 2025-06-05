import React from 'react';
import { Table, Button, Space, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TProduct } from '@/interface/TProduct';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ProductTypes, genProductTypes } from '@/Constant/ProductTypes';
import { TCategory } from '@/interface/TCategory';

interface ProductTableProps {
  data: TProduct[] | undefined;
  loading: boolean;
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  categories?: TCategory[];
  onPageChange: (page: number, pageSize: number) => void;
  onEditProduct: (product: TProduct) => void;
  onDeleteProduct: (product: TProduct) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  data,
  loading,
  totalRecords,
  currentPage,
  pageSize,
  categories = [],
  onPageChange,
  onEditProduct,
  onDeleteProduct,
}) => {
  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  };

  const columns: ColumnsType<TProduct> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'code',
      key: 'code',
      ellipsis: {
        showTitle: true,
      },
      render: (text) => (
        <span className="font-semibold text-blue-600 max-w-2xl block truncate">{text}</span>
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: true,
      },
      render: (text) => (
        <span className="font-semibold text-blue-600 max-w-2xl block truncate">{text}</span>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'categoryId',
      key: 'categoryId',
      ellipsis: {
        showTitle: true,
      },
      render: (categoryId) => <span>{getCategoryName(categoryId)}</span>,
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'productType',
      key: 'productType',
      render: (type) => <span>{genProductTypes[type as ProductTypes]}</span>,
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Giá mua',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      render: (value) => <span>{value.toLocaleString('vi-VN')} VNĐ</span>,
    },
    {
      title: 'Giá bán',
      dataIndex: 'sellingPrice',
      key: 'sellingPrice',
      render: (value) => <span>{value.toLocaleString('vi-VN')} VNĐ</span>,
    },
    {
      title: 'Chi phí lưu kho',
      dataIndex: 'holdingCost',
      key: 'holdingCost',
      render: (value) => <span>{value.toLocaleString('vi-VN')} VNĐ</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
<<<<<<< Updated upstream
          <Button
            color="gold"
            variant="solid"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => onEditProduct(record)}
            className={'font-medium'}
          >
            Cập nhật
          </Button>
          <Button
            color="red"
            variant="solid"
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => onDeleteProduct(record)}
            className={'font-medium'}
          >
            Xoá
          </Button>
=======
          {permissions?.canUpdate() && (
            <Tooltip title="Cập nhật sản phẩm">
              <Button
                color="gold"
                variant="solid"
                shape="round"
                icon={<EditOutlined />}
                onClick={() => onEditProduct(record)}
                className={'font-medium'}
              ></Button>
            </Tooltip>
          )}
          {permissions?.canDelete() && (
            <Tooltip title="Xoá sản phẩm">
              <Button
                color="red"
                variant="solid"
                shape="round"
                icon={<DeleteOutlined />}
                onClick={() => onDeleteProduct(record)}
                className={'font-medium'}
              ></Button>
            </Tooltip>
          )}
>>>>>>> Stashed changes
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={data}
      loading={loading}
      tableLayout={'auto'}
      scroll={{ x: 1200 }}
      className="rounded-md bg-white"
      pagination={{
        position: ['bottomCenter'],
        defaultCurrent: 1,
        showSizeChanger: true,
        onChange: onPageChange,
        total: totalRecords,
        current: currentPage,
        pageSize: pageSize,
      }}
    />
  );
};

export default ProductTable;
