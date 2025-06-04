import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { DatabaseOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps, Select } from 'antd';
import { useEffect, useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import { useQueryInventory } from './Hook/useQueryInventory';
import InventoryTable from './Components/InventoryTable';
import InventoryDetail from './Components/InventoryDetail';
import UpdateInventoryModal from './Components/UpdateInventoryModal';
import { TInventoryByProduct, TInventoryUpdate } from '@/interface/TInventory';
import { usePermissions } from '@/hooks/usePermissions';

export default function InventoryPage() {
  const permissions = usePermissions('InventoryPage');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // State cho Modal chi tiết tồn kho theo sản phẩm
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    inventory?: TInventoryByProduct;
  }>({
    isOpen: false,
  });

  // State cho Modal cập nhật tồn kho
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<{
    isOpen: boolean;
    inventory?: TInventoryByProduct | null;
  }>({
    isOpen: false,
    inventory: null,
  });

  const [inventoryFilter, setInventoryFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['product.*', 'warehouse.*'],
    appendQuery: [
      {
        productName: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$or',
        },
      },
      {
        productId: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$or',
        },
      },
    ],
  });

  const inventoryParams = useBuilderQuery(inventoryFilter);
  const { getAllInventory, getInventoryByProduct, updateInventory } =
    useQueryInventory(inventoryParams);

  const { data: listInventory, isLoading: isLoadingInventory } = getAllInventory;

  // Query để lấy chi tiết tồn kho theo sản phẩm
  const { data: inventoryByProduct, isLoading: isLoadingInventoryByProduct } = useQueryInventory(
    ''
  ).getInventoryByProduct(selectedProductId || '');

  const handleInventoryPageChange = (page: number, pageSize: number) => {
    setInventoryFilter({
      ...inventoryFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleViewDetail = (inventory: TInventoryByProduct) => {
    setIsOpenDetailModal({ isOpen: true, inventory });
  };

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
  };

  const handleViewByProduct = (inventory: TInventoryByProduct) => {
    setSelectedProductId(inventory.productId);
    setIsOpenDetailModal({ isOpen: true, inventory });
  };

  const handleUpdateInventory = (inventory: TInventoryByProduct) => {
    setIsOpenUpdateModal({
      isOpen: true,
      inventory,
    });
  };

  const handleCloseUpdateModal = () => {
    setIsOpenUpdateModal({
      isOpen: false,
      inventory: null,
    });
  };

  const handleSubmitUpdate = (id: string, data: TInventoryUpdate) => {
    updateInventory.mutate(
      { id, data },
      {
        onSuccess: () => {
          handleCloseUpdateModal();
        },
      }
    );
  };

  const handleInventorySearchValue = (valueSearch: string) => {
    setInventoryFilter((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('productName' in item) {
          return {
            productName: {
              ...item['productName'],
              value: valueSearch,
            },
          };
        }
        if ('productId' in item) {
          return {
            productId: {
              ...item['productId'],
              value: valueSearch,
            },
          };
        }
        return item;
      });

      return {
        ...pre,
        toPaging: {
          ...pre.toPaging,
          page: 1,
          pageSize: pre.toPaging?.pageSize || 10,
        },
        appendQuery: newAppendQuery,
      };
    });
  };

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
          <DatabaseOutlined className="text-xl font-medium" />
          Quản lý tồn kho
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-primary/10 p-4 rounded-lg  border-l-4 border-primary">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-primary text-base">Tổng sản phẩm</p>
              <p className="text-2xl font-semibold text-primary">
                {listInventory?.totalRecords || 0}
              </p>
            </div>
            <div className="text-primary text-2xl">
              <DatabaseOutlined />
            </div>
          </div>
        </div>
        <div className="bg-successColor1/10 p-4 rounded-lg  border-l-4 border-successColor1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-successColor1 text-base">Tổng kho</p>
              <p className="text-2xl font-semibold text-successColor1">
                {listInventory?.data?.reduce((sum, item) => sum + item.quantity, 0) || 0}
              </p>
            </div>
            <div className="text-successColor1 text-2xl">
              <DatabaseOutlined />
            </div>
          </div>
        </div>
        <div className="bg-warningColor/10 p-4 rounded-lg  border-l-4 border-warningColor">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-warningColor text-sm">Số lượng kho</p>
              <p className="text-2xl font-semibold text-warningColor">
                {new Set(listInventory?.data?.map((item) => item.warehouseId)).size || 0}
              </p>
            </div>
            <div className="text-warningColor text-2xl">
              <DatabaseOutlined />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập tên hoặc mã sản phẩm"
            handleSearchValue={handleInventorySearchValue}
          />
        </div>
      </div>

      <InventoryTable
        data={listInventory?.data}
        loading={isLoadingInventory}
        totalRecords={listInventory?.totalRecords}
        currentPage={inventoryFilter.toPaging?.page}
        pageSize={inventoryFilter.toPaging?.pageSize}
        onPageChange={handleInventoryPageChange}
        // onViewDetail={handleViewDetail}
        // onViewHistory={handleViewByProduct}
        // onUpdateInventory={handleUpdateInventory}
        permissions={permissions}
      />

      {/* <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT TỒN KHO THEO SẢN PHẨM</h4>}
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenDetailModal.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="back" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
        ]}
      >
        <InventoryDetail
          data={inventoryByProduct}
          loading={isLoadingInventoryByProduct}
          productId={isOpenDetailModal.inventory?.productId}
          productName={isOpenDetailModal.inventory?.productName}
        />
      </Modal> */}

      <UpdateInventoryModal
        visible={isOpenUpdateModal.isOpen}
        inventory={isOpenUpdateModal.inventory || null}
        loading={updateInventory.isPending}
        onCancel={handleCloseUpdateModal}
        onUpdate={handleSubmitUpdate}
      />
    </div>
  );
}
