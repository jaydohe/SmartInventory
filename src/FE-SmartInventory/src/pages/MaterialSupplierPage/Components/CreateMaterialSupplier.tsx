import { Form, Input, Button, InputNumber } from 'antd';
import { TMaterialSupplierCreate } from '@/interface/TMaterialSupplier';

interface CreateMaterialSupplierProps {
  handleCreateMaterialSupplier: (data: TMaterialSupplierCreate) => void;
}

const CreateMaterialSupplier: React.FC<CreateMaterialSupplierProps> = ({
  handleCreateMaterialSupplier,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: TMaterialSupplierCreate) => {
    handleCreateMaterialSupplier(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên nhà cung cấp"
        rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp' }]}
      >
        <Input placeholder="Nhập tên nhà cung cấp" />
      </Form.Item>

      <Form.Item
        name="representative"
        label="Người đại diện"
        rules={[{ required: true, message: 'Vui lòng nhập tên người đại diện' }]}
      >
        <Input placeholder="Nhập tên người đại diện" />
      </Form.Item>

      <Form.Item name="taxCode" label="Mã số thuế">
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
        name="businessItem"
        label="Mặt hàng kinh doanh"
        rules={[{ required: true, message: 'Vui lòng nhập mặt hàng kinh doanh' }]}
      >
        <Input placeholder="Nhập mặt hàng kinh doanh" />
      </Form.Item>

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

      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
      >
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>

      <Form.Item name="currentDebt" label="Công nợ phải trả">
        <InputNumber
          className="w-full"
          placeholder="Nhập công nợ phải trả"
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      </Form.Item>

      <Form.Item name="note" label="Ghi chú">
        <Input.TextArea placeholder="Nhập ghi chú" rows={4} />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
        Tạo
      </Button>
    </Form>
  );
};

export default CreateMaterialSupplier;
