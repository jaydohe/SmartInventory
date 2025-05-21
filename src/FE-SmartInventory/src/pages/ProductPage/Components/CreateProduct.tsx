import { Form, Input, Button, InputNumber, Select } from 'antd';
import { TCreateProduct } from '@/interface/TProduct';
import { useState, useEffect } from 'react';
import { ProductTypes, genProductTypes } from '@/Constant/ProductTypes';
import { MaterialSupplierApi } from '@/api/materialSupplierApi';
import { TMaterialSupplier } from '@/interface/TMaterialSupplier';
import { TCategory } from '@/interface/TCategory';

interface CreateProductProps {
  handleCreateProduct: (data: TCreateProduct) => void;
  warehouseId: string;
  defaultProductType: ProductTypes;
  categories: TCategory[];
  isLoadingCategories: boolean;
}

const CreateProduct: React.FC<CreateProductProps> = ({
  handleCreateProduct,
  warehouseId,
  defaultProductType,
  categories,
  isLoadingCategories,
}) => {
  const [form] = Form.useForm();
  const [materialSuppliers, setMaterialSuppliers] = useState<TMaterialSupplier[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<ProductTypes>(defaultProductType);

  useEffect(() => {
    // Đặt giá trị mặc định cho productType trong form
    form.setFieldsValue({
      productType: defaultProductType,
    });
  }, [defaultProductType, form]);

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

  const onFinish = async (values: any) => {
    // Thêm warehouseId vào values
    const data: TCreateProduct = {
      ...values,
      warehouseId,
    };

    handleCreateProduct(data);
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
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="productType"
        label="Loại sản phẩm"
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
        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
      >
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Danh mục sản phẩm"
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
        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
      >
        <Input.TextArea placeholder="Nhập mô tả" rows={3} />
      </Form.Item>

      <Form.Item
        name="unit"
        label="Đơn vị tính"
        rules={[{ required: true, message: 'Vui lòng nhập đơn vị tính' }]}
      >
        <Input placeholder="Nhập đơn vị tính" />
      </Form.Item>

      <Form.Item
        name="purchasePrice"
        label="Giá mua"
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
        Tạo
      </Button>
    </Form>
  );
};

export default CreateProduct;
