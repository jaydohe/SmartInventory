import { Table, TableProps, Empty } from 'antd';
import { TInventoryByProduct } from '@/interface/TInventory';
import { getInventoryByProduct } from '../Hook/useQueryInventory';

interface InventoryDetailProps {
  productId?: string;
  productName?: string;
}

const InventoryDetail = ({ productId, productName }: InventoryDetailProps) => {
  const { data, isLoading } = getInventoryByProduct(productId || '', {
    enabled: !!productId,
  });
  const columns: TableProps<TInventoryByProduct>['columns'] = [
    {
      title: 'Kho',
      dataIndex: 'warehouseName',
      key: 'warehouseName',
      width: '25%',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '20%',
      render: (value) => value.toLocaleString('vi-VN'),
    },
    {
      title: 'Đơn vị',
      dataIndex: 'productUnit',
      key: 'productUnit',
      width: '15%',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '20%',
      render: (value) => new Date(value).toLocaleDateString('vi-VN'),
    },
  ];

  if (!data?.length) {
    return (
      <div className="p-8 flex justify-center">
        <Empty description="Không có dữ liệu tồn kho cho sản phẩm này" />
      </div>
    );
  }

  return (
    <div>
      {productId && productName && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            Chi tiết tồn kho sản phẩm: {productName} (Mã: {productId})
          </h3>
        </div>
      )}
      <Table
        columns={columns}
        dataSource={data?.map((item, index) => ({ ...item, key: index }))}
        loading={isLoading}
        pagination={false}
        scroll={{ x: 800 }}
        bordered
      />
    </div>
  );
};

export default InventoryDetail;
