import { TCreateCategory, TCategory } from '@/interface/TCategory';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;

interface EditCategoryProductProps {
  handleUpdateCategoryProduct: (id: string, data: TCreateCategory) => void;
  category: TCategory;
}

const EditCategoryProduct: React.FC<EditCategoryProductProps> = ({
  handleUpdateCategoryProduct,
  category,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
      });
    }
  }, [category, form]);

  const onFinish = async (values: TCreateCategory) => {
    handleUpdateCategoryProduct(category.id, values);
    form.resetFields();
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên danh mục sản phẩm"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục sản phẩm' }]}
        >
          <Input placeholder="Nhập tên danh mục sản phẩm" className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật danh mục
        </Button>
      </Form>
    </>
  );
};

export default EditCategoryProduct;
