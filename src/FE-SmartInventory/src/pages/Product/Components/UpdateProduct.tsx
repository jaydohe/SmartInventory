import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { TUpdateProduct } from '@/interface/TProduct';

const UpdateProduct = ({
  initialValues,
  handleUpdateProduct,
  handleCancel,
}: {
  initialValues: TUpdateProduct;
  handleUpdateProduct: (values: TUpdateProduct) => void;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: TUpdateProduct) => {
    handleUpdateProduct(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="unit" label="Đơn vị tính" rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="purchasePrice" label="Giá mua" rules={[{ required: true, message: 'Vui lòng nhập giá mua!' }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="sellingPrice" label="Giá bán" rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Cập nhật sản phẩm
      </Button>
      <Button onClick={handleCancel} style={{ marginLeft: '10px' }}>
        Hủy
      </Button>
    </Form>
  );
};

export default UpdateProduct;
