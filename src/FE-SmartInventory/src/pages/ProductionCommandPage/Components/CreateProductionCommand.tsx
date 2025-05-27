import { Button, DatePicker, Form, Input, InputNumber, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TProductionCommandCreate } from '@/interface/TProductionCommand';
import { TProduct } from '@/interface/TProduct';
import { genProductTypes, ProductTypes } from '@/Constant/ProductTypes';
import dayjs from 'dayjs';

interface CreateProductionCommandProps {
  handleCreateProductionCommand: (data: TProductionCommandCreate) => void;
  products: TProduct[];
  materials: TProduct[];
  isLoadingProducts: boolean;
}

const CreateProductionCommand = ({
  handleCreateProductionCommand,
  products,
  materials,
  isLoadingProducts,
}: CreateProductionCommandProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formattedData: TProductionCommandCreate = {
      plannedStart: values.plannedStart.toISOString(),
      plannedEnd: values.plannedEnd.toISOString(),
      productionCommandDetails: values.productionCommandDetails,
    };

    handleCreateProductionCommand(formattedData);
    form.resetFields();
  };

  // Lọc chỉ lấy các sản phẩm là nguyên vật liệu
  const materialOptions = products
    ?.filter((product) => product.productType === ProductTypes.RAW_MATERIAL)
    .map((product) => ({
      label: `${product.code} - ${product.name}`,
      value: product.id,
    }));

  const disabledDate = (current: dayjs.Dayjs) => {
    // Không cho chọn ngày trong quá khứ
    return current && current < dayjs().startOf('day');
  };

  return (
    <Form
      form={form}
      name="create_production_command"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        plannedStart: dayjs(),
        plannedEnd: dayjs().add(7, 'day'),
      }}
    >
      <div className="flex justify-between gap-4">
        <Form.Item
          name="plannedStart"
          label="Ngày bắt đầu"
          rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
          className="w-1/2"
        >
          <DatePicker className="w-full" disabledDate={disabledDate} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          name="plannedEnd"
          label="Ngày kết thúc"
          rules={[
            { required: true, message: 'Vui lòng chọn ngày kết thúc' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('plannedStart').isBefore(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'));
              },
            }),
          ]}
          className="w-1/2"
        >
          <DatePicker className="w-full" disabledDate={disabledDate} format="DD/MM/YYYY" />
        </Form.Item>
      </div>

      <h3 className="font-semibold mt-4 mb-2">Nguyên vật liệu cần thiết</h3>

      <Form.List name="productionCommandDetails">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div className="flex gap-2">
                <Form.Item
                  className="w-full"
                  {...restField}
                  name={[name, 'productId']}
                  rules={[{ required: true, message: 'Vui lòng chọn nguyên vật liệu' }]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn sản phẩm"
                    optionFilterProp="children"
                    options={products.map((product) => ({
                      label: `${product.code} - ${product.name}`,
                      value: product.id,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  className="w-1/3"
                  {...restField}
                  name={[name, 'quantity']}
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Số lượng"
                    className="w-full"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => {
                      const parsedValue = value ? parseInt(value.replace(/\$\s?|(,*)/g, '')) : 0;
                      return parsedValue as any;
                    }}
                  />
                </Form.Item>
                <MinusCircleOutlined
                  className="mb-6 text-errorColor"
                  onClick={() => remove(name)}
                />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                className="mt-2"
              >
                Thêm nguyên vật liệu
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Tạo lệnh sản xuất
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateProductionCommand;
