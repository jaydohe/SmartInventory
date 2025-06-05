import { Button, Table, TableProps, Tag, Tooltip, Progress } from 'antd';
import { EyeOutlined, HistoryOutlined } from '@ant-design/icons';
import { TInventory } from '@/interface/TInventory';
import { ProductTypes } from '@/Constant/ProductTypes';

interface InventoryTableProps {
  data?: TInventory[];
  loading: boolean;
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (page: number, pageSize: number) => void;
  onViewDetail: (inventory: TInventory) => void;
  onViewHistory: (inventory: TInventory) => void;
}

const InventoryTable = ({
  data,
  loading,
  totalRecords,
  currentPage,
  pageSize,
  onPageChange,
  onViewDetail,
  onViewHistory,
}: InventoryTableProps) => {
  // Tính trạng thái cảnh báo tồn kho
  const getInventoryStatus = (inventory: TInventory) => {
    const { currentQuantity, minQuantity, maxQuantity } = inventory;

    if (currentQuantity <= minQuantity) {
      return { color: 'red', label: 'Tồn kho thấp', statusValue: 'low' };
    } else if (currentQuantity >= maxQuantity) {
      return { color: 'orange', label: 'Tồn kho cao', statusValue: 'high' };
    } else {
      return { color: 'green', label: 'Tồn kho tốt', statusValue: 'normal' };
    }
  };

  // Tính phần trăm tồn kho so với max
  const getInventoryPercentage = (inventory: TInventory) => {
    const { currentQuantity, maxQuantity } = inventory;
    if (maxQuantity === 0) return 0;

    const percentage = (currentQuantity / maxQuantity) * 100;
    return Math.min(percentage, 100); // Giới hạn tối đa là 100%
  };

  // Xác định màu cho Progress
  const getProgressStatus = (statusValue: string) => {
    switch (statusValue) {
      case 'low':
        return 'exception';
      case 'high':
        return 'warning';
      default:
        return 'success';
    }
  };

  const getProductTypeLabel = (type: ProductTypes) => {
    switch (type) {
      case ProductTypes.GOODS:
        return { color: 'blue', label: 'Thành phẩm' };
      case ProductTypes.RAW_MATERIAL:
        return { color: 'purple', label: 'Nguyên vật liệu' };
      default:
        return { color: 'default', label: 'Khác' };
    }
  };

  const columns: TableProps<TInventory>['columns'] = [
    {
      title: 'Mã sản phẩm',
      dataIndex: ['product', 'code'],
      key: 'code',
      width: '15%',
      render: (text) => <span className="font-medium text-blue-600">{text}</span>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: ['product', 'name'],
      key: 'name',
      width: '20%',
    },
    {
      title: 'Loại',
      dataIndex: ['product', 'productType'],
      key: 'productType',
      width: '12%',
      render: (type: ProductTypes) => {
        const { color, label } = getProductTypeLabel(type);
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Số lượng hiện tại',
      dataIndex: 'currentQuantity',
      key: 'currentQuantity',
      width: '15%',
      render: (value) => value?.toLocaleString('vi-VN'),
    },
    {
      title: 'Mức tồn kho',
      key: 'inventoryLevel',
      width: '20%',
      render: (_, record) => {
        const { statusValue } = getInventoryStatus(record);
        const percentage = getInventoryPercentage(record);

        return (
          <div>
            <Progress
              percent={percentage}
              size="small"
              status={getProgressStatus(statusValue) as any}
              format={() => `${record.currentQuantity}/${record.maxQuantity}`}
            />
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: '12%',
      render: (_, record) => {
        const { color, label } = getInventoryStatus(record);
        return <Tag color={color}>{label}</Tag>;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: '12%',
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
          <Tooltip title="Xem lịch sử">
            <Button
              type="text"
              icon={<HistoryOutlined />}
              onClick={() => onViewHistory(record)}
              className="text-green-600 hover:text-green-800"
            />
          </Tooltip>
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
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} sản phẩm`,
      }}
      scroll={{ x: 1000 }}
      bordered
    />
  );
};

export default InventoryTable;
