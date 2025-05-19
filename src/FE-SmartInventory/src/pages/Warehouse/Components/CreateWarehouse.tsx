import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { TCreateWarehouse } from '@/interface/TWarehouse';
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { useState, useEffect } from 'react';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import { useQueryEmployee } from '@/pages/Employee/Hook/useEmployeePage';
import { useQueryCategoryWarehouse } from '@/pages/CategoryWarehousePage/Hook/useQueryCategoryWarehouse';

interface CreateWarehouseProps {
  handleCreateWarehouse: (data: TCreateWarehouse) => void;
}

const CreateWarehouse: React.FC<CreateWarehouseProps> = ({ handleCreateWarehouse }) => {
  const [form] = Form.useForm();
  const [isParentWarehouse, setIsParentWarehouse] = useState<boolean>(true);

  // Filter để lấy danh sách kho
  const [warehouseFilter, setWarehouseFilter] = useState<TBuilderQuery>({
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

  // Filter để lấy danh sách nhân viên quản lý (isManager = true)
  const [employeeFilter, setEmployeeFilter] = useState<TBuilderQuery>({
    appendQuery: [
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
      {
        isManager: {
          value: 'true',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  // Filter để lấy danh sách danh mục kho
  const [categoryFilter, setCategoryFilter] = useState<TBuilderQuery>({
    appendQuery: [
      // {
      //   deletedOn: {
      //     value: 'null',
      //     queryOperator: '$eq',
      //     queryOperatorParent: '$and',
      //   },
      // },
    ],
  });

  // Lấy danh sách kho, nhân viên quản lý, danh mục kho
  const { getAllWarehouse } = useQueryWarehouse(useBuilderQuery(warehouseFilter));
  const { getAllEmployee } = useQueryEmployee(useBuilderQuery(employeeFilter));
  const { getAllCategoryWarehouse } = useQueryCategoryWarehouse(useBuilderQuery(categoryFilter));

  const handleParentWarehouseChange = (e: any) => {
    const isChecked = e.target.checked;
    setIsParentWarehouse(isChecked);

    if (isChecked) {
      form.setFieldsValue({
        warehouseId: undefined,
      });
    }
  };

  const onFinish = (values: any) => {
    const dataSubmit: TCreateWarehouse = {
      ...values,
      warehouseId: isParentWarehouse ? undefined : values.warehouseId,
    };
    handleCreateWarehouse(dataSubmit);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item>
        <Checkbox checked={isParentWarehouse} onChange={handleParentWarehouseChange}>
          Là kho cha
        </Checkbox>
      </Form.Item>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Tên kho"
            rules={[{ required: true, message: 'Vui lòng nhập tên kho' }]}
          >
            <Input placeholder="Nhập tên kho" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={isParentWarehouse ? 24 : 12}>
          <Form.Item
            name="managerId"
            label="Nhân viên quản lý"
            rules={[{ required: true, message: 'Vui lòng chọn nhân viên quản lý' }]}
          >
            <Select placeholder="Chọn nhân viên quản lý">
              {getAllEmployee.data?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        {!isParentWarehouse && (
          <Col span={12}>
            <Form.Item
              name="warehouseId"
              label="Kho cha"
              rules={[{ required: true, message: 'Vui lòng chọn kho cha' }]}
            >
              <Select placeholder="Chọn kho cha">
                {getAllWarehouse.data?.data.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="categoryId" label="Danh mục kho">
            <Select placeholder="Chọn danh mục kho" allowClear>
              {getAllCategoryWarehouse.data?.data.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="capacity"
            label="Dung tích kho"
            rules={[{ required: true, message: 'Vui lòng nhập dung tích kho' }]}
          >
            <InputNumber
              placeholder="Nhập dung tích kho"
              className="w-full"
              min={0}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => {
                const parsedValue = value ? parseInt(value.replace(/\$\s?|(,*)/g, '')) : 0;
                return parsedValue as any;
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="address"
        label="Địa chỉ kho"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ kho' }]}
      >
        <Input placeholder="Nhập địa chỉ kho" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
        Tạo kho
      </Button>
    </Form>
  );
};

export default CreateWarehouse;
