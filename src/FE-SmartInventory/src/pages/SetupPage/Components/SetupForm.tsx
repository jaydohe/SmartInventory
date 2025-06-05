import React, { useEffect } from 'react';
import { Form, InputNumber, Button, Space, Typography, Card, Divider, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { TCreateSetup, TGetSetup } from '@/interface/TGetSetup';

const { Title, Text, Paragraph } = Typography;

interface SetupFormProps {
  initialData?: TGetSetup;
  handleSubmit: (data: TCreateSetup) => void;
  isLoading: boolean;
}

const SetupForm: React.FC<SetupFormProps> = ({ initialData, handleSubmit, isLoading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        zScore: initialData.zScore,
        minStockLevel: initialData.minStockLevel,
      });
    }
  }, [initialData, form]);

  const onFinish = (values: TCreateSetup) => {
    handleSubmit(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        zScore: 1.65,
        minStockLevel: 5,
      }}
    >
      <Card className="mb-4">
        <Title level={5}>Thiết lập thông số hệ thống</Title>
        <Paragraph className="text-gray-500 mb-4">
          Các thông số này sẽ được sử dụng để tính toán mức tồn kho an toàn và các giá trị tối ưu
          khác trong hệ thống quản lý kho.
        </Paragraph>

        <Form.Item
          name="zScore"
          label={
            <span>
              Mức dịch vụ mong muốn (Z-Score){' '}
              <Tooltip title="Z-Score tương ứng với mức độ tin cậy của tồn kho an toàn. Giá trị 1.65 tương ứng với mức độ tin cậy 95%.">
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            { required: true, message: 'Vui lòng nhập Z-Score!' },
            { type: 'number', min: 0, message: 'Z-Score phải lớn hơn hoặc bằng 0!' },
          ]}
        >
          <InputNumber
            placeholder="Nhập Z-Score"
            step={0.01}
            precision={2}
            min={0}
            className="w-full"
          />
        </Form.Item>

        <Form.Item
          name="minStockLevel"
          label={
            <span>
              Mức tồn kho tối thiểu{' '}
              <Tooltip title="Mức tồn kho tối thiểu là số lượng tồn kho tối thiểu mà bạn muốn duy trì trong kho.">
                <InfoCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            { required: true, message: 'Vui lòng nhập mức tồn kho tối thiểu!' },
            { type: 'number', min: 0, message: 'Mức tồn kho tối thiểu phải lớn hơn hoặc bằng 0!' },
          ]}
        >
          <InputNumber placeholder="Nhập mức tồn kho tối thiểu" min={0} className="w-full" />
        </Form.Item>
      </Card>

      <Card className="mb-4 bg-blue-50">
        <Title level={5}>Thông tin về Z-Score</Title>
        <Paragraph>
          <ul className="list-disc pl-5">
            <li>Z-Score 1.28 tương ứng với mức độ tin cậy 90%</li>
            <li>Z-Score 1.65 tương ứng với mức độ tin cậy 95%</li>
            <li>Z-Score 1.96 tương ứng với mức độ tin cậy 97.5%</li>
            <li>Z-Score 2.33 tương ứng với mức độ tin cậy 99%</li>
            <li>Z-Score 2.58 tương ứng với mức độ tin cậy 99.5%</li>
          </ul>
        </Paragraph>
        <Text className="text-gray-600">
          Mức độ tin cậy càng cao, tồn kho an toàn càng lớn, chi phí duy trì tồn kho càng cao, nhưng
          khả năng thiếu hàng càng thấp.
        </Text>
      </Card>

      <Divider />

      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Khôi phục
          </Button>
          <Button type="primary" htmlType="submit" loading={isLoading} className="bg-blue-600">
            {initialData ? 'Cập nhật thông số' : 'Tạo mới thông số'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SetupForm;
