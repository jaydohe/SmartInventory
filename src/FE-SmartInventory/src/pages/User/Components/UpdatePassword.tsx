import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { TUpdatePassword } from '@/interface/TUser';

interface UpdatePasswordProps {
  handleUpdatePassword: (data: TUpdatePassword) => void;
  handleCancel: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ handleUpdatePassword, handleCancel }) => {
  const [form] = Form.useForm();
  const [formChange, setFormChange] = useState(false);
  const onFinish = (values: TUpdatePassword) => {
    handleUpdatePassword(values);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      onValuesChange={() => setFormChange(true)}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Mật khẩu mới"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Xác nhận mật khẩu"
        name="rePassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      {formChange && (
        <Form.Item wrapperCol={{ span: 24 }}>
          <div className="text-center">
            <Button className='w-full rounded-xl ' variant="solid" color="primary" htmlType="submit">
              Cập nhật
            </Button>
          </div>
        </Form.Item>
      )}
    </Form>
  );
};

export default UpdatePassword;