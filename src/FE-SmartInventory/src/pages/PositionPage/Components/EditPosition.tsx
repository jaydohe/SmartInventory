import { TCreatePosition, TPosition } from '@/interface/TPosition';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Upload } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface EditPositonProps {
  handleUpdatePosition: (id: string, data: TCreatePosition) => void;
  position: TPosition;
}

const EditPositon: React.FC<EditPositonProps> = ({ handleUpdatePosition, position }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (position) {
      form.setFieldsValue({
        name: position.name,
      });
    }
  }, [position, form]);

  const onFinish = async (values: TCreatePosition) => {
    handleUpdatePosition(position.id, values);
    form.resetFields();
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên vị trí"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên vị trí' }]}
        >
          <Input placeholder="Nhập tên vị trí" className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật vị trí
        </Button>
      </Form>
    </>
  );
};

export default EditPositon;
