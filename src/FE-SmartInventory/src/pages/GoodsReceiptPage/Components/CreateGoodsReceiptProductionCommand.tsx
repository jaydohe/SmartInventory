import { Button, Form, Input, Select, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TGoodsReceiptCreateProductionCommand } from '@/interface/TGoodsReceipt';
import { TProduct } from '@/interface/TProduct';

interface CreateGoodsReceiptProductionCommandProps {
  handleCreateGoodsReceipt: (data: TGoodsReceiptCreateProductionCommand) => void;
  productionCommands: { id: string; code: string }[];
  products: TProduct[];
  isLoadingProductionCommands: boolean;
  isLoadingProducts: boolean;
}

const CreateGoodsReceiptProductionCommand = ({
  handleCreateGoodsReceipt,
  productionCommands,
  products,
  isLoadingProductionCommands,
  isLoadingProducts,
}: CreateGoodsReceiptProductionCommandProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formattedData: TGoodsReceiptCreateProductionCommand = {
      productionCommandId: values.productionCommandId,
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
      name="create_goods_receipt_production_command"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="productionCommandId"
        label="Lệnh sản xuất"
        rules={[{ required: true, message: 'Vui lòng chọn lệnh sản xuất' }]}
      >
        <Select
          showSearch
          placeholder="Chọn lệnh sản xuất"
          optionFilterProp="children"
          loading={isLoadingProductionCommands}
          options={productionCommands.map((command) => ({
            label: `Lệnh SX: ${command.code}`,
            value: command.id,
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
                    showSearch
                    placeholder="Chọn sản phẩm"
                    optionFilterProp="children"
                    style={{ width: 250 }}
                    loading={isLoadingProducts}
                    options={productOptions}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  className="w-full"
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

export default CreateGoodsReceiptProductionCommand;
