import { useState } from 'react';
import { Modal, Form, InputNumber, Button, Typography } from 'antd';
import { TInventoryByProduct, TInventoryUpdate } from '@/interface/TInventory';

const { Title, Text } = Typography;

interface UpdateInventoryModalProps {
  visible: boolean;
  inventory: TInventoryByProduct | null;
  loading: boolean;
  onCancel: () => void;
  onUpdate: (id: string, data: TInventoryUpdate) => void;
}

const UpdateInventoryModal = ({
  visible,
  inventory,
  loading,
  onCancel,
  onUpdate,
}: UpdateInventoryModalProps) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSubmitting(true);

      if (inventory) {
        onUpdate(inventory.id, {
          quantity: values.quantity,
        });
      }
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form khi mở modal
  const resetForm = () => {
    if (inventory) {
      form.setFieldsValue({
        quantity: inventory.quantity,
      });
    }
  };

  return (
    <Modal
      title={
        <Title level={4} className="text-center">
          CẬP NHẬT TỒN KHO
        </Title>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      afterOpenChange={(open) => {
        if (open) resetForm();
      }}
    >
      {inventory && (
        <div className="mb-4">
          <div className="grid grid-cols-1 gap-2 mb-4">
            <Text strong>Mã sản phẩm: {inventory.productId}</Text>
            <Text strong>Tên sản phẩm: {inventory.productName}</Text>
            <Text strong>Kho: {inventory.warehouseName}</Text>
            <Text strong>Đơn vị: {inventory.productUnit}</Text>
            <Text strong>Số lượng hiện tại: {inventory.quantity.toLocaleString('vi-VN')}</Text>
          </div>

          <Form form={form} layout="vertical" initialValues={{ quantity: inventory.quantity }}>
            <Form.Item
              name="quantity"
              label="Số lượng mới"
              rules={[
                { required: true, message: 'Vui lòng nhập số lượng' },
                { type: 'number', min: 0, message: 'Số lượng không được âm' },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập số lượng tồn kho mới"
                min={0}
                addonAfter={inventory.productUnit || 'Đơn vị'}
              />
            </Form.Item>

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={onCancel}>Hủy</Button>
              <Button type="primary" onClick={handleSubmit} loading={submitting || loading}>
                Cập nhật
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default UpdateInventoryModal;
