import { Form, Input, Button } from 'antd';
import { TUpdateUser } from '@/interface/TUser';
import { useState } from 'react';

const UpdateUser = ({
  initialValues,
  handleUpdateUser,
  handleCancel,
}: {
  initialValues: TUpdateUser;
  handleUpdateUser: (values: TUpdateUser) => void;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [formChange, setFormChange] = useState(false);

  const onFinish = (values: TUpdateUser) => {
    handleUpdateUser(values);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      initialValues={initialValues}
      onFinish={onFinish}
      onFieldsChange={() => setFormChange(true)}
    >
      <Form.Item
        name="name"
        label="Tên người dùng"
        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="loginName"
        label="Tên đăng nhập"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
      >
        <Input />
      </Form.Item>
      {formChange && (
        <div className="text-center">
          <Button className="w-full rounded-xl" variant="solid" color="primary" htmlType="submit">
            Cập nhật
          </Button>
        </div>
      )}
    </Form>
  );
};

export default UpdateUser;
