import { Button, Form, Input, Select, Space, InputNumber, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TCreateGoodsIssue } from '@/interface/TGoodsIssuse';
import { TProduct } from '@/interface/TProduct';
import { TOrder } from '@/interface/TOder';
import { ProductTypes } from '@/Constant/ProductTypes';
import { OrderStatus } from '@/Constant/OderStatus';
import dayjs from 'dayjs';

interface CreateGoodsIssueProps {
  handleCreateGoodsIssue: (data: TCreateGoodsIssue) => void;
  orders: TOrder[];
  products: TProduct[];
  isLoadingProducts: boolean;
  isLoadingOrders: boolean;
}

const CreateGoodsIssue = ({
  handleCreateGoodsIssue,
  orders,
  products,
  isLoadingProducts,
  isLoadingOrders,
}: CreateGoodsIssueProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formattedData: TCreateGoodsIssue = {
      orderId: values.orderId,
      note: values.note || '',
      details: values.details.map((detail: any) => ({
        productId: detail.productId,
        quantityRequested: detail.quantity,
        quantityIssued: detail.quantity,
      })),
    };

    handleCreateGoodsIssue(formattedData);
    form.resetFields();
  };

  // Lọc chỉ lấy các sản phẩm là hàng hóa thành phẩm
  const productOptions = products
    ?.filter((product) => product.productType === ProductTypes.GOODS)
    .map((product) => ({
      label: `${product.code} - ${product.name}`,
      value: product.id,
    }));

  // Lọc chỉ lấy các đơn hàng có trạng thái INPROCESS hoặc NEW
  const orderOptions = orders
    ?.filter((order) => order.orderStatus !== OrderStatus.CANCELED)
    .map((order) => ({
      label: `${order.code} - ${order.warehouseId}`,
      value: order.id,
    }));

  const disabledDate = (current: dayjs.Dayjs) => {
    // Không cho chọn ngày trong quá khứ
    return current && current < dayjs().startOf('day');
  };

  return (
    <Form
      form={form}
      name="create_goods_issue"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{
        deliveryDate: dayjs().add(1, 'day'),
      }}
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
          options={orderOptions}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      {/* <Form.Item
        name="receiverName"
        label="Người nhận hàng"
        rules={[{ required: true, message: 'Vui lòng nhập tên người nhận hàng' }]}
      >
        <Input placeholder="Nhập tên người nhận hàng" />
      </Form.Item> */}

      <Form.Item
        name="deliveryDate"
        label="Ngày giao hàng"
        rules={[{ required: true, message: 'Vui lòng chọn ngày giao hàng' }]}
      >
        <DatePicker className="w-full" disabledDate={disabledDate} format="DD/MM/YYYY" />
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
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'productId']}
                  rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn sản phẩm"
                    optionFilterProp="children"
                    style={{ width: 300 }}
                    loading={isLoadingProducts}
                    options={productOptions}
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'quantity']}
                  rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Số lượng"
                    style={{ width: 120 }}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => {
                      const parsedValue = value ? parseInt(value.replace(/\$\s?|(,*)/g, '')) : 0;
                      return parsedValue as any;
                    }}
                  />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
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

      <Form.Item name="note" label="Ghi chú">
        <Input.TextArea rows={4} placeholder="Nhập ghi chú nếu có" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          Tạo phiếu xuất
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGoodsIssue;
