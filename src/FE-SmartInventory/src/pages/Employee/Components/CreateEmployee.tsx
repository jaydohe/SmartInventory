import { GENDER, genGenderTypes } from '@/Constant/EmployeeTypes';
import { useBuilderQuery } from '@/hook';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import { TBuilderQuery } from '@/interface';
import { TCreateEmployee } from '@/interface/TEmployee';
import { Button, DatePicker, Form, Input, Select, Switch, Row, Col } from 'antd';
import { useState } from 'react';
import { TiUserAdd } from 'react-icons/ti';
import GenderTag from './GenderTag';

import CreateUser from '@/pages/User/Components/CreateUser';
import { CalendarOutlined } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
import { useQueryDepartment } from '@/pages/DepartmentPage/Hook/useQueryDepartment';
import { useQueryPosition } from '@/pages/PositionPage/Hook/useQueryPosition';

const { Option } = Select;

interface CreateEmployeeProps {
  handleCreateEmployee: (data: TCreateEmployee) => void;
}

const CreateEmployee: React.FC<CreateEmployeeProps> = ({ handleCreateEmployee }) => {
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

  const [selectedLocations, setSelectedLocations] = useState<{
    cityCode?: string;
    districtCode?: string;
    wardCode?: string;
  }>({});

  const [filterDistricts, setFilterDistricts] = useState<TBuilderQuery>({});
  const [filterWards, setFilterWards] = useState<TBuilderQuery>({});

  // console.log('ADDRESS', cityList, districtList, wardList);

  const handleCityChange = async (valueId: string) => {
    try {
      // Reset everything first
      form.setFieldsValue({
        districtCode: undefined,
        wardCode: undefined,
      });

      setSelectedLocations({
        cityCode: valueId,
        districtCode: undefined,
        wardCode: undefined,
      });

      setFilterDistricts({
        appendQuery: [
          {
            provinceId: {
              value: `${valueId}`,
              queryOperator: '$eq',
              queryOperatorParent: '$and',
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  const handleDistrictChange = async (valueId: string) => {
    try {
      // Reset ward field
      form.setFieldsValue({
        wardCode: undefined,
      });

      setSelectedLocations((prev) => ({
        ...prev,
        districtCode: valueId,
        wardCode: undefined,
      }));

      setFilterWards({
        appendQuery: [
          {
            districtId: {
              value: `${valueId}`,
              queryOperator: '$eq',
              queryOperatorParent: '$and',
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error updating district:', error);
    }
  };

  const handleWardChange = (valueId: string) => {
    setSelectedLocations((prev) => ({
      ...prev,
      wardCode: valueId,
    }));
  };

  const onFinish = async (values: any) => {
    const dataSubmit: TCreateEmployee = {
      ...values,
      dateHired: values.dateHired ? values.dateHired.format('YYYY-MM-DD') : '',
      isManager: values.isManager || false,
    };
    handleCreateEmployee(dataSubmit);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="code"
            label="Mã nhân viên"
            rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
          >
            <Input placeholder="Nhập mã nhân viên" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Tên nhân viên"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
          >
            <Input placeholder="Nhập tên nhân viên" />
          </Form.Item>
        </Col>
      </Row>

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

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="dateHired"
            label="Ngày bắt đầu làm việc"
            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu làm việc' }]}
          >
            <DatePicker
              placeholder="Chọn ngày bắt đầu làm việc"
              className="w-full"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="isManager" label="Là quản lý" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base mt-4">
        Tạo nhân viên
      </Button>
    </Form>
  );
};

export default CreateEmployee;
