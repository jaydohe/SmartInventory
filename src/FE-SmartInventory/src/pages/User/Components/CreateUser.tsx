import React, { useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Divider } from 'antd';
import { TCreateUser } from '@/interface/TUser';
import { RoleEnumString, ROLE } from '@/Constant';
import RoleTag from './RoleTag';
import { useQueryUnit } from '@/hook/useQueryUnit';
import { useBuilderQuery } from '@/hook';
import { toJoin, toOrderBy } from '@/utils';
import { TBuilderQuery } from '@/interface';

const { Option } = Select;

const CreateUser = ({ handleCreateUser }: { handleCreateUser: (data: TCreateUser) => void }) => {
  const [form] = Form.useForm();
  const [filter, setFilter] =useState<TBuilderQuery>( {
    toJoin: ['users.*'],
    isAsc: true,
    orderBy: 'name',
    toPaging: {
      page: 1,
      pageSize: 10,
    },
  });
  const { getAllUnit } = useQueryUnit(useBuilderQuery(filter));

  const onFinish = (data: TCreateUser) => {
    console.log('data:', data);

    handleCreateUser(data);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên người dùng"
        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
      >
        <Input placeholder="Nhập tên người dùng" />
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
        name="userRoles"
        label="Quyền"
        rules={[{ required: true, message: 'Vui lòng chọn quyền' }]}
      >
        <Select placeholder="Chọn quyền">
          {ROLE.filter(
            (role) => role.name !== RoleEnumString.DEV && role.name !== RoleEnumString.ADMIN
          ).map((role) => (
            <Select.Option key={role.id} value={role.name}>
              <RoleTag role={role.name} />
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="unitId"
        label="Đơn vị"
        rules={[{ required: true, message: 'Vui lòng chọn đơn vị' }]}
      >
        <Select placeholder="Chọn đơn vị" virtual={false}>
          {getAllUnit.data?.data.filter((unit) => unit.users.length < 10).map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
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
