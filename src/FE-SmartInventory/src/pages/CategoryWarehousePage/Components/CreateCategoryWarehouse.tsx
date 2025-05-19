import { Form, Input, Button } from 'antd';
import { TCreateCategory } from '@/interface/TCategory';

interface CreateCategoryWarehouseProps {
  handleCreateCategoryWarehouse: (data: TCreateCategory) => void;
}

const CreateCategoryWarehouse: React.FC<CreateCategoryWarehouseProps> = ({
  handleCreateCategoryWarehouse,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: TCreateCategory) => {
    handleCreateCategoryWarehouse(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên danh mục kho"
        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục kho' }]}
      >
        <Input placeholder="Nhập tên danh mục kho" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
        Tạo
      </Button>
    </Form>
  );
};

export default CreateCategoryWarehouse;
