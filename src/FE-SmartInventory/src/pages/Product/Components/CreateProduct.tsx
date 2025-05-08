import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { TCreateProduct } from '@/interface/TProduct';

const CreateProduct = ({ handleCreateProduct }: { handleCreateProduct: (data: TCreateProduct) => void }) => {
  const [form] = Form.useForm();

  const onFinish = (data: TCreateProduct) => {
    handleCreateProduct(data);
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>
      <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}>
        <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
      </Form.Item>
      <Form.Item name="unit" label="Đơn vị tính" rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính' }]}>
        <Input placeholder="Ví dụ: cái, hộp, kg..." />
      </Form.Item>
      <Form.Item name="purchasePrice" label="Giá mua" rules={[{ required: true, message: 'Vui lòng nhập giá mua' }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="sellingPrice" label="Giá bán" rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item name="holdingCost" label="Chi phí lưu kho" rules={[{ required: true, message: 'Vui lòng nhập chi phí lưu kho' }]}>
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Thêm sản phẩm
      </Button>
    </Form>
  );
};

export default CreateProduct;
