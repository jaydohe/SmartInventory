import { Table, Tag, TableProps } from 'antd';
import { TInventoryHistory } from '@/interface/TInventory';
import dayjs from 'dayjs';

interface InventoryHistoryProps {
  data?: TInventoryHistory[];
  loading: boolean;
  productName?: string;
  productCode?: string;
}

const InventoryHistory = ({ data, loading, productName, productCode }: InventoryHistoryProps) => {
  // Xác định loại hoạt động và màu sắc
  const getActivityTypeInfo = (type: string, quantity: number) => {
    switch (type) {
      case 'RECEIPT':
        return { label: 'Nhập kho', color: 'green', sign: '+' };
      case 'ISSUE':
        return { label: 'Xuất kho', color: 'red', sign: '-' };
      case 'ADJUSTMENT':
        return {
          label: 'Điều chỉnh',
          color: quantity >= 0 ? 'blue' : 'orange',
          sign: quantity >= 0 ? '+' : '-',
        };
      default:
        return { label: 'Khác', color: 'default', sign: '' };
    }
  };

  const columns: TableProps<TInventoryHistory>['columns'] = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      width: '15%',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Loại hoạt động',
      dataIndex: 'activityType',
      key: 'activityType',
      width: '15%',
      render: (type, record) => {
        const { label, color } = getActivityTypeInfo(type, record.quantityChange);
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Thay đổi số lượng',
      dataIndex: 'quantityChange',
      key: 'quantityChange',
      width: '15%',
      render: (value, record) => {
        const { sign } = getActivityTypeInfo(record.activityType, value);
        const absValue = Math.abs(value);
        return (
          <span
            className={
              value > 0 ? 'text-green-600 font-medium' : value < 0 ? 'text-red-600 font-medium' : ''
            }
          >
            {sign} {absValue.toLocaleString('vi-VN')}
          </span>
        );
      },
    },
    {
      title: 'Số lượng sau thay đổi',
      dataIndex: 'newQuantity',
      key: 'newQuantity',
      width: '15%',
      render: (value) => value.toLocaleString('vi-VN'),
    },
    {
      title: 'Mã tham chiếu',
      dataIndex: 'referenceCode',
      key: 'referenceCode',
      width: '15%',
    },
    {
      title: 'Loại tham chiếu',
      dataIndex: 'referenceType',
      key: 'referenceType',
      width: '15%',
      render: (type) => {
        let color = 'default';
        let label = 'Khác';

        switch (type) {
          case 'GOODS_RECEIPT':
            color = 'green';
            label = 'Phiếu nhập hàng';
            break;
          case 'GOODS_ISSUE':
            color = 'red';
            label = 'Phiếu xuất hàng';
            break;
          case 'PRODUCTION_COMMAND':
            color = 'blue';
            label = 'Lệnh sản xuất';
            break;
          case 'MANUAL':
            color = 'purple';
            label = 'Điều chỉnh thủ công';
            break;
        }

        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      width: '20%',
      render: (note) => note || 'Không có',
    },
  ];

  return (
    <div>
      {productName && productCode && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Lịch sử tồn kho sản phẩm: {productName} ({productCode})
          </h3>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={data?.map((item, index) => ({ ...item, key: index }))}
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: true }}
        scroll={{ x: 1000 }}
        bordered
      />
    </div>
  );
};

export default InventoryHistory;
