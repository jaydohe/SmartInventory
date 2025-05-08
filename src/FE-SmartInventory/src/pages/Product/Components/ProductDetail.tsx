import React from 'react';
import { Descriptions } from 'antd';
import { useQueryProduct } from '../Hook/useQueryProduct';

const ProductDetails = ({ productId }: { productId: string }) => {
  const { getDetailProduct } = useQueryProduct('');
  const { data: product } = getDetailProduct(productId);

  return (
    <Descriptions title="Chi tiết sản phẩm" bordered>
      <Descriptions.Item label="Mã sản phẩm">{product?.code}</Descriptions.Item>
      <Descriptions.Item label="Tên sản phẩm">{product?.name}</Descriptions.Item>
      <Descriptions.Item label="Mô tả">{product?.description}</Descriptions.Item>
      <Descriptions.Item label="Đơn vị tính">{product?.unit}</Descriptions.Item>
      <Descriptions.Item label="Giá mua">{product?.purchasePrice}</Descriptions.Item>
      <Descriptions.Item label="Giá bán">{product?.sellingPrice}</Descriptions.Item>
      <Descriptions.Item label="Chi phí lưu kho">{product?.holdingCost}</Descriptions.Item>
    </Descriptions>
  );
};

export default ProductDetails;