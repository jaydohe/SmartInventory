import { TCreateCategory, TCategory } from '@/interface/TCategory';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;

interface EditCategoryWarehouseProps {
  handleUpdateCategoryWarehouse: (id: string, data: TCreateCategory) => void;
  category: TCategory;
}

const EditCategoryWarehouse: React.FC<EditCategoryWarehouseProps> = ({
  handleUpdateCategoryWarehouse,
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
    handleUpdateCategoryWarehouse(category.id, values);
    form.resetFields();
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên danh mục kho"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục kho' }]}
        >
          <Input placeholder="Nhập tên danh mục kho" className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật danh mục
        </Button>
      </Form>
    </>
  );
};

export default EditCategoryWarehouse;
