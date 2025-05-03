import { useState } from 'react';
import { Form, Select, Button, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { RoleEnum, ROLE, RoleEnumString } from '@/Constant';
import RoleTag from './RoleTag';

const ChangeRole = ({
  currentRole,
  handleChangeRole,
  handleCancel,
}: {
  currentRole: RoleEnumString;
  handleChangeRole: (newRole: RoleEnumString) => void;
  handleCancel: () => void;
}) => {
  const [form] = Form.useForm();
  const [formChange, setFormChange] = useState(false);
  const onFinish = (values: { newRole: RoleEnumString }) => {
    form.resetFields();
    setFormChange(false);
    handleChangeRole(values.newRole);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ currentRole: currentRole, newRole: currentRole }}
      onValuesChange={() => setFormChange(true)}
    >
      <div className="flex gap-5">
        <Form.Item
          label="Quyền hiện tại"
          name="currentRole"
          rules={[{ required: true, message: 'Vui lòng chọn quyền mới' }]}
          className="w-full"
        >
          <RoleTag className="w-full" role={currentRole} />
        </Form.Item>
        <ArrowRightOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
        <Form.Item
          label="Quyền mới"
          name="newRole"
          rules={[{ required: true, message: 'Vui lòng chọn quyền mới' }]}
          className="w-full"
        >
          <Select variant="borderless">
            {ROLE.filter(
              (role) => role.name !== RoleEnumString.DEV && role.name !== RoleEnumString.ADMIN
            ).map((role) => (
              <Select.Option key={role.id} value={role.name}>
                <RoleTag className="w-full" role={role.name} />
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
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

export default ChangeRole;
