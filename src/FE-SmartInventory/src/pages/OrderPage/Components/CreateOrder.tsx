import { Button, Form, Input, Select, Space, InputNumber, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TCreateOrder } from '@/interface/TOder';
import { TProduct } from '@/interface/TProduct';
import { genProductTypes, ProductTypes } from '@/Constant/ProductTypes';
import { TWarehouse } from '@/interface/TWarehouse';

interface CreateOrderProps {
  handleCreateOrder: (data: TCreateOrder) => void;
  agencies: { id: string; name: string }[];
  products: TProduct[];
  warehouses: TWarehouse[];
  isLoadingProducts: boolean;
  isLoadingAgencies: boolean;
  isLoadingWarehouses: boolean;
}

const CreateOrder = ({
  handleCreateOrder,
  agencies,
  products,
  warehouses,
  isLoadingProducts,
  isLoadingAgencies,
  isLoadingWarehouses,
}: CreateOrderProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formattedData: TCreateOrder = {
      warehouseId: values.warehouseId,
      agencyId: values.agencyId,
      isRefund: values.isRefund || false,
      vat: values.vat || 0,
      discount: values.discount || 0,
      orderDetails: values.orderDetails.map((detail: any) => ({
        productId: detail.productId,
        quantity: detail.quantity,
      })),
    };

    handleCreateOrder(formattedData);
    form.resetFields();
  };

  // Lọc chỉ lấy các sản phẩm là hàng hóa thành phẩm
  // const productOptions = products
  //   ?.filter((product) => product.productType === ProductTypes.GOODS)
  //   .map((product) => ({
  //     label: `${product.code} - ${product.name}`,
  //     value: product.id,
  //   }));

  return (
    <Form
      form={form}
      name="create_order"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        isRefund: false,
        vat: 0,
        discount: 0,
      }}
    >
      <Form.Item
        name="warehouseId"
        label="Kho"
        rules={[{ required: true, message: 'Vui lòng chọn kho' }]}
      >
        <Select
          showSearch
          placeholder="Chọn kho"
          optionFilterProp="children"
          loading={isLoadingWarehouses}
          options={warehouses.map((warehouse) => ({
            label: warehouse.name,
            value: warehouse.id,
          }))}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      <Form.Item
        name="agencyId"
        label="Đại lý"
        rules={[{ required: true, message: 'Vui lòng chọn đại lý' }]}
      >
        <Select
          showSearch
          placeholder="Chọn đại lý"
          optionFilterProp="children"
          loading={isLoadingAgencies}
          options={agencies.map((agency) => ({
            label: agency.name,
            value: agency.id,
          }))}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <div className="flex justify-between gap-4 mb-4">
        <Form.Item name="vat" label="VAT (%)" className="w-1/3">
          <InputNumber min={0} max={100} className="w-full" />
        </Form.Item>

        <Form.Item name="discount" label="Giảm giá (%)" className="w-1/3">
          <InputNumber min={0} max={100} className="w-full" />
        </Form.Item>

        <Form.Item name="isRefund" label="Thu hồi hàng?" valuePropName="checked" className="w-1/3">
          <Switch />
        </Form.Item>
      </div>

      <Form.List
        name="orderDetails"
        rules={[
          {
            validator: async (_, orderDetails) => {
              if (!orderDetails || orderDetails.length === 0) {
                return Promise.reject(new Error('Vui lòng thêm ít nhất một sản phẩm'));
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="flex gap-2">
                <Form.Item
                  className="w-full"
                  {...restField}
                  name={[name, 'productId']}
                  rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
                >
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Chọn sản phẩm"
                    optionFilterProp="children"
                    loading={isLoadingProducts}
                    options={products.map((product) => ({
                      label: `${product.name} - ${genProductTypes[product.productType]}`,
                      value: product.id,
                    }))}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
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
                Thêm sản phẩm
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Tạo đơn hàng
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateOrder;
