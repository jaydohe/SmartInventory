import React, { useState } from 'react';
import { Button, Table, Modal, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateProduct from './Components/CreateProduct';
import UpdateProduct from './Components/UpdateProduct';
import ProductDetails from './Components/ProductDetail';
import { useQueryProduct } from './Hook/useQueryProduct';
import { TProduct, TCreateProduct, TUpdateProduct } from '@/interface/TProduct';

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateProductData, setUpdateProductData] = useState<TUpdateProduct | null>(null);

  const { getAllProducts, createProduct, deleteProduct, updateProduct } = useQueryProduct('defaultParams');
  const productList = getAllProducts.data?.data || [];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenDrawer = (id: string) => {
    setSelectedProductId(id);
    setIsDrawerOpen(true);
  };
  const handleCloseDrawer = () => setIsDrawerOpen(false);

  const handleOpenUpdateModal = (product: TProduct) => {
    setUpdateProductData(product);
    setIsUpdateModalOpen(true);
  };
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  const handleDeleteProduct = (id: string) => {
    deleteProduct.mutate(id);
  };

  const handleCreateProduct = (data: TCreateProduct) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleUpdateProduct = (data: TUpdateProduct) => {
    updateProduct.mutate(data.id, data, {
      onSuccess: () => {
        setIsUpdateModalOpen(false);
      },
    });
  };

  const columns = [
    { title: 'STT', dataIndex: 'index', key: 'index', render: (_: any, __: any, index: number) => index + 1 },
    { title: 'Mã sản phẩm', dataIndex: 'code', key: 'code' },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: 'Mô tả', dataIndex: 'description', key: 'description' },
    { title: 'Đơn vị tính', dataIndex: 'unit', key: 'unit' },
    { title: 'Loại sản phẩm', dataIndex: 'productType', key: 'productType' },
    { title: 'Giá mua', dataIndex: 'purchasePrice', key: 'purchasePrice' },
    { title: 'Giá bán', dataIndex: 'sellingPrice', key: 'sellingPrice' },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: TProduct) => (
        <>
          <Button onClick={() => handleOpenDrawer(record.id)}>Chi tiết</Button>
          <Button onClick={() => handleOpenUpdateModal(record)}>Sửa</Button>
          <Button danger onClick={() => handleDeleteProduct(record.id)}>Xóa</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenModal}>
        Thêm sản phẩm
      </Button>
      <Table dataSource={productList} columns={columns} rowKey="id" />

      <Modal open={isModalOpen} onCancel={handleCloseModal} footer={null}>
        <CreateProduct handleCreateProduct={handleCreateProduct} />
      </Modal>

      <Modal open={isUpdateModalOpen} onCancel={handleCloseUpdateModal} footer={null}>
        {updateProductData && (
          <UpdateProduct
            initialValues={updateProductData}
            handleUpdateProduct={handleUpdateProduct}
            handleCancel={handleCloseUpdateModal}
          />
        )}
      </Modal>

      <Drawer open={isDrawerOpen} onClose={handleCloseDrawer}>
        {selectedProductId && <ProductDetails productId={selectedProductId} />}
      </Drawer>
    </div>
  );
}