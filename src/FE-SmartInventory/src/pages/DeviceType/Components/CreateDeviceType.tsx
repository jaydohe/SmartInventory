import { Form, Input, Button, Checkbox, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { TCreateDeviceType } from '@/interface/TDeviceType';
import { useState } from 'react';

interface CreateDeviceTypeProps {
  handleCreateDeviceType: (data: TCreateDeviceType) => void;
}

const CreateDeviceType: React.FC<CreateDeviceTypeProps> = ({
  handleCreateDeviceType,
}) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const onFinish = async (values: TCreateDeviceType) => {

    console.log('values: ', values);

    // handleCreateDeviceType(values);
    form.resetFields();
    setFile(null);
  };


  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên loại thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập tên loại thiết bị' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="iconPath" label="Đường dẫn icon">
        {/* <Upload listType="picture" beforeUpload={handleChange} maxCount={1}>
          <Button icon={<UploadOutlined />}>Tải lên</Button>
        </Upload> */}
        <Input />

      </Form.Item>
      <Form.Item name="isGateway" valuePropName="checked" label="Gateway">
        <Checkbox />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tạo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateDeviceType;
