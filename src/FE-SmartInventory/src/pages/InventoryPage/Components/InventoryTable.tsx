import { Button, Table, TableProps, Tag, Tooltip } from 'antd';
import { EyeOutlined, HistoryOutlined, EditOutlined } from '@ant-design/icons';
import { TInventory, TInventoryByProduct } from '@/interface/TInventory';

interface InventoryTableProps {
  data?: TInventory[];
  loading: boolean;
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (page: number, pageSize: number) => void;

  onViewByProduct: (record: TInventory) => void;
  onUpdateInventory: (record: TInventory) => void;

  permissions?: {
    canCreate: () => boolean;
    canRead: () => boolean;
    canUpdate: () => boolean;
    canDelete: () => boolean;
  };
}

const InventoryTable = ({
  data,
  loading,
  totalRecords,
  currentPage,
  pageSize,
  onPageChange,

  onViewByProduct,
  onUpdateInventory,
  permissions,
}: InventoryTableProps) => {
  const columns: TableProps<TInventory>['columns'] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: '5%',
      render: (_, __, index) => <span className="font-medium text-blue-600">{index + 1}</span>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product.name',
      key: 'product.name',
      width: '20%',
      render: (_, record) => (
        <span className="font-medium text-blue-600">{record.product.name}</span>
      ),
    },
    {
      title: 'Kho',
      dataIndex: 'warehouse.name',
      key: 'warehouse.name',
      width: '15%',
      render: (_, record) => (
        <span className="font-medium text-blue-600">{record.warehouse.name}</span>
      ),
    },

    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%',
      render: (_, record) => <span className="font-medium text-blue-600">{record.quantity}</span>,
    },
    {
      title: 'Đơn vị',
      dataIndex: 'product.unit',
      key: 'product.unit',
      width: '10%',
      render: (_, record) => (
        <span className="font-medium text-blue-600">{record.product.unit}</span>
      ),
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      render: (value) => new Date(value).toLocaleDateString('vi-VN'),
    },

    {
      title: 'Thao tác',
      key: 'action',
      width: 200,
      align: 'center',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Tooltip title="Xem chi tiết tồn kho theo sản phẩm">
            <Button
              color="cyan"
              variant="solid"
              shape="round"
              icon={<HistoryOutlined />}
              onClick={() => onViewByProduct(record)}
              className={'font-medium'}
            ></Button>
          </Tooltip>
          {permissions?.canUpdate() && onUpdateInventory && (
            <Tooltip title="Cập nhật tồn kho">
              <Button
                color="gold"
                variant="solid"
                shape="round"
                icon={<EditOutlined />}
                onClick={() => onUpdateInventory(record)}
                className={'font-medium'}
              ></Button>
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.map((item) => ({ ...item, key: item.id }))}
      loading={loading}
      pagination={{
        position: ['bottomCenter'],
        defaultCurrent: 1,
        showSizeChanger: true,
        onChange: onPageChange,
        total: totalRecords,
        current: currentPage,
        pageSize: pageSize,
      }}
      scroll={{ x: 1000 }}
      bordered
    />
  );
};

export default InventoryTable;
