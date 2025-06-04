import React, { useState } from 'react';
import { Form, Select, Button, Space, InputNumber, Typography, Card, Divider } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { TBomCreate } from '@/interface/TBom';
import { TProduct } from '@/interface/TProduct';
import { ProductTypes } from '@/Constant/ProductTypes';

const { Title, Text } = Typography;
const { Option } = Select;

interface CreateBomProps {
  handleCreateBom: (data: TBomCreate) => void;
  products: TProduct[];
  materials: TProduct[];
  isLoadingProducts: boolean;
  isLoadingMaterials: boolean;
}

const CreateBom: React.FC<CreateBomProps> = ({
  handleCreateBom,
  products,
  materials,
  isLoadingProducts,
  isLoadingMaterials,
}) => {
  const [form] = Form.useForm();
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const onProductChange = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setSelectedProduct(product || null);
  };

  const onFinish = (values: any) => {
    const bomData: TBomCreate = {
      productId: values.productId,
      bomDetails: values.bomDetails.map((detail: any) => ({
        materialId: detail.materialId,
        quantity: detail.quantity,
      })),
    };
    handleCreateBom(bomData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Lọc chỉ lấy sản phẩm (GOODS)
  const availableProducts = products.filter(
    (product) => product.productType === ProductTypes.GOODS
  );

  // Lọc chỉ lấy nguyên vật liệu (RAW_MATERIAL)
  const availableMaterials = materials.filter(
    (material) => material.productType === ProductTypes.RAW_MATERIAL
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      initialValues={{
        bomDetails: [{ materialId: undefined, quantity: 1 }],
      }}
    >
      {/* Chọn sản phẩm */}
      <Card className="mb-4">
        <Title level={5}>Thông tin sản phẩm</Title>
        <Form.Item
          name="productId"
          label="Chọn sản phẩm"
          rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
        >
          <Select
            placeholder="Chọn sản phẩm cần tạo định mức"
            loading={isLoadingProducts}
            onChange={onProductChange}
            showSearch
            filterOption={(input, option) =>
              (option?.label as string).toLowerCase().includes(input.toLowerCase())
            }
            className="w-full"
          >
            {availableProducts.map((product) => (
              <Option key={product.id} value={product.id}>
                <p className="font-medium">
                  {product.name}{' '}
                  <span className="text-sm font-normal text-gray-500">
                    (Mã: {product.code} | Đơn vị: {product.unit})
                  </span>
                </p>
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedProduct && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <Text strong>Sản phẩm đã chọn: </Text>
            <Text>{selectedProduct.name}</Text>
            <br />
            <Text type="secondary">Mã: {selectedProduct.code}</Text>
            <br />
            <Text type="secondary">Đơn vị: {selectedProduct.unit}</Text>
          </div>
        )}
      </Card>

      {/* Danh sách nguyên vật liệu */}
      <Card>
        <Title level={5}>Danh sách nguyên vật liệu</Title>
        <Form.List
          name="bomDetails"
          rules={[
            {
              validator: async (_, bomDetails) => {
                if (!bomDetails || bomDetails.length < 1) {
                  return Promise.reject(new Error('Vui lòng thêm ít nhất một nguyên vật liệu!'));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} className="mb-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <Text strong>Nguyên vật liệu #{name + 1}</Text>
                    {fields.length > 1 && (
                      <Button
                        type="text"
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                        className="hover:bg-red-50"
                      >
                        Xóa
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Form.Item
                      {...restField}
                      name={[name, 'materialId']}
                      label="Nguyên vật liệu"
                      rules={[{ required: true, message: 'Vui lòng chọn nguyên vật liệu!' }]}
                    >
                      <Select
                        placeholder="Chọn nguyên vật liệu"
                        loading={isLoadingMaterials}
                        showSearch
                        filterOption={(input, option) =>
                          (option?.label as string).toLowerCase().includes(input.toLowerCase())
                        }
                      >
                        {availableMaterials.map((material) => (
                          <Option key={material.id} value={material.id}>
                            <p className="font-medium">
                              {material.name}{' '}
                              <span className="text-sm font-normal text-gray-500">
                                (Mã: {material.code} | Đơn vị: {material.unit})
                              </span>
                            </p>
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      label="Số lượng"
                      rules={[
                        { required: true, message: 'Vui lòng nhập số lượng!' },
                        { type: 'number', min: 0.01, message: 'Số lượng phải lớn hơn 0!' },
                      ]}
                    >
                      <InputNumber
                        placeholder="Nhập số lượng"
                        min={0.01}
                        step={0.01}
                        className="w-full"
                      />
                    </Form.Item>
                  </div>
                </Card>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  className="border-blue-300 text-blue-600 hover:border-blue-500 hover:text-blue-700"
                >
                  Thêm nguyên vật liệu
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Card>

      <Divider />

      {/* Buttons */}
      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button htmlType="button" onClick={() => form.resetFields()}>
            Làm mới
          </Button>
          <Button type="primary" htmlType="submit" className="bg-blue-600">
            Tạo định mức
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default CreateBom;
