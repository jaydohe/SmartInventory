import { TMaterialSupplier, TMaterialSupplierUpdate } from '@/interface/TMaterialSupplier';
import { Button, Form, Input, InputNumber, Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;

interface EditMaterialSupplierProps {
  handleUpdateMaterialSupplier: (id: string, data: TMaterialSupplierUpdate) => void;
  materialSupplier: TMaterialSupplier;
}

const EditMaterialSupplier: React.FC<EditMaterialSupplierProps> = ({
  handleUpdateMaterialSupplier,
  materialSupplier,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (materialSupplier) {
      form.setFieldsValue({
        name: materialSupplier.name,
        representative: materialSupplier.representative,
        phoneNumber: materialSupplier.phoneNumber,
        businessItem: materialSupplier.businessItem,
        email: materialSupplier.email,
        address: materialSupplier.address,
        currentDebt: materialSupplier.currentDebt,
        note: materialSupplier.note,
      });
    }
  }, [materialSupplier, form]);

  const onFinish = async (values: TMaterialSupplierUpdate) => {
    handleUpdateMaterialSupplier(materialSupplier.id, values);
    form.resetFields();
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên nhà cung cấp"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp' }]}
        >
          <Input placeholder="Nhập tên nhà cung cấp" className="w-full" />
        </Form.Item>

        <Form.Item
          name="representative"
          label="Người đại diện"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên người đại diện' }]}
        >
          <Input placeholder="Nhập tên người đại diện" className="w-full" />
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
          name="businessItem"
          label="Mặt hàng kinh doanh"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập mặt hàng kinh doanh' }]}
        >
          <Input placeholder="Nhập mặt hàng kinh doanh" className="w-full" />
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

        <Form.Item name="currentDebt" label="Công nợ phải trả" className="font-medium">
          <InputNumber
            className="w-full"
            placeholder="Nhập công nợ phải trả"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú" className="font-medium">
          <Input.TextArea placeholder="Nhập ghi chú" rows={4} className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật nhà cung cấp
        </Button>
      </Form>
    </>
  );
};

export default EditMaterialSupplier;
