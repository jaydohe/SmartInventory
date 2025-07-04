import SearchInput from '@/Components/SearchInput';
import { genOrderStatus, OrderStatus } from '@/Constant/OderStatus';
import { genProductTypes } from '@/Constant/ProductTypes';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { TCreateOrder, TOrder, TUpdateOrderStatus } from '@/interface/TOder';
import { TProductionCommandRequest } from '@/interface/TProductionCommand';
import { ExclamationCircleFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Modal, Select, Tabs, TabsProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { useQueryAgency } from '../AgencyPage/Hook/useQueryAgency';
import { useQueryProduct } from '../ProductPage/Hook/useQueryProduct';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import CreateOrder from './Components/CreateOrder';
import OrderTable from './Components/OrderTable';
import { useQueryOrder } from './Hook/useQueryOrder';
import { useQueryProductionCommand } from '../ProductionCommandPage/Hook/useQueryProductionCommand';

import { usePermissions } from '@/hook/usePermissions';

export default function OrderPage() {
  const permissions = usePermissions('OrderPage');
  const [activeTab, setActiveTab] = useState<string>('all'); // Tab "Tất cả" là tab mặc định
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    order?: TOrder;
  }>({
    isOpen: false,
  });
  // Bộ lọc cho agencies, products và warehouses
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
  const [filterProduct] = useState<TBuilderQuery>({
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

  // Lấy dữ liệu đại lý, sản phẩm và kho từ API
  const agencyParams = useBuilderQuery(filter);
  const productParams = useBuilderQuery(filterProduct);
  const warehouseParams = useBuilderQuery(filter);

  const { getAllAgency } = useQueryAgency(agencyParams);
  const { getAllProduct } = useQueryProduct(productParams);
  const { getAllWarehouse } = useQueryWarehouse(warehouseParams);

  const { data: agenciesData, isLoading: isLoadingAgencies } = getAllAgency;
  const { data: productsData, isLoading: isLoadingProducts } = getAllProduct;
  const { data: warehousesData, isLoading: isLoadingWarehouses } = getAllWarehouse;

  // Lọc sản phẩm chỉ lấy những sản phẩm có productType = GOODS (không phải nguyên vật liệu)
  const products = productsData?.data || [];
  const agencies = agenciesData?.data || [];
  const warehouses = warehousesData?.data || [];

  // Tìm tên kho dựa vào warehouseId
  const getWarehouseName = (warehouseId: string) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    return warehouse ? warehouse.name : warehouseId;
  };

  // Thêm bộ lọc theo trạng thái đơn hàng
  useEffect(() => {
    if (activeTab !== 'all') {
      const statusValue = parseInt(activeTab);
      // Cập nhật bộ lọc để thêm điều kiện lọc theo trạng thái
      setOrderFilter((prev) => {
        // Tìm xem đã có query theo orderStatus chưa
        const hasStatusQuery = prev.appendQuery?.some((q) => 'orderStatus' in q);

        if (hasStatusQuery) {
          // Nếu đã có, cập nhật giá trị
          return {
            ...prev,
            appendQuery: prev.appendQuery?.map((q) => {
              if ('orderStatus' in q) {
                return {
                  orderStatus: {
                    ...q.orderStatus,
                    value: statusValue.toString(),
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
                orderStatus: {
                  value: statusValue.toString(),
                  queryOperator: '$eq',
                  queryOperatorParent: '$and',
                },
              },
            ],
          };
        }
      });
    } else {
      // Nếu là tab "Tất cả", loại bỏ điều kiện lọc theo trạng thái nếu có
      setOrderFilter((prev) => {
        return {
          ...prev,
          appendQuery: prev.appendQuery?.filter((q) => !('orderStatus' in q)),
        };
      });
    }
  }, [activeTab]);
  const [orderFilter, setOrderFilter] = useState<TBuilderQuery>({
    isAsc: false,
    orderBy: 'createdAt',
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['orderDetails.*', 'orderDetails.product.*'],
    appendQuery: [
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

  const orderParams = useBuilderQuery(orderFilter);
  const { getAllOrder, createOrder, deleteOrder, updateOrderStatus } = useQueryOrder(orderParams);

  // Hook cho production command
  const { createProductionCommandRequest } = useQueryProductionCommand('', {
    enabled: false,
  });

  const { data: listOrder, isLoading: isLoadingOrder } = getAllOrder;

  const handleCreateOrder = (data: TCreateOrder) => {
    createOrder.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const handleOpenDetailModal = (order: TOrder) => {
    setIsOpenDetailModal({ isOpen: true, order });
  };

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
  };

  const handleOrderPageChange = (page: number, pageSize: number) => {
    setOrderFilter({
      ...orderFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };
  const handleEditOrder = (order: TOrder) => {
    // Hiển thị modal để cập nhật trạng thái đơn hàng
    let selectedStatus = order.orderStatus;

    Modal.confirm({
      title: 'Cập nhật trạng thái đơn hàng',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'blue' }} />,
      content: (
        <div>
          <p>Chọn trạng thái mới cho đơn hàng:</p>
          <Select
            id="orderStatus"
            className="w-full mt-2"
            defaultValue={order.orderStatus}
            onChange={(value) => {
              selectedStatus = value;
            }}
          >
            <Select.Option value={OrderStatus.NEW}>
              <Tag color={genOrderStatus[OrderStatus.NEW].color}>
                {genOrderStatus[OrderStatus.NEW].label}
              </Tag>
            </Select.Option>
            <Select.Option value={OrderStatus.INPROCESS}>
              <Tag color={genOrderStatus[OrderStatus.INPROCESS].color}>
                {genOrderStatus[OrderStatus.INPROCESS].label}
              </Tag>
            </Select.Option>
            <Select.Option value={OrderStatus.DELIVERED}>
              <Tag color={genOrderStatus[OrderStatus.DELIVERED].color}>
                {genOrderStatus[OrderStatus.DELIVERED].label}
              </Tag>
            </Select.Option>
            <Select.Option value={OrderStatus.REFUNDED}>
              <Tag color={genOrderStatus[OrderStatus.REFUNDED].color}>
                {genOrderStatus[OrderStatus.REFUNDED].label}
              </Tag>
            </Select.Option>
            <Select.Option value={OrderStatus.CANCELED}>
              <Tag color={genOrderStatus[OrderStatus.CANCELED].color}>
                {genOrderStatus[OrderStatus.CANCELED].label}
              </Tag>
            </Select.Option>
          </Select>
        </div>
      ),
      okText: 'Cập nhật',
      cancelText: 'Huỷ',
      onOk: async () => {
        const updateData: TUpdateOrderStatus = {
          orderStatus: selectedStatus,
        };

        updateOrderStatus.mutate({
          id: order.id,
          data: updateData,
        });
      },
    });
  };

  const handleRequestProductionCommand = (order: TOrder) => {
    Modal.confirm({
      title: 'Yêu cầu lệnh sản xuất',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'blue' }} />,
      content: 'Bạn có muốn tạo yêu cầu lệnh sản xuất cho đơn hàng này?',
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk: async () => {
        createProductionCommandRequest.mutate({
          orderId: order.id,
          wareHouseId: order.warehouseId,
        });
      },
    });
  };

  const showConfirmDelete = (order: TOrder) => {
    Modal.confirm({
      title: 'Xóa đơn hàng',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'red' }} />,
      content: 'Bạn có muốn xóa đơn hàng này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'default' },
      autoFocusButton: 'cancel',
      onOk: async () => {
        deleteOrder.mutate(order.id);
      },
    });
  };

  const handleOrderSearchValue = (valueSearch: string) => {
    setOrderFilter((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('code' in item) {
          return {
            code: {
              ...item.code,
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

  // Tạo các tab dựa trên OrderStatus
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: (
        <OrderTable
          data={listOrder?.data}
          loading={isLoadingOrder}
          totalRecords={listOrder?.totalRecords}
          currentPage={orderFilter.toPaging?.page}
          pageSize={orderFilter.toPaging?.pageSize}
          warehouses={warehouses}
          onPageChange={handleOrderPageChange}
          onEditOrder={handleEditOrder}
          onDeleteOrder={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
          permissions={permissions}
        />
      ),
    },
    {
      key: OrderStatus.NEW.toString(),
      label: genOrderStatus[OrderStatus.NEW].label,
      children: (
        <OrderTable
          data={listOrder?.data}
          loading={isLoadingOrder}
          totalRecords={listOrder?.totalRecords}
          currentPage={orderFilter.toPaging?.page}
          pageSize={orderFilter.toPaging?.pageSize}
          warehouses={warehouses}
          onPageChange={handleOrderPageChange}
          onEditOrder={handleEditOrder}
          onDeleteOrder={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
          permissions={permissions}
        />
      ),
    },
    {
      key: OrderStatus.INPROCESS.toString(),
      label: genOrderStatus[OrderStatus.INPROCESS].label,
      children: (
        <OrderTable
          data={listOrder?.data}
          loading={isLoadingOrder}
          totalRecords={listOrder?.totalRecords}
          currentPage={orderFilter.toPaging?.page}
          pageSize={orderFilter.toPaging?.pageSize}
          warehouses={warehouses}
          onPageChange={handleOrderPageChange}
          onEditOrder={handleEditOrder}
          onDeleteOrder={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
          permissions={permissions}
        />
      ),
    },
    {
      key: OrderStatus.DELIVERED.toString(),
      label: genOrderStatus[OrderStatus.DELIVERED].label,
      children: (
        <OrderTable
          data={listOrder?.data}
          loading={isLoadingOrder}
          totalRecords={listOrder?.totalRecords}
          currentPage={orderFilter.toPaging?.page}
          pageSize={orderFilter.toPaging?.pageSize}
          warehouses={warehouses}
          onPageChange={handleOrderPageChange}
          onEditOrder={handleEditOrder}
          onDeleteOrder={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
          permissions={permissions}
        />
      ),
    },
    {
      key: OrderStatus.REFUNDED.toString(),
      label: genOrderStatus[OrderStatus.REFUNDED].label,
      children: (
        <OrderTable
          data={listOrder?.data}
          loading={isLoadingOrder}
          totalRecords={listOrder?.totalRecords}
          currentPage={orderFilter.toPaging?.page}
          pageSize={orderFilter.toPaging?.pageSize}
          warehouses={warehouses}
          onPageChange={handleOrderPageChange}
          onEditOrder={handleEditOrder}
          onDeleteOrder={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
          permissions={permissions}
        />
      ),
    },
    {
      key: OrderStatus.CANCELED.toString(),
      label: genOrderStatus[OrderStatus.CANCELED].label,
      children: (
        <OrderTable
          data={listOrder?.data}
          loading={isLoadingOrder}
          totalRecords={listOrder?.totalRecords}
          currentPage={orderFilter.toPaging?.page}
          pageSize={orderFilter.toPaging?.pageSize}
          warehouses={warehouses}
          onPageChange={handleOrderPageChange}
          onEditOrder={handleEditOrder}
          onDeleteOrder={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
          permissions={permissions}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <ShoppingCartOutlined className="text-xl font-medium" />
            Quản lý đơn hàng
          </h2>
          {permissions.canCreate() && (
            <Button
              variant="solid"
              color="primary"
              onClick={handleOpenCreateModal}
              className="rounded-2xl w-full sm:w-fit"
            >
              Tạo đơn hàng mới
            </Button>
          )}
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput placeholder="Nhập mã đơn hàng" handleSearchValue={handleOrderSearchValue} />
        </div>
      </div>

      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
      {agencies && products && (
        <Modal
          title={<h4 className="font-bold text-2xl text-center uppercase">TẠO ĐƠN HÀNG MỚI</h4>}
          className="w-11/12 md:w-2/3 xl:w-1/2"
          open={isOpenCreateModal}
          onCancel={handleCloseCreateModal}
          footer={null}
        >
          <CreateOrder
            handleCreateOrder={handleCreateOrder}
            agencies={agencies}
            products={products}
            warehouses={warehouses}
            isLoadingProducts={isLoadingProducts}
            isLoadingAgencies={isLoadingAgencies}
            isLoadingWarehouses={isLoadingWarehouses}
          />
        </Modal>
      )}

      <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT ĐƠN HÀNG</h4>}
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenDetailModal.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="back" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
          isOpenDetailModal.order &&
            permissions.canUpdate() &&
            (isOpenDetailModal.order.orderStatus === OrderStatus.NEW ||
              isOpenDetailModal.order.orderStatus === OrderStatus.INPROCESS) && (
              <Button
                key="production"
                type="primary"
                onClick={() => handleRequestProductionCommand(isOpenDetailModal.order!)}
                loading={createProductionCommandRequest.isPending}
              >
                Yêu cầu lệnh sản xuất
              </Button>
            ),
        ]}
      >
        {isOpenDetailModal.order && (
          <div className="mt-4">
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              items={[
                {
                  span: 2,
                  key: '1',
                  label: 'Mã đơn hàng',
                  children: isOpenDetailModal.order.code,
                },
                {
                  span: 1,
                  key: '2',
                  label: 'Đại lý',
                  children: isOpenDetailModal.order.agencyId,
                },
                {
                  span: 1,
                  key: '8',
                  label: 'Kho xuất hàng',
                  children: getWarehouseName(isOpenDetailModal.order.warehouseId),
                },
                {
                  span: 1,
                  key: '3',
                  label: 'VAT',
                  children: `${isOpenDetailModal.order.vat || 0}%`,
                },
                {
                  span: 1,
                  key: '4',
                  label: 'Giảm giá',
                  children: `${isOpenDetailModal.order.discount || 0}%`,
                },
                {
                  span: 2,
                  key: '5',
                  label: 'Tổng giá trị',
                  children: `${isOpenDetailModal.order.totalAmount?.toLocaleString('vi-VN')} đ`,
                },
                {
                  span: 1,
                  key: '6',
                  label: 'Loại đơn hàng',
                  children: (
                    <Tag color={isOpenDetailModal.order.isRefund ? 'volcano' : 'green'}>
                      {isOpenDetailModal.order.isRefund ? 'Hoàn trả hàng' : 'Đơn hàng mới'}
                    </Tag>
                  ),
                },
                {
                  span: 1,
                  key: '7',
                  label: 'Trạng thái',
                  children: (
                    <Tag color={genOrderStatus[isOpenDetailModal.order.orderStatus]?.color}>
                      {genOrderStatus[isOpenDetailModal.order.orderStatus]?.label}
                    </Tag>
                  ),
                },
              ]}
            />

            <div className="mt-4">
              <h5 className="font-semibold text-xl mb-2">Chi tiết sản phẩm:</h5>
              <List
                itemLayout="vertical"
                dataSource={isOpenDetailModal.order.orderDetails || []}
                renderItem={(detail, index) => (
                  <List.Item key={index} className="pb-0">
                    <List.Item.Meta
                      title={
                        <p className="font-semibold text-base">
                          Sản phẩm: {detail.product.name} -{' '}
                          {genProductTypes[detail.product.productType]}
                        </p>
                      }
                      description={
                        <div className="grid grid-cols-2 gap-1">
                          <p>
                            <strong>Mã sản phẩm:</strong> {detail.product.code}
                          </p>
                          <p>
                            <strong>Tên sản phẩm:</strong> {detail.product.name}
                          </p>
                          <p>
                            <strong>Loại sản phẩm:</strong>{' '}
                            {genProductTypes[detail.product.productType]}
                          </p>
                          <p>
                            <strong>Số lượng:</strong> {detail.quantity}
                          </p>
                          <p>
                            <strong>Đơn giá:</strong> {detail.unitPrice?.toLocaleString('vi-VN')} đ
                          </p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
