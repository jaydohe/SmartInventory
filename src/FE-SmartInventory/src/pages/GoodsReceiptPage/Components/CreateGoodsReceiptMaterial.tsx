import { Button, Form, Input, Select, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TGoodsReceiptCreateMaterial } from '@/interface/TGoodsReceipt';
import { TProduct } from '@/interface/TProduct';
import { ProductTypes } from '@/Constant/ProductTypes';
import { TMaterialSupplier } from '@/interface/TMaterialSupplier';

interface CreateGoodsReceiptMaterialProps {
  handleCreateGoodsReceipt: (data: TGoodsReceiptCreateMaterial) => void;
  materialSuppliers: TMaterialSupplier[];
  materials: TProduct[];
  isLoadingMaterials: boolean;
  isLoadingSuppliers: boolean;
}

const CreateGoodsReceiptMaterial = ({
  handleCreateGoodsReceipt,
  materialSuppliers,
  materials,
  isLoadingMaterials,
  isLoadingSuppliers,
}: CreateGoodsReceiptMaterialProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formattedData: TGoodsReceiptCreateMaterial = {
      materialSupplierId: values.materialSupplierId,
      shipperName: values.shipperName,
      note: values.note || '',
      details: values.details.map((detail: any) => ({
        productId: detail.productId,
        quantityOrdered: detail.quantityOrdered,
        quantityReceived: detail.quantityReceived,
      })),
    };

    handleCreateGoodsReceipt(formattedData);
    form.resetFields();
  };

  // Lọc chỉ lấy các sản phẩm là nguyên vật liệu
  const materialOptions = materials
    ?.filter((product) => product.productType === ProductTypes.RAW_MATERIAL)
    .map((product) => ({
      label: `${product.code} - ${product.name}`,
      value: product.id,
    }));

  return (
    <Form
      form={form}
      name="create_goods_receipt_material"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="materialSupplierId"
        label="Nhà cung cấp NVL"
        rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp NVL' }]}
      >
        <Select
          showSearch
          placeholder="Chọn nhà cung cấp"
          optionFilterProp="children"
          loading={isLoadingSuppliers}
          options={materialSuppliers.map((supplier) => ({
            label: supplier.name,
            value: supplier.id,
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
                return Promise.reject(new Error('Vui lòng thêm ít nhất một nguyên vật liệu'));
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
                  rules={[{ required: true, message: 'Vui lòng chọn nguyên vật liệu' }]}
                >
                  <Select
                    className="w-full"
                    showSearch
                    placeholder="Chọn nguyên vật liệu"
                    optionFilterProp="children"
                    loading={isLoadingMaterials}
                    options={materialOptions}
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
                Thêm nguyên vật liệu
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
          Tạo phiếu nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateGoodsReceiptMaterial;
