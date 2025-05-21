import { Form, Input, Button, InputNumber, Select, Typography } from 'antd';
import { TProduct, TUpdateProduct } from '@/interface/TProduct';
import { useState, useEffect } from 'react';
import { ProductTypes, genProductTypes } from '@/Constant/ProductTypes';
import { MaterialSupplierApi } from '@/api/materialSupplierApi';
import { TMaterialSupplier } from '@/interface/TMaterialSupplier';
import { TCategory } from '@/interface/TCategory';

const { Text } = Typography;

interface EditProductProps {
  handleUpdateProduct: (id: string, data: TUpdateProduct) => void;
  product: TProduct;
  categories: TCategory[];
  isLoadingCategories: boolean;
}

const EditProduct: React.FC<EditProductProps> = ({
  handleUpdateProduct,
  product,
  categories,
  isLoadingCategories,
}) => {
  const [form] = Form.useForm();
  const [materialSuppliers, setMaterialSuppliers] = useState<TMaterialSupplier[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<ProductTypes>(product.productType);

  useEffect(() => {
    const fetchMaterialSuppliers = async () => {
      try {
        const response = await MaterialSupplierApi.getAllMaterialSupplier('page=1&pageSize=100');
        setMaterialSuppliers(response.data || []);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà cung cấp:', error);
      }
    };

    if (selectedProductType === ProductTypes.RAW_MATERIAL) {
      fetchMaterialSuppliers();
    }
  }, [selectedProductType]);

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        unit: product.unit,
        purchasePrice: product.purchasePrice,
        sellingPrice: product.sellingPrice,
        holdingCost: product.holdingCost,
        materialSupplierId: product.materialSupplierId,
        categoryId: product.categoryId,
        productType: product.productType,
      });
      setSelectedProductType(product.productType);
    }
  }, [product, form]);

  const onFinish = async (values: TUpdateProduct) => {
    handleUpdateProduct(product.id, values);
    form.resetFields();
  };

  const handleProductTypeChange = (value: ProductTypes) => {
    setSelectedProductType(value);
  };

  const productTypeOptions = Object.entries(genProductTypes).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="productType"
          label="Loại sản phẩm"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng chọn loại sản phẩm' }]}
        >
          <Select
            placeholder="Chọn loại sản phẩm"
            options={productTypeOptions}
            onChange={handleProductTypeChange}
          />
        </Form.Item>

        <Form.Item
          name="name"
          label="Tên sản phẩm"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
        >
          <Input placeholder="Nhập tên sản phẩm" className="w-full" />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Danh mục sản phẩm"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng chọn danh mục sản phẩm' }]}
        >
          <Select
            placeholder="Chọn danh mục sản phẩm"
            loading={isLoadingCategories}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label as string).toLowerCase().includes(input.toLowerCase())
            }
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả" rows={3} className="w-full" />
        </Form.Item>

        <Form.Item
          name="unit"
          label="Đơn vị tính"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính' }]}
        >
          <Input placeholder="Nhập đơn vị tính" className="w-full" />
        </Form.Item>

        <Form.Item
          name="purchasePrice"
          label="Giá mua"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập giá mua' }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Nhập giá mua"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="sellingPrice"
          label="Giá bán"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Nhập giá bán"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="holdingCost"
          label="Chi phí lưu kho"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập chi phí lưu kho' }]}
        >
          <InputNumber
            className="w-full"
            placeholder="Nhập chi phí lưu kho"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={0}
          />
        </Form.Item>

        {selectedProductType === ProductTypes.RAW_MATERIAL && (
          <Form.Item
            name="materialSupplierId"
            label="Nhà cung cấp nguyên vật liệu"
            className="font-medium"
            rules={[{ required: true, message: 'Vui lòng chọn nhà cung cấp' }]}
          >
            <Select
              placeholder="Chọn nhà cung cấp"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label as string).toLowerCase().includes(input.toLowerCase())
              }
              options={materialSuppliers.map((supplier) => ({
                value: supplier.id,
                label: supplier.name,
              }))}
            />
          </Form.Item>
        )}

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật sản phẩm
        </Button>
      </Form>
    </>
  );
};

export default EditProduct;
