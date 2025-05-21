import { TAgency, TCreateAgency } from '@/interface/TAgency';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;

interface EditAgencyProps {
  handleUpdateAgency: (id: string, data: TCreateAgency) => void;
  agency: TAgency;
}

const EditAgency: React.FC<EditAgencyProps> = ({ handleUpdateAgency, agency }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (agency) {
      form.setFieldsValue({
        name: agency.name,
        representative: agency.representative,
        taxCode: agency.taxCode,
        phoneNumber: agency.phoneNumber,
        email: agency.email,
        address: agency.address,
        currentDebt: agency.currentDebt,
        note: agency.note,
      });
    }
  }, [agency, form]);

  const onFinish = async (values: TCreateAgency) => {
    handleUpdateAgency(agency.id, values);
    // form.resetFields();
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên đại lý"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên đại lý' }]}
        >
          <Input placeholder="Nhập tên đại lý" className="w-full" />
        </Form.Item>

        <Form.Item
          name="representative"
          label="Người đại diện"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên người đại diện' }]}
        >
          <Input placeholder="Nhập tên người đại diện" className="w-full" />
        </Form.Item>

        <Form.Item name="taxCode" label="Mã số thuế" className="font-medium">
          <Input placeholder="Nhập mã số thuế" className="w-full" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Số điện thoại"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
        >
          <Input placeholder="Nhập số điện thoại" className="w-full" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          className="font-medium"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' },
          ]}
        >
          <Input placeholder="Nhập email" className="w-full" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Địa chỉ"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input placeholder="Nhập địa chỉ" className="w-full" />
        </Form.Item>

        <Form.Item name="currentDebt" label="Công nợ phải thu" className="font-medium">
          <InputNumber
            className="w-full"
            placeholder="Nhập công nợ phải thu"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
          />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú" className="font-medium">
          <Input.TextArea placeholder="Nhập ghi chú" rows={4} className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật đại lý
        </Button>
      </Form>
    </>
  );
};

export default EditAgency;
