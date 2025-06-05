import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { DatabaseOutlined, FilterOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps, Select, Badge } from 'antd';
import { useEffect, useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import { useQueryInventory } from './Hook/useQueryInventory';
import InventoryTable from './Components/InventoryTable';
<<<<<<< Updated upstream
import InventoryHistory from './Components/InventoryHistory';
import { TInventory } from '@/interface/TInventory';
import { ProductTypes } from '@/Constant/ProductTypes';

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<string>('all'); // Tab "Tất cả" là tab mặc định
  const [filterStatus, setFilterStatus] = useState<string>('all'); // Lọc theo trạng thái
  const [isOpenHistoryModal, setIsOpenHistoryModal] = useState<{
    isOpen: boolean;
    inventory?: TInventory;
    // histories?: TInventoryHistory[];
    isLoading: boolean;
  }>({
    isOpen: false,
    isLoading: false,
  });
=======
import InventoryDetail from './Components/InventoryDetail';
import UpdateInventoryModal from './Components/UpdateInventoryModal';
import { TInventory, TInventoryByProduct, TInventoryUpdate } from '@/interface/TInventory';
import { usePermissions } from '@/hook/usePermissions';

export default function InventoryPage() {
  const permissions = usePermissions('InventoryPage');
  const [activeTab, setActiveTab] = useState<string>('all');

  // State cho Modal chi tiết tồn kho theo sản phẩm
  const [isOpenDetailModalByProduct, setIsOpenDetailModalByProduct] = useState<{
    isOpen: boolean;
    inventory?: TInventory;
  }>({
    isOpen: false,
  });

>>>>>>> Stashed changes
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    inventory?: TInventory;
  }>({
    isOpen: false,
  });

<<<<<<< Updated upstream
=======
  // State cho Modal cập nhật tồn kho
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<{
    isOpen: boolean;
    inventory?: TInventory | null;
  }>({
    isOpen: false,
    inventory: null,
  });

>>>>>>> Stashed changes
  const [inventoryFilter, setInventoryFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    appendQuery: [
      {
        'product.name': {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$or',
        },
      },
      {
        'product.code': {
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

  // Thêm bộ lọc theo trạng thái sản phẩm
  useEffect(() => {
    if (activeTab !== 'all') {
      const productTypeValue = parseInt(activeTab);
      // Cập nhật bộ lọc để thêm điều kiện lọc theo loại sản phẩm
      setInventoryFilter((prev) => {
        // Tìm xem đã có query theo productType chưa
        const hasProductTypeQuery = prev.appendQuery?.some((q) => 'product.productType' in q);

        if (hasProductTypeQuery) {
          // Nếu đã có, cập nhật giá trị
          return {
            ...prev,
            appendQuery: prev.appendQuery?.map((q) => {
              if ('product.productType' in q) {
                return {
                  'product.productType': {
                    ...q['product.productType'],
                    value: productTypeValue.toString(),
                  },
                };
              }
              return q;
            }),
          };
        } else {
          // Nếu chưa có, thêm mới vào appendQuery
          return {
            ...prev,
            appendQuery: [
              ...(prev.appendQuery || []),
              {
                'product.productType': {
                  value: productTypeValue.toString(),
                  queryOperator: '$eq',
                  queryOperatorParent: '$and',
                },
              },
            ],
          };
        }
      });
    } else {
      // Nếu là tab "Tất cả", loại bỏ điều kiện lọc theo loại sản phẩm nếu có
      setInventoryFilter((prev) => {
        return {
          ...prev,
          appendQuery: prev.appendQuery?.filter((q) => !('product.productType' in q)),
        };
      });
    }
  }, [activeTab]);

  // Thêm bộ lọc theo trạng thái tồn kho
  useEffect(() => {
    // Xóa các bộ lọc cũ liên quan đến trạng thái tồn kho
    setInventoryFilter((prev) => {
      const filteredQuery = prev.appendQuery?.filter(
        (q) => !('currentQuantity' in q) && !('minQuantity' in q) && !('maxQuantity' in q)
      );

      // Nếu là lọc tất cả, không thêm điều kiện lọc mới
      if (filterStatus === 'all') {
        return {
          ...prev,
          appendQuery: filteredQuery,
        };
      }

      // Thêm điều kiện lọc mới tùy theo trạng thái
      let newConditions = [];
      if (filterStatus === 'low') {
        // Số lượng <= ngưỡng tối thiểu
        newConditions.push({
          lowStock: {
            value: 'true',
            queryOperator: '$eq',
            queryOperatorParent: '$and',
          },
        });
      } else if (filterStatus === 'high') {
        // Số lượng >= ngưỡng tối đa
        newConditions.push({
          highStock: {
            value: 'true',
            queryOperator: '$eq',
            queryOperatorParent: '$and',
          },
        });
      } else if (filterStatus === 'normal') {
        // Số lượng nằm giữa ngưỡng tối thiểu và tối đa
        newConditions.push({
          normalStock: {
            value: 'true',
            queryOperator: '$eq',
            queryOperatorParent: '$and',
          },
        });
      }

      return {
        ...prev,
        appendQuery: [...filteredQuery, ...newConditions],
      };
    });
  }, [filterStatus]);

  const inventoryParams = useBuilderQuery(inventoryFilter);
<<<<<<< Updated upstream
  const { getAllInventory, getInventoryHistory } = useQueryInventory(inventoryParams);
=======
  const { getAllInventory, updateInventory } = useQueryInventory(inventoryParams);
>>>>>>> Stashed changes

  const { data: listInventory, isLoading: isLoadingInventory } = getAllInventory;

  const handleInventoryPageChange = (page: number, pageSize: number) => {
    setInventoryFilter({
      ...inventoryFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleViewDetail = (inventory: TInventory) => {
    setIsOpenDetailModal({ isOpen: true, inventory });
  };

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
    setIsOpenDetailModalByProduct({ isOpen: false });
  };

<<<<<<< Updated upstream
  const handleViewHistory = (inventory: TInventory) => {
    setIsOpenHistoryModal({
=======
  const handleViewByProduct = (inventory: TInventory) => {
    setIsOpenDetailModalByProduct({ isOpen: true, inventory });
  };

  const handleUpdateInventory = (inventory: TInventory) => {
    setIsOpenUpdateModal({
>>>>>>> Stashed changes
      isOpen: true,
      inventory,
      isLoading: true,
    });

    // Lấy lịch sử tồn kho
    const { data: historyData, isLoading } = getInventoryHistory(inventory.productId);

    // Cập nhật state khi có dữ liệu
    if (historyData) {
      setIsOpenHistoryModal({
        isOpen: true,
        inventory,
        isLoading: isLoading,
      });
    }
  };

  const handleCloseHistoryModal = () => {
    setIsOpenHistoryModal({
      isOpen: false,
      isLoading: false,
    });
  };

  const handleInventorySearchValue = (valueSearch: string) => {
    setInventoryFilter((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('product.name' in item) {
          return {
            'product.name': {
              ...item['product.name'],
              value: valueSearch,
            },
          };
        }
        if ('product.code' in item) {
          return {
            'product.code': {
              ...item['product.code'],
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

  // Tính số lượng cảnh báo tồn kho
  const getLowStockCount = () => {
    if (!listInventory?.data) return 0;
    return listInventory.data.filter(
      (inventory) => inventory.currentQuantity <= inventory.minQuantity
    ).length;
  };

  const getHighStockCount = () => {
    if (!listInventory?.data) return 0;
    return listInventory.data.filter(
      (inventory) => inventory.currentQuantity >= inventory.maxQuantity
    ).length;
  };

  // Tạo các tab dựa trên ProductTypes
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: (
        <div className="flex items-center gap-1">
          <span>Tất cả</span>
        </div>
      ),
      children: (
        <InventoryTable
          data={listInventory?.data}
          loading={isLoadingInventory}
          totalRecords={listInventory?.totalRecords}
          currentPage={inventoryFilter.toPaging?.page}
          pageSize={inventoryFilter.toPaging?.pageSize}
          onPageChange={handleInventoryPageChange}
          onViewDetail={handleViewDetail}
          onViewHistory={handleViewHistory}
        />
      ),
    },
    {
      key: ProductTypes.GOODS.toString(),
      label: (
        <div className="flex items-center gap-1">
          <span>Thành phẩm</span>
        </div>
      ),
      children: (
        <InventoryTable
          data={listInventory?.data}
          loading={isLoadingInventory}
          totalRecords={listInventory?.totalRecords}
          currentPage={inventoryFilter.toPaging?.page}
          pageSize={inventoryFilter.toPaging?.pageSize}
          onPageChange={handleInventoryPageChange}
          onViewDetail={handleViewDetail}
          onViewHistory={handleViewHistory}
        />
      ),
    },
    {
      key: ProductTypes.RAW_MATERIAL.toString(),
      label: (
        <div className="flex items-center gap-1">
          <span>Nguyên vật liệu</span>
        </div>
      ),
      children: (
        <InventoryTable
          data={listInventory?.data}
          loading={isLoadingInventory}
          totalRecords={listInventory?.totalRecords}
          currentPage={inventoryFilter.toPaging?.page}
          pageSize={inventoryFilter.toPaging?.pageSize}
          onPageChange={handleInventoryPageChange}
          onViewDetail={handleViewDetail}
          onViewHistory={handleViewHistory}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
          <DatabaseOutlined className="text-xl font-medium" />
          Quản lý tồn kho
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Tổng sản phẩm</p>
              <p className="text-2xl font-semibold">{listInventory?.totalRecords || 0}</p>
            </div>
            <div className="text-blue-500 text-2xl">
              <DatabaseOutlined />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Tồn kho bình thường</p>
              <p className="text-2xl font-semibold">
                {(listInventory?.totalRecords || 0) - getLowStockCount() - getHighStockCount()}
              </p>
            </div>
            <div className="text-green-500 text-2xl">
              <DatabaseOutlined />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Tồn kho dưới mức</p>
              <p className="text-2xl font-semibold">{getLowStockCount()}</p>
            </div>
            <div className="text-red-500 text-2xl">
              <Badge count={getLowStockCount()} overflowCount={999}>
                <ExclamationCircleFilled style={{ fontSize: '24px' }} />
              </Badge>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Tồn kho vượt mức</p>
              <p className="text-2xl font-semibold">{getHighStockCount()}</p>
            </div>
            <div className="text-orange-500 text-2xl">
              <Badge count={getHighStockCount()} overflowCount={999}>
                <ExclamationCircleFilled style={{ fontSize: '24px' }} />
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <div className="flex items-center">
            <span className="mr-2 font-medium">Lọc theo:</span>
            <Select
              style={{ width: 150 }}
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)}
              options={[
                { value: 'all', label: 'Tất cả' },
                { value: 'low', label: 'Tồn kho thấp' },
                { value: 'normal', label: 'Tồn kho bình thường' },
                { value: 'high', label: 'Tồn kho cao' },
              ]}
            />
          </div>
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập tên hoặc mã sản phẩm"
            handleSearchValue={handleInventorySearchValue}
          />
        </div>
      </div>

<<<<<<< Updated upstream
      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />

      <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT TỒN KHO</h4>}
=======
      <InventoryTable
        data={listInventory?.data}
        loading={isLoadingInventory}
        totalRecords={listInventory?.totalRecords}
        currentPage={inventoryFilter.toPaging?.page}
        pageSize={inventoryFilter.toPaging?.pageSize}
        onPageChange={handleInventoryPageChange}
        onViewDetail={handleViewDetail}
        onViewByProduct={handleViewByProduct}
        onUpdateInventory={handleUpdateInventory}
        permissions={permissions}
      />

      <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT TỒN KHO THEO SẢN PHẨM</h4>}
>>>>>>> Stashed changes
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenDetailModalByProduct.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="back" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
        ]}
      >
<<<<<<< Updated upstream
        {isOpenDetailModal.inventory && (
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Mã sản phẩm:</strong> {isOpenDetailModal.inventory.product.code}
                </p>
                <p>
                  <strong>Tên sản phẩm:</strong> {isOpenDetailModal.inventory.product.name}
                </p>
                <p>
                  <strong>Loại sản phẩm:</strong>{' '}
                  {isOpenDetailModal.inventory.product.productType === ProductTypes.GOODS
                    ? 'Thành phẩm'
                    : 'Nguyên vật liệu'}
                </p>
                <p>
                  <strong>Đơn vị:</strong> {isOpenDetailModal.inventory.product.unit || 'Không có'}
                </p>
              </div>
              <div>
                <p>
                  <strong>Số lượng hiện tại:</strong>{' '}
                  {isOpenDetailModal.inventory.currentQuantity.toLocaleString('vi-VN')}
                </p>
                <p>
                  <strong>Số lượng tối thiểu:</strong>{' '}
                  {isOpenDetailModal.inventory.minQuantity.toLocaleString('vi-VN')}
                </p>
                <p>
                  <strong>Số lượng tối đa:</strong>{' '}
                  {isOpenDetailModal.inventory.maxQuantity.toLocaleString('vi-VN')}
                </p>
                <p>
                  <strong>Vị trí lưu trữ:</strong>{' '}
                  {isOpenDetailModal.inventory.storageLocation || 'Chưa xác định'}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p>
                <strong>Mô tả:</strong>{' '}
                {isOpenDetailModal.inventory.product.description || 'Không có'}
              </p>
            </div>
            <div className="mt-4">
              <Button
                type="primary"
                onClick={() => {
                  handleCloseDetailModal();
                  handleViewHistory(isOpenDetailModal.inventory!);
                }}
              >
                Xem lịch sử tồn kho
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* <Modal
        title={<h4 className="font-bold text-2xl text-center">LỊCH SỬ TỒN KHO</h4>}
        className="w-11/12 md:w-4/5 xl:w-3/4"
        open={isOpenHistoryModal.isOpen}
        onCancel={handleCloseHistoryModal}
        footer={[
          <Button key="back" onClick={handleCloseHistoryModal}>
            Đóng
          </Button>,
        ]}
      >
        <InventoryHistory
          data={isOpenHistoryModal.histories}
          loading={isOpenHistoryModal.isLoading}
          productName={isOpenHistoryModal.inventory?.product.name}
          productCode={isOpenHistoryModal.inventory?.product.code}
        />
      </Modal> */}
=======
        <InventoryDetail
          productId={isOpenDetailModalByProduct.inventory?.productId}
          productName={isOpenDetailModalByProduct.inventory?.product?.name}
        />
      </Modal>

      <UpdateInventoryModal
        visible={isOpenUpdateModal.isOpen}
        inventory={isOpenUpdateModal.inventory || null}
        loading={updateInventory.isPending}
        onCancel={handleCloseUpdateModal}
        onUpdate={handleSubmitUpdate}
      />
>>>>>>> Stashed changes
    </div>
  );
}
