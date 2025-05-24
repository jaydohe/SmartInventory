import { useState } from 'react';
import { Modal } from 'antd';
import CreateGoodsReceiptTabs from './CreateGoodsReceiptTabs';
import { useQueryGoodsReceipt } from '../Hook/useQueryGoodsReceipt';
import { useQueryProduct } from '@/pages/ProductPage/Hook/useQueryProduct';
import { useQueryOrder } from '@/pages/OrderPage/Hook/useQueryOrder';
import { useQueryProductionCommand } from '@/pages/ProductionCommandPage/Hook/useQueryProductionCommand';
import { useQueryMaterialSupplier } from '@/pages/MaterialSupplierPage/Hook/useQueryMaterialSupplier';
import {
  TGoodsReceiptCreateMaterial,
  TGoodsReceiptCreateOrder,
  TGoodsReceiptCreateProductionCommand,
} from '@/interface/TGoodsReceipt';
import { ProductTypes } from '@/Constant/ProductTypes';
import { TBuilderQuery } from '@/interface';
import { useBuilderQuery } from '@/hook/useBuilderQuery';

interface CreateGoodsReceiptContainerProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const CreateGoodsReceiptContainer = ({
  isModalOpen,
  handleCloseModal,
}: CreateGoodsReceiptContainerProps) => {
  const [filter] = useState<TBuilderQuery>({
    isAsc: false,
    appendQuery: [
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const [orderFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toJoin: ['orderDetails.*', 'orderDetails.product.*'],
    appendQuery: [
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const [productionCommandFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toJoin: ['processes.*', 'details.product.*', 'details.*'],
    appendQuery: [
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const [filterMaterialSupplier, setFilterMaterialSupplier] = useState<TBuilderQuery>({
    isAsc: false,
    appendQuery: [
      {
        name: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$or',
        },
      },
      {
        code: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$or',
        },
      },
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const supplierParams = useBuilderQuery(filterMaterialSupplier);
  const orderParams = useBuilderQuery(orderFilter);
  const productParams = useBuilderQuery(filter);
  const productionCommandParams = useBuilderQuery(productionCommandFilter);
  const goodsReceiptParams = '';

  // Lấy danh sách nhà cung cấp
  const { getAllMaterialSupplier } = useQueryMaterialSupplier(supplierParams);
  const materialSuppliers = getAllMaterialSupplier.data?.data || [];

  // Lấy danh sách sản phẩm
  const { getAllProduct } = useQueryProduct(productParams);
  const products = getAllProduct.data?.data || [];
  const materials = products.filter((p) => p.productType === ProductTypes.RAW_MATERIAL);

  // Lấy danh sách đơn hàng
  const { getAllOrder } = useQueryOrder(orderParams);
  const orders = getAllOrder.data?.data || [];

  // Lấy danh sách lệnh sản xuất
  const { getAllProductionCommand } = useQueryProductionCommand(productionCommandParams);
  const productionCommands = getAllProductionCommand.data?.data || [];

  // Query để thêm phiếu nhập hàng
  const {
    createGoodsReceiptByMaterial,
    createGoodsReceiptByOrder,
    createGoodsReceiptByProductionCommand,
  } = useQueryGoodsReceipt(goodsReceiptParams);

  // Xử lý thêm phiếu nhập hàng từ nhà cung cấp NVL
  const handleCreateGoodsReceiptByMaterial = (data: TGoodsReceiptCreateMaterial) => {
    createGoodsReceiptByMaterial.mutate(data, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  // Xử lý thêm phiếu nhập hàng từ đơn hàng
  const handleCreateGoodsReceiptByOrder = (data: TGoodsReceiptCreateOrder) => {
    createGoodsReceiptByOrder.mutate(data, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  // Xử lý thêm phiếu nhập hàng từ lệnh sản xuất
  const handleCreateGoodsReceiptByProductionCommand = (
    data: TGoodsReceiptCreateProductionCommand
  ) => {
    createGoodsReceiptByProductionCommand.mutate(data, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  return (
    <Modal
      title="Tạo phiếu nhập hàng"
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
      width={800}
    >
      <CreateGoodsReceiptTabs
        handleCreateGoodsReceiptByMaterial={handleCreateGoodsReceiptByMaterial}
        handleCreateGoodsReceiptByOrder={handleCreateGoodsReceiptByOrder}
        handleCreateGoodsReceiptByProductionCommand={handleCreateGoodsReceiptByProductionCommand}
        materialSuppliers={materialSuppliers}
        orders={orders}
        productionCommands={productionCommands}
        products={products}
        materials={materials}
        isLoadingMaterials={getAllProduct.isLoading}
        isLoadingProducts={getAllProduct.isLoading}
        isLoadingSuppliers={getAllMaterialSupplier.isLoading}
        isLoadingOrders={getAllOrder.isLoading}
        isLoadingProductionCommands={getAllProductionCommand.isLoading}
      />
    </Modal>
  );
};

export default CreateGoodsReceiptContainer;
