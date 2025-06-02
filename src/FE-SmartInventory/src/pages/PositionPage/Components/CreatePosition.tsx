import { Form, Input, Button, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TCreatePosition } from '@/interface/TPosition';

interface CreateDeviceTypeProps {
  handleCreatePosition: (data: TCreatePosition) => void;
}

const CreateDeviceType: React.FC<CreateDeviceTypeProps> = ({ handleCreatePosition }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const onFinish = async (values: TCreatePosition) => {
    console.log('values: ', values);

    handleCreatePosition(values);
    form.resetFields();
    setFile(null);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên chức vụ"
        rules={[{ required: true, message: 'Vui lòng nhập tên chức vụ' }]}
      >
        <Input placeholder="Nhập tên chức vụ" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
        Tạo
      </Button>
    </Form>
  );
};

export default CreateDeviceType;
