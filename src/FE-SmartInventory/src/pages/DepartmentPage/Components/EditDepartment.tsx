import { TCreateDepartment, TDepartment } from '@/interface/TDepartment';
import { Button, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';

const { Text } = Typography;

interface EditDepartmentProps {
  handleUpdateDepartment: (id: string, data: TCreateDepartment) => void;
  department: TDepartment;
}

const EditDepartment: React.FC<EditDepartmentProps> = ({ handleUpdateDepartment, department }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (department) {
      form.setFieldsValue({
        name: department.name,
      });
    }
  }, [department, form]);

  const onFinish = async (values: TCreateDepartment) => {
    handleUpdateDepartment(department.id, values);
    form.resetFields();
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên phòng ban"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng ban' }]}
        >
          <Input placeholder="Nhập tên phòng ban" className="w-full" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật phòng ban
        </Button>
      </Form>
    </>
  );
};

export default EditDepartment;
