import React, { useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Divider, Tag } from 'antd';
import { TCreateUser } from '@/interface/TUser';
import { RoleEnumString, ROLE } from '@/Constant';
import RoleTag from './RoleTag';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import { useBuilderQuery } from '@/hook';
import { toJoin, toOrderBy } from '@/utils';
import { TBuilderQuery } from '@/interface';
import { useQueryEmployee } from '@/pages/Employee/Hook/useEmployeePage';

const { Option } = Select;

const CreateUser = ({ handleCreateUser }: { handleCreateUser: (data: TCreateUser) => void }) => {
  const [form] = Form.useForm();

  const [filter, setFilter] = useState<TBuilderQuery>({
    appendQuery: [
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const { getAllEmployee } = useQueryEmployee(useBuilderQuery(filter));
  const onFinish = (data: TCreateUser) => {
    console.log('data:', data);
    handleCreateUser(data);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="employeeId"
        label="Nhân viên"
        rules={[{ required: true, message: 'Vui lòng chọn nhân viên' }]}
      >
        <Select placeholder="Chọn nhân viên">
          {getAllEmployee.data?.data.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="loginName"
        label="Tên đăng nhập"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
      >
        <Input placeholder="Nhập tên đăng nhập" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          { required: true, message: 'Vui lòng nhập mật khẩu' },
          { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
          {
            pattern: /[A-Z]/,
            message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa',
          },
          {
            pattern: /[0-9]/,
            message: 'Mật khẩu phải chứa ít nhất 1 số',
          },
        ]}
      >
        <Input.Password placeholder="Nhập mật khẩu" />
      </Form.Item>
      <Form.Item
        name="userRole"
        label="Quyền"
        rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}
      >
        <Select placeholder="Chọn quyền">
          {ROLE.filter(
            (role) => role.name !== RoleEnumString.DEV && role.name !== RoleEnumString.ADMIN
          ).map((role) => (
            <Option key={role.id} value={role.name}>
              <RoleTag role={role.name} />
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Button
        type="primary"
        // variant="solid"
        htmlType="submit"
        className="w-full font-semibold "
        icon={<UserAddOutlined />}
      >
        Thêm người dùng
      </Button>
    </Form>
  );
};

export default CreateUser;
