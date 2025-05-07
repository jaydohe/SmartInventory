import { Form, Input, InputNumber, Select, Button, Space } from 'antd';
import { TUpdateProduct } from '@/interface/TProduct';
import React, { useState } from 'react';

const UpdateProduct = ({
  initialValues,
  handleUpdateProduct,
  handleCancel,
  categories,
  warehouses,
  suppliers,
}: {
  initialValues: TUpdateProduct;
  handleUpdateProduct: (values: TUpdateProduct) => void;
  handleCancel: () => void;
  categories: { id: string; name: string }[];
  warehouses: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
}) => {
  const [form] = Form.useForm();
  const [formChange, setFormChange] = useState(false);

  const onFinish = (values: TUpdateProduct) => {
    handleUpdateProduct(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      onFieldsChange={() => setFormChange(true)}
    >
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="unit"
        label="Đơn vị tính"
        rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="productType"
        label="Loại sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập loại sản phẩm!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="purchasePrice"
        label="Giá mua"
        rules={[{ required: true, message: 'Vui lòng nhập giá mua!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="sellingPrice"
        label="Giá bán"
        rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="holdingCost"
        label="Chi phí lưu kho"
        rules={[{ required: true, message: 'Vui lòng nhập chi phí lưu kho!' }]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="materialSupplierId"
        label="Nhà cung cấp nguyên vật liệu"
        rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp!' }]}
      >
      </Form.Item>

      <Form.Item
        name="warehouseId"
        label="Kho"
        rules={[{ required: true, message: 'Vui lòng chọn kho!' }]}
      >
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Danh mục"
        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
      >
      </Form.Item>

      {formChange && (
        <Form.Item>
          <Space>
            <Button onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdateProduct;
