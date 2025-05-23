import { Button, Form, Input, Select, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TGoodsReceiptCreateOrder } from '@/interface/TGoodsReceipt';
import { TProduct } from '@/interface/TProduct';
import { TOrder } from '@/interface/TOder';

interface CreateGoodsReceiptOrderProps {
  handleCreateGoodsReceipt: (data: TGoodsReceiptCreateOrder) => void;
  orders: TOrder[];
  products: TProduct[];
  isLoadingOrders: boolean;
  isLoadingProducts: boolean;
}

const CreateGoodsReceiptOrder = ({
  handleCreateGoodsReceipt,
  orders,
  products,
  isLoadingOrders,
  isLoadingProducts,
}: CreateGoodsReceiptOrderProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formattedData: TGoodsReceiptCreateOrder = {
      orderId: values.orderId,
      shipperName: values.shipperName,
      details: values.details.map((detail: any) => ({
        productId: detail.productId,
        quantityOrdered: detail.quantityOrdered,
        quantityReceived: detail.quantityReceived,
      })),
    };

    handleCreateGoodsReceipt(formattedData);
    form.resetFields();
  };

  // Tạo danh sách options cho sản phẩm
  const productOptions = products?.map((product) => ({
    label: `${product.code} - ${product.name}`,
    value: product.id,
  }));

  return (
    <Form
      form={form}
      name="create_goods_receipt_order"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="orderId"
        label="Đơn hàng"
        rules={[{ required: true, message: 'Vui lòng chọn đơn hàng' }]}
      >
        <Select
          showSearch
          placeholder="Chọn đơn hàng"
          optionFilterProp="children"
          loading={isLoadingOrders}
          options={orders.map((order) => ({
            label: `Mã đơn hàng: ${order.code} `,
            value: order.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        name="shipperName"
        label="Tên người giao hàng"
        rules={[{ required: true, message: 'Vui lòng nhập tên người giao hàng' }]}
      >
        <Input placeholder="Nhập tên người giao hàng" />
      </Form.Item>

      <Form.List
        name="details"
        rules={[
          {
            validator: async (_, details) => {
              if (!details || details.length === 0) {
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
              <div className="flex gap-2" key={key}>
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
                    options={productOptions}
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  {...restField}
                  name={[name, 'quantityOrdered']}
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng đặt' }]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Số lượng đặt"
                    className="w-full"
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => {
                      const parsedValue = value ? parseInt(value.replace(/\$\s?|(,*)/g, '')) : 0;
                      return parsedValue as any;
                    }}
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  {...restField}
                  name={[name, 'quantityReceived']}
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng nhận' }]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Số lượng nhận"
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
          Tạo phiếu nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGoodsReceiptOrder;
