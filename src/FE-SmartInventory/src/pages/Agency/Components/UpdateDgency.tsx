import { Form, Input, Button } from 'antd';
import { TUpdateAgency} from '@/interface/TAgency';
import { useState } from 'react';

const UpdateAgency = ({
    initialValues,
    handleUpdateAgency,
    handleCancel,
  }: {
    initialValues: TUpdateAgency;
      handleUpdateAgency: (values: TUpdateAgency) => void;
      handleCancel: () => void;
    }) => {
      const [form] = Form.useForm();
      const [formChange, setFormChange] = useState(false);
    
      const onFinish = (values: TUpdateAgency) => {
        handleUpdateAgency(values);
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
                  name="Representative"
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
    
    export default UpdateAgency;
    