import { TWarehouse } from '@/interface/TWarehouse';
import { Descriptions, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useQueryEmployee } from '@/pages/Employee/Hook/useEmployeePage';
import { useQueryDetailWarehouse } from '../Hook/useQueryWarehouse';
import { useQueryCategoryWarehouse } from '@/pages/CategoryWarehousePage/Hook/useQueryCategoryWarehouse';
import dayjs from 'dayjs';

interface DetailWarehouseProps {
  warehouseId: string;
}

const DetailWarehouse: React.FC<DetailWarehouseProps> = ({ warehouseId }) => {
  const { data: detailWarehouse, isLoading } = useQueryDetailWarehouse(warehouseId);
  const warehouse = detailWarehouse?.data;
  const [categoryName, setCategoryName] = useState<string>('');
  const [parentWarehouseName, setParentWarehouseName] = useState<string>('');
  console.log(warehouse);
  // Lấy thông tin chi tiết về nhân viên quản lý, danh mục và kho cha (nếu có)
  // const { data: detailEmployee } = useQueryEmployee(
  //   warehouseId ? `id=${warehouse?.managerId}` : ''
  // );

  // useEffect(() => {
  //   if (detailEmployee && detailEmployee.data && detailEmployee.data.length > 0) {
  //     setManagerName(detailEmployee.data[0]?.name || '');
  //   }
  // }, [detailEmployee]);

  // Nếu có kho cha, lấy thông tin chi tiết của kho cha
  const { data: parentWarehouse } = useQueryDetailWarehouse(warehouse?.warehouseId || '', {
    enabled: !!warehouse?.warehouseId,
  });

  useEffect(() => {
    if (parentWarehouse) {
      setParentWarehouseName(parentWarehouse.data.name || '');
    }
  }, [parentWarehouse]);

  // Lấy thông tin chi tiết về danh mục kho
  const { getAllCategoryWarehouse } = useQueryCategoryWarehouse(
    warehouse?.categoryId ? `id=${warehouse.categoryId}` : ''
  );

  useEffect(() => {
    if (
      getAllCategoryWarehouse.data &&
      getAllCategoryWarehouse.data.data &&
      getAllCategoryWarehouse.data.data.length > 0
    ) {
      setCategoryName(getAllCategoryWarehouse.data.data[0]?.name || '');
    }
  }, [getAllCategoryWarehouse.data]);

  if (isLoading || !warehouse) {
    return <Typography.Text>Đang tải...</Typography.Text>;
  }

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Tên kho">{warehouse.name}</Descriptions.Item>
      <Descriptions.Item label="Mã kho">{warehouse.code}</Descriptions.Item>
      <Descriptions.Item label="Địa chỉ">{warehouse.address}</Descriptions.Item>
      <Descriptions.Item label="Nhân viên quản lý">{warehouse.managerId}</Descriptions.Item>
      <Descriptions.Item label="Danh mục kho">{categoryName || 'Không có'}</Descriptions.Item>
      <Descriptions.Item label="Dung tích kho">{warehouse.capacity} (đơn vị)</Descriptions.Item>
      <Descriptions.Item label="Loại kho">
        {warehouse.warehouseId ? <Tag color="blue">Kho con</Tag> : <Tag color="green">Kho cha</Tag>}
      </Descriptions.Item>
      {warehouse.warehouseId && (
        <Descriptions.Item label="Thuộc kho">{parentWarehouseName}</Descriptions.Item>
      )}
      <Descriptions.Item label="Ngày tạo">
        {dayjs(warehouse.createdAt).format('DD/MM/YYYY')}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default DetailWarehouse;
