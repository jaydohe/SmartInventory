import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Space, InputNumber, Typography, Card, Divider } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { TBom, TBomUpdate } from '@/interface/TBom';
import { TProduct } from '@/interface/TProduct';
import { ProductTypes } from '@/Constant/ProductTypes';

const { Title, Text } = Typography;
const { Option } = Select;

interface EditBomProps {
  handleUpdateBom: (id: string, data: TBomUpdate) => void;
  bom: TBom;
  materials: TProduct[];
  isLoadingMaterials: boolean;
}

const EditBom: React.FC<EditBomProps> = ({
  handleUpdateBom,
  bom,
  materials,
  isLoadingMaterials,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (bom) {
      // Set initial values for the form
      const initialValues = {
        bomDetails: bom.billOfMaterialDetails.map((detail) => ({
          materialId: detail.materialId,
          quantity: detail.quantity,
        })),
      };
      form.setFieldsValue(initialValues);
    }
  }, [bom, form]);

  const onFinish = (values: any) => {
    const bomData: TBomUpdate = {
      bomDetails: values.bomDetails.map((detail: any) => ({
        materialId: detail.materialId,
        quantity: detail.quantity,
      })),
    };
    handleUpdateBom(bom.id, bomData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  // Lọc chỉ lấy nguyên vật liệu (RAW_MATERIAL)
  const availableMaterials = materials.filter(
    (material) => material.productType === ProductTypes.RAW_MATERIAL
  );

  return (
    <div className="">
      <Title level={4} className="text-center mb-6">
        Chỉnh sửa định mức nguyên vật liệu
      </Title>

      {/* Thông tin sản phẩm (read-only) */}
      <Card className="mb-4 bg-gray-50">
        <Title level={5}>Thông tin sản phẩm</Title>
        <div className="bg-blue-50 p-3 rounded-lg">
          <Text strong>Sản phẩm: </Text>
          <Text>{bom.product.name}</Text>
          <br />
          <Text strong>Mã định mức: </Text>
          <Text>{bom.code}</Text>
          <br />
          <Text type="secondary">Đơn vị: {bom.product.unit}</Text>
        </div>
      </Card>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
                {fields.map(({ key, name, ...restField }) => {
                  // Get current material info for display
                  const currentMaterialId = form.getFieldValue(['bomDetails', name, 'materialId']);
                  const currentMaterial = availableMaterials.find(
                    (m) => m.id === currentMaterialId
                  );

                  return (
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
                                <div>
                                  <span className="font-medium">{material.name}</span>
                                  Mã: {material.code} | Đơn vị: {material.unit}
                                </div>
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

                      {currentMaterial && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                          <Text type="secondary">
                            Đơn vị: {currentMaterial.unit} | Giá mua:{' '}
                            {currentMaterial.purchasePrice.toLocaleString('vi-VN')} VNĐ
                          </Text>
                        </div>
                      )}
                    </Card>
                  );
                })}

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
            <Button type="primary" htmlType="submit" className="bg-blue-600">
              Cập nhật định mức
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditBom;
