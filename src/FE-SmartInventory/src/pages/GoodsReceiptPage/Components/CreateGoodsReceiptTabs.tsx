import { Tabs, TabsProps } from 'antd';
import CreateGoodsReceiptMaterial from './CreateGoodsReceiptMaterial';
import CreateGoodsReceiptOrder from './CreateGoodsReceiptOrder';
import CreateGoodsReceiptProductionCommand from './CreateGoodsReceiptProductionCommand';
import {
  TGoodsReceiptCreateMaterial,
  TGoodsReceiptCreateOrder,
  TGoodsReceiptCreateProductionCommand,
} from '@/interface/TGoodsReceipt';
import { TProduct } from '@/interface/TProduct';
import { TProductionCommand } from '@/interface/TProductionCommand';
import { TOrder } from '@/interface/TOder';
import { TMaterialSupplier } from '@/interface/TMaterialSupplier';

interface CreateGoodsReceiptTabsProps {
  handleCreateGoodsReceiptByMaterial: (data: TGoodsReceiptCreateMaterial) => void;
  handleCreateGoodsReceiptByOrder: (data: TGoodsReceiptCreateOrder) => void;
  handleCreateGoodsReceiptByProductionCommand: (data: TGoodsReceiptCreateProductionCommand) => void;
  materialSuppliers: TMaterialSupplier[];
  orders: TOrder[];
  productionCommands: TProductionCommand[];
  products: TProduct[];
  materials: TProduct[];
  isLoadingMaterials: boolean;
  isLoadingProducts: boolean;
  isLoadingSuppliers: boolean;
  isLoadingOrders: boolean;
  isLoadingProductionCommands: boolean;
}

const CreateGoodsReceiptTabs = ({
  handleCreateGoodsReceiptByMaterial,
  handleCreateGoodsReceiptByOrder,
  handleCreateGoodsReceiptByProductionCommand,
  materialSuppliers,
  orders,
  productionCommands,
  products,
  materials,
  isLoadingMaterials,
  isLoadingProducts,
  isLoadingSuppliers,
  isLoadingOrders,
  isLoadingProductionCommands,
}: CreateGoodsReceiptTabsProps) => {
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Từ nhà cung cấp NVL',
      children: (
        <CreateGoodsReceiptMaterial
          handleCreateGoodsReceipt={handleCreateGoodsReceiptByMaterial}
          materialSuppliers={materialSuppliers}
          materials={materials}
          isLoadingMaterials={isLoadingMaterials}
          isLoadingSuppliers={isLoadingSuppliers}
        />
      ),
    },
    {
      key: '2',
      label: 'Từ đơn hàng',
      children: (
        <CreateGoodsReceiptOrder
          handleCreateGoodsReceipt={handleCreateGoodsReceiptByOrder}
          orders={orders}
          products={products}
          isLoadingOrders={isLoadingOrders}
          isLoadingProducts={isLoadingProducts}
        />
      ),
    },
    {
      key: '3',
      label: 'Từ lệnh sản xuất',
      children: (
        <CreateGoodsReceiptProductionCommand
          handleCreateGoodsReceipt={handleCreateGoodsReceiptByProductionCommand}
          productionCommands={productionCommands}
          products={products}
          isLoadingProductionCommands={isLoadingProductionCommands}
          isLoadingProducts={isLoadingProducts}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems} />;
};

export default CreateGoodsReceiptTabs;
