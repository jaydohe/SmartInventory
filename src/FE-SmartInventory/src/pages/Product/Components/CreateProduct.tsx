import React, { useState } from 'react';
import { Button, Form, Input, Select, Space, Divider, InputNumber } from 'antd';
import { TCreateProduct } from '@/interface/TProduct';
import { PlusOutlined } from '@ant-design/icons';
import { RoleEnumString, ROLE } from '@/Constant';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import { useBuilderQuery } from '@/hook';
import { toJoin, toOrderBy } from '@/utils';
import { TBuilderQuery } from '@/interface';

const { Option } = Select;

const CreateProduct = ({
  handleCreateProduct,
  categories,
  warehouses,
  suppliers
}: {
  handleCreateProduct: (data: TCreateProduct) => void;
  categories: { id: string; name: string }[];
  warehouses: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
}) => {
  const [form] = Form.useForm();

  const onFinish = (data: TCreateProduct) => {
    handleCreateProduct(data);
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
      >
        <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
      </Form.Item>

      <Form.Item
        name="unit"
        label="Đơn vị tính"
        rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính' }]}
      >
        <Input placeholder="Ví dụ: cái, hộp, kg..." />
      </Form.Item>

      <Form.Item
        name="productType"
        label="Loại sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm' }]}
      >
        <Input placeholder="Ví dụ: điện tử, gia dụng..." />
      </Form.Item>

      <Form.Item
        name="purchasePrice"
        label="Giá mua"
        rules={[{ required: true, message: 'Vui lòng nhập giá mua' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="sellingPrice"
        label="Giá bán"
        rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="holdingCost"
        label="Chi phí lưu kho"
        rules={[{ required: true, message: 'Vui lòng nhập chi phí lưu kho' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="materialSupplierId"
        label="Nhà cung cấp nguyên vật liệu"
        rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
      >
      </Form.Item>

      <Form.Item
        label="Kho"
        name="warehouseId"
        rules={[{ required: true, message: 'Vui lòng chọn kho' }]}
      >
      </Form.Item>

      <Form.Item
        label="Danh mục"
        name="categoryId"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
      >
      </Form.Item>

      <Button type="primary" htmlType="submit" icon={<PlusOutlined />} className="w-full font-semibold">
        Thêm sản phẩm
      </Button>
    </Form>
  );
};

export default CreateProduct;
