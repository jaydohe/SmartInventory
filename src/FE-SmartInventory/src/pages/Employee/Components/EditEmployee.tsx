import { Form, Input, Button, Select, Switch, Row, Col, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { TEmployee, TUpdateEmployee } from '@/interface/TEmployee';
import { GENDER, genGenderTypes } from '@/Constant/EmployeeTypes';
import dayjs from 'dayjs';
import { useQueryDepartment } from '@/pages/DepartmentPage/Hook/useQueryDepartment';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import { TBuilderQuery } from '@/interface';
import { useBuilderQuery } from '@/hook/useBuilderQuery';
import { useQueryPosition } from '@/pages/PositionPage/Hook/useQueryPosition';

interface EditEmployeeProps {
  handleUpdateEmployee: (id: string, data: TUpdateEmployee) => void;
  employee: TEmployee;
}

const EditEmployee: React.FC<EditEmployeeProps> = ({ handleUpdateEmployee, employee }) => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useState<TBuilderQuery>({
    isAsc: false,

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
  const { getAllWarehouse } = useQueryWarehouse(useBuilderQuery(filter));
  const { getAllDepartment } = useQueryDepartment(useBuilderQuery(filter));
  const { getAllPosition } = useQueryPosition(useBuilderQuery(filter));
  useEffect(() => {
    if (employee) {
      form.setFieldsValue({
        name: employee.name,
        departmentId: employee.departmentId,
        positionId: employee.positionId,
        warehouseId: employee.warehouseId,
        gender: employee.genderType,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        address: employee.address,
        isManager: employee.isManager,
      });
    }
  }, [employee, form]);

  const onFinish = async (values: any) => {
    const dataSubmit: TUpdateEmployee = {
      ...values,
      isManager: values.isManager || false,
    };
    handleUpdateEmployee(employee.id, dataSubmit);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên nhân viên"
        rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
      >
        <Input placeholder="Nhập tên nhân viên" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="departmentId"
            label="Phòng ban"
            rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]}
          >
            <Select placeholder="Chọn phòng ban">
              {getAllDepartment.data?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="positionId"
            label="chức vụ"
            rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
          >
            <Select placeholder="Chọn chức vụ">
              {getAllPosition.data?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
          >
            <Select placeholder="Chọn giới tính">
              {GENDER.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {genGenderTypes[item.name]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="warehouseId" label="Kho">
            <Select placeholder="Chọn kho" allowClear>
              {getAllWarehouse.data?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>

      <Form.Item name="isManager" label="Là quản lý" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base mt-4">
        Cập nhật nhân viên
      </Button>
    </Form>
  );
};

export default EditEmployee;
