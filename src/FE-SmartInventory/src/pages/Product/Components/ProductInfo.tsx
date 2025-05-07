import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Modal, Row, Space, Tag, Typography } from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryDetailProduct, useQueryProductMethods } from '../Hook/useQueryProduct';
import { TUpdateProduct } from '@/interface/TProduct';
import UpdateProduct from './UpdateProduct';

export default function ProductInfo({ productId }: { productId: string }) {
  const [form] = Form.useForm<TUpdateProduct>();
  const [action, setAction] = useState<'UPDATE' | 'TOGGLE_STATUS' | null>(null);
  const queryClient = useQueryClient();

  const { data: detail } = useQueryDetailProduct(productId);
  const { updateProduct, toggleProductStatus } = useQueryProductMethods();

  // Set form initial values when detail is fetched
  useEffect(() => {
    if (detail?.data) {
      form.setFieldsValue({
        id: detail.data.id,
        code: detail.data.code,
        name: detail.data.name,
        description: detail.data.description,
        unit: detail.data.unit,
        productType: detail.data.productType,
        purchasePrice: detail.data.purchasePrice,
        sellingPrice: detail.data.sellingPrice,
        holdingCost: detail.data.holdingCost,
        materialSupplierId: detail.data.materialSupplierId || '',
        warehouseId: detail.data.warehouseId,
        categoryId: detail.data.categoryId,
      });
    }
  }, [detail, form]);

  // Handlers
  const handleUpdate = (values: TUpdateProduct) => {
    updateProduct.mutate(
      { id: productId, data: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['PRODUCT_DETAIL', productId]);
          setAction(null);
        },
      }
    );
  };

  const handleToggle = () => {
    toggleProductStatus.mutate(
      { id: productId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['PRODUCT_DETAIL', productId]);
          setAction(null);
        },
      }
    );
  };

  // Status tag renderer
  const renderStatusTag = (active: boolean) => (
    <Tag icon={active ? <CheckCircleOutlined /> : <CloseCircleOutlined />} color={active ? 'green' : 'red'}>
      {active ? 'Active' : 'Inactive'}
    </Tag>
  );

  return (
    <div>
      {/* Product Detail Card */}
      {detail?.data && (
        <Card>
          <Space direction="vertical" className="w-full">
            <Typography.Title level={4}>{detail.data.name}</Typography.Title>
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>Code:</strong> {detail.data.code}</p>
                <p><strong>Description:</strong> {detail.data.description}</p>
                <p><strong>Unit:</strong> {detail.data.unit}</p>
                <p><strong>Type:</strong> {detail.data.productType}</p>
              </Col>
              <Col span={12}>
                <p><strong>Purchase Price:</strong> {detail.data.purchasePrice}</p>
                <p><strong>Selling Price:</strong> {detail.data.sellingPrice}</p>
                <p><strong>Holding Cost:</strong> {detail.data.holdingCost}</p>
                <p><strong>Status:</strong> {renderStatusTag(detail.data.isActive)}</p>
              </Col>
            </Row>
          </Space>
        </Card>
      )}

      {/* Action Buttons */}
      <Space className="mt-4">
        <Button icon={<EditOutlined />} onClick={() => setAction('UPDATE')}>
          Edit Product
        </Button>
        <Button
          icon={detail?.data?.isActive ? <LockOutlined /> : <UnlockOutlined />}
          onClick={() => setAction('TOGGLE_STATUS')}
        >
          {detail?.data?.isActive ? 'Deactivate' : 'Activate'}
        </Button>
      </Space>

      {/* Update Modal */}
      <Modal
        title="Update Product"
        visible={action === 'UPDATE'}
        onCancel={() => setAction(null)}
        footer={null}
        centered
      >
        {detail?.data && (
          <UpdateProduct
            initialValues={detail.data as TUpdateProduct}
            categories={detail.dataCategories}
            warehouses={detail.dataWarehouses}
            suppliers={detail.dataSuppliers}
            handleUpdateProduct={handleUpdate}
            handleCancel={() => setAction(null)}
          />
        )}
      </Modal>

      {/* Toggle Status Confirmation Modal */}
      <Modal
        title={detail?.data?.isActive ? 'Deactivate Product' : 'Activate Product'}
        visible={action === 'TOGGLE_STATUS'}
        onOk={handleToggle}
        onCancel={() => setAction(null)}
        centered
      >
        <Typography.Text>
          Are you sure you want to {detail?.data?.isActive ? 'deactivate' : 'activate'} this product?
        </Typography.Text>
      </Modal>
    </div>
  );
}
