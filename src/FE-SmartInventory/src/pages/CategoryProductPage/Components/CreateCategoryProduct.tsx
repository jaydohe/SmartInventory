import { Form, Input, Button } from 'antd';
import { TCreateCategory } from '@/interface/TCategory';

interface CreateCategoryProductProps {
  handleCreateCategoryProduct: (data: TCreateCategory) => void;
}

const CreateCategoryProduct: React.FC<CreateCategoryProductProps> = ({
  handleCreateCategoryProduct,
}) => {
  const [form] = Form.useForm();

  const onFinish = async (values: TCreateCategory) => {
    handleCreateCategoryProduct(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="name"
        label="Tên danh mục sản phẩm"
        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục sản phẩm' }]}
      >
        <Input placeholder="Nhập tên danh mục sản phẩm" />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
        Tạo
      </Button>
    </Form>
  );
};

export default CreateCategoryProduct;
