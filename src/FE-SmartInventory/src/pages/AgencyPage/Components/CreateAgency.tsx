import { Form, Input, Button, InputNumber } from 'antd';
import { TCreateAgency } from '@/interface/TAgency';

interface CreateAgencyProps {
  handleCreateAgency: (data: TCreateAgency) => void;
}

const CreateAgency: React.FC<CreateAgencyProps> = ({ handleCreateAgency }) => {
  const [form] = Form.useForm();

  const onFinish = async (values: TCreateAgency) => {
    handleCreateAgency(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên đại lý"
        rules={[{ required: true, message: 'Vui lòng nhập tên đại lý' }]}
      >
        <Input placeholder="Nhập tên đại lý" />
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

      <Form.Item name="currentDebt" label="Công nợ phải thu">
        <InputNumber
          className="w-full"
          placeholder="Nhập công nợ phải thu"
          formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          min={0}
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

export default CreateAgency;
