import React, { useState } from 'react';
import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Divider } from 'antd';
import { TCreateAgency } from '@/interface/TAgency';
import { RoleEnumString, ROLE } from '@/Constant';
import { useBuilderQuery } from '@/hook';
import { toJoin, toOrderBy } from '@/utils';
import { TBuilderQuery } from '@/interface';
import { MdAddHomeWork } from 'react-icons/md';

const { Option } = Select;

const CreateAgency = ({ handleCreateAgency }: { handleCreateAgency: (data: TCreateAgency) => void }) => {
  const [form] = Form.useForm();
  const [filter, setFilter] =useState<TBuilderQuery>( {
    toJoin: ['agency.*'],
    isAsc: true,
    orderBy: 'name',
    toPaging: {
      page: 1,
      pageSize: 10,
    },
  });

  const onFinish = (data: TCreateAgency) => {
    console.log('data:', data);

    handleCreateAgency(data);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="wardId"
        label="WardId"
        rules={[{ required: true, message: 'Vui lòng nhập WardId' }]}
      >
        <Input placeholder="Nhập DistrictI" />
      </Form.Item>
      <Form.Item
        name="districtI"
        label="DistrictI"
        rules={[{ required: true, message: 'Vui lòng nhập DistrictI' }]}
      >
        <Input placeholder="Nhập DistrictI" />
      </Form.Item>
      <Form.Item
        name="provinceId"
        label="ProvinceId"
        rules={[{ required: true, message: 'Vui lòng nhập ProvinceId' }]}
      >
        <Input placeholder="Nhập ProvinceId" />
      </Form.Item>
      <Form.Item
        name="name"
        label="Tên đại lý"
        rules={[{ required: true, message: 'Vui lòng nhập tên đại lý' }]}
      >
        <Input placeholder="Nhập tên đại lý" />
      </Form.Item>
      <Form.Item
        name="representative"
        label="Tên người đại diện"
        rules={[{ required: true, message: 'Vui lòng nhập tên người đại diện' }]}
      >
        <Input placeholder="Nhập tên người đại diện" />
      </Form.Item>
      <Form.Item
        name="taxCode"
        label="Mã số thuế"
        rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
      >
        <Input placeholder="Nhập mã số thuế" />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
      >
        <Input placeholder="Nhập số điện thoại" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Vui lòng nhập Email' }]}
      >
        <Input placeholder="Nhập Email" />
      </Form.Item>
      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>
      <Form.Item
        name="currentDebt"
        label="Công nợ"
        rules={[{ required: true, message: 'Vui lòng nhập Công nợ' }]}
      >
        <Input placeholder="Nhập Địa chỉ" />
      </Form.Item>
      <Form.Item
        name="note"
        label="Ghi chú"
        rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
      >
        <Input placeholder="Nhập ghi chú" />
      </Form.Item>
      <Button
        type="primary"
        // variant="solid"
        htmlType="submit"
        className="w-full font-semibold "
        icon={<MdAddHomeWork />}
      >
        Thêm đại lý
      </Button>
    </Form>
  );
};

export default CreateAgency;
