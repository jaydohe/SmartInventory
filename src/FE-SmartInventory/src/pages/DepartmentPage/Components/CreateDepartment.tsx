import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import { TCreateDepartment } from '@/interface/TDepartment';

interface CreateDepartmentProps {
  handleCreateDepartment: (data: TCreateDepartment) => void;
}

const CreateDepartment: React.FC<CreateDepartmentProps> = ({ handleCreateDepartment }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: TCreateDepartment) => {
    handleCreateDepartment(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên phòng ban"
        rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}
      >
        <Input placeholder="Nhập tên phòng ban" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
        Tạo
      </Button>
    </Form>
  );
};

export default CreateDepartment;
