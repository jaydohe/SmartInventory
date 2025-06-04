import { Button, Table, TableProps, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { TOrder } from '@/interface/TOder';
import dayjs from 'dayjs';
import { OrderStatus, genOrderStatus } from '@/Constant/OderStatus';
import { TWarehouse } from '@/interface/TWarehouse';

interface OrderTableProps {
  data?: TOrder[];
  loading: boolean;
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  warehouses?: TWarehouse[];
  onPageChange: (page: number, pageSize: number) => void;
  onEditOrder: (order: TOrder) => void;
  onDeleteOrder: (order: TOrder) => void;
  onViewDetail: (order: TOrder) => void;
  permissions?: {
    canCreate: () => boolean;
    canRead: () => boolean;
    canUpdate: () => boolean;
    canDelete: () => boolean;
  };
}

const OrderTable = ({
  data,
  loading,
  totalRecords,
  currentPage,
  pageSize,
  warehouses = [],
  onPageChange,
  onEditOrder,
  onDeleteOrder,
  onViewDetail,
  permissions,
}: OrderTableProps) => {
  // Hàm tìm tên kho dựa vào warehouseId
  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    return warehouse ? warehouse.name : warehouseId;
  };

  const columns: TableProps<TOrder>['columns'] = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
      render: (text) => <span className="font-medium text-blue-600">{text}</span>,
    },
    {
      title: 'Kho xuất hàng',
      dataIndex: 'warehouseId',
      key: 'warehouseId',
      width: '15%',
      render: (warehouseId) => getWarehouseName(warehouseId),
    },
    {
      title: 'Loại đơn hàng',
      dataIndex: 'isRefund',
      key: 'isRefund',
      width: '12%',
      render: (isRefund) => (
        <span className="font-medium">
          <Tag color={isRefund ? 'volcano' : 'green'}>
            {isRefund ? 'Hoàn trả hàng' : 'Đơn hàng '}
          </Tag>
        </span>
      ),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '13%',
      render: (value) => value?.toLocaleString('vi-VN') + ' đ',
    },
    {
      title: 'VAT',
      dataIndex: 'vat',
      key: 'vat',
      width: '8%',
      render: (vat) => (vat ? `${vat}%` : '0%'),
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      key: 'discount',
      width: '8%',
      render: (discount) => (discount ? `${discount}%` : '0%'),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '12%',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      width: '12%',
      render: (status: OrderStatus) => (
        <Tag color={genOrderStatus[status]?.color}>{genOrderStatus[status]?.label}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '15%',
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onViewDetail(record)}
              className="text-blue-600 hover:text-blue-800"
            />
          </Tooltip>
          {permissions?.canUpdate() && (
            <Tooltip title="Sửa trạng thái">
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onEditOrder(record)}
                disabled={
                  record.orderStatus === OrderStatus.CANCELED ||
                  record.orderStatus === OrderStatus.DELIVERED
                }
                className="text-green-600 hover:text-green-800"
              />
            </Tooltip>
          )}
          {permissions?.canDelete() && (
            <Tooltip title="Xóa">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => onDeleteOrder(record)}
                disabled={record.orderStatus !== OrderStatus.NEW}
                className="text-red-600 hover:text-red-800"
              />
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
        current: currentPage,
        pageSize: pageSize,
        total: totalRecords,
        onChange: onPageChange,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đơn hàng`,
      }}
      scroll={{ x: 1200 }}
      bordered
    />
  );
};

export default OrderTable;
