import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  ExclamationCircleFilled,
  ShoppingOutlined,
  ShoppingCartOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Button, Descriptions, List, Modal, Select, Tabs, TabsProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import { useQueryGoodsIssue } from './Hook/useQueryGoodsIssue';
import GoodsIssueTable from './Components/GoodsIssueTable';
import { TGoodsIssue, TCreateGoodsIssue, TUpdateGoodsIssueStatus } from '@/interface/TGoodsIssuse';
import CreateGoodsIssue from './Components/CreateGoodsIssue';
import { TProduct } from '@/interface/TProduct';
import { GoodsStatus, genGoodsStatus } from '@/Constant/GoodsStatus';
import { useQueryAgency } from '../AgencyPage/Hook/useQueryAgency';
import { useQueryProduct } from '../ProductPage/Hook/useQueryProduct';
import { ProductTypes } from '@/Constant/ProductTypes';
import { TUpdateOrderStatus } from '@/interface/TOder';
import { useQueryOrder } from '../OrderPage/Hook/useQueryOrder';
import { OrderStatus } from '@/Constant/OderStatus';

export default function GoodsIssuePage() {
  const [activeTab, setActiveTab] = useState<string>('all'); // Tab "Tất cả" là tab mặc định
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    goodsIssue?: TGoodsIssue;
  }>({
    isOpen: false,
  });

  // Bộ lọc cho agencies, products và orders
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

  // Bộ lọc cho đơn hàng - chỉ lấy đơn hàng có trạng thái NEW hoặc INPROCESS
  const [filterOrder] = useState<TBuilderQuery>({
    isAsc: false,
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

  // Lấy dữ liệu đại lý, sản phẩm và đơn hàng từ API
  const agencyParams = useBuilderQuery(filter);
  const productParams = useBuilderQuery(filterProduct);
  const orderParams = useBuilderQuery(filterOrder);

  const { getAllAgency } = useQueryAgency(agencyParams);
  const { getAllProduct } = useQueryProduct(productParams);
  const { getAllOrder } = useQueryOrder(orderParams);

  const { data: agenciesData, isLoading: isLoadingAgencies } = getAllAgency;
  const { data: productsData, isLoading: isLoadingProducts } = getAllProduct;
  const { data: ordersData, isLoading: isLoadingOrders } = getAllOrder;

  // Lọc sản phẩm thành phẩm (không phải nguyên vật liệu)
  const products = productsData?.data || [];
  const agencies = agenciesData?.data || [];
  const orders = ordersData?.data || [];

  const [goodsIssueFilter, setGoodsIssueFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['goodsIssueDetails.product.*', 'goodsIssueDetails.*'],

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

  // Thêm bộ lọc theo trạng thái phiếu xuất hàng
  useEffect(() => {
    if (activeTab !== 'all') {
      const statusValue = parseInt(activeTab);
      // Cập nhật bộ lọc để thêm điều kiện lọc theo trạng thái
      setGoodsIssueFilter((prev) => {
        // Tìm xem đã có query theo status chưa
        const hasStatusQuery = prev.appendQuery?.some((q) => 'status' in q);

        if (hasStatusQuery) {
          // Nếu đã có, cập nhật giá trị
          return {
            ...prev,
            appendQuery: prev.appendQuery?.map((q) => {
              if ('status' in q) {
                return {
                  status: {
                    ...q.status,
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
                status: {
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
      setGoodsIssueFilter((prev) => {
        return {
          ...prev,
          appendQuery: prev.appendQuery?.filter((q) => !('status' in q)),
        };
      });
    }
  }, [activeTab]);

  const goodsIssueParams = useBuilderQuery(goodsIssueFilter);
  const { getAllGoodsIssue, createGoodsIssue, deleteGoodsIssue, updateGoodsIssueStatus } =
    useQueryGoodsIssue(goodsIssueParams);

  const { data: listGoodsIssue, isLoading: isLoadingGoodsIssue } = getAllGoodsIssue;

  const handleCreateGoodsIssue = (data: TCreateGoodsIssue) => {
    createGoodsIssue.mutate(data, {
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

  const handleOpenDetailModal = (goodsIssue: TGoodsIssue) => {
    setIsOpenDetailModal({ isOpen: true, goodsIssue });
  };

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
  };

  const handleGoodsIssuePageChange = (page: number, pageSize: number) => {
    setGoodsIssueFilter({
      ...goodsIssueFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleEditGoodsIssue = (goodsIssue: TGoodsIssue) => {
    // Hiển thị modal để cập nhật trạng thái đơn hàng
    let selectedStatus = goodsIssue.status;
    // Hiển thị modal để cập nhật trạng thái phiếu xuất hàng
    Modal.confirm({
      title: 'Cập nhật trạng thái phiếu xuất',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'blue' }} />,
      content: (
        <div>
          <p>Chọn trạng thái mới cho phiếu xuất:</p>
          <Select
            id="goodsIssueStatus"
            className="w-full mt-2"
            defaultValue={goodsIssue.status}
            onChange={(value) => {
              selectedStatus = value;
            }}
          >
            <Select.Option value={GoodsStatus.CREATED}>
              <Tag color={genGoodsStatus[GoodsStatus.CREATED].color}>
                {genGoodsStatus[GoodsStatus.CREATED].label}
              </Tag>
            </Select.Option>
            <Select.Option value={GoodsStatus.PENDING}>
              <Tag color={genGoodsStatus[GoodsStatus.PENDING].color}>
                {genGoodsStatus[GoodsStatus.PENDING].label}
              </Tag>
            </Select.Option>
            <Select.Option value={GoodsStatus.SUCCESS}>
              <Tag color={genGoodsStatus[GoodsStatus.SUCCESS].color}>
                {genGoodsStatus[GoodsStatus.SUCCESS].label}
              </Tag>
            </Select.Option>
            <Select.Option value={GoodsStatus.CANCELLED}>
              <Tag color={genGoodsStatus[GoodsStatus.CANCELLED].color}>
                {genGoodsStatus[GoodsStatus.CANCELLED].label}
              </Tag>
            </Select.Option>
          </Select>
        </div>
      ),
      okText: 'Cập nhật',
      cancelText: 'Huỷ',
      onOk: async () => {
        const updateData: TUpdateGoodsIssueStatus = {
          status: selectedStatus,
        };

        updateGoodsIssueStatus.mutate({
          id: goodsIssue.code,
          data: updateData,
        });
      },
    });
  };

  const showConfirmDelete = (goodsIssue: TGoodsIssue) => {
    Modal.confirm({
      title: 'Xóa phiếu xuất hàng',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'red' }} />,
      content: 'Bạn có muốn xóa phiếu xuất hàng này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'default' },
      autoFocusButton: 'cancel',
      onOk: async () => {
        deleteGoodsIssue.mutate(goodsIssue.id);
      },
    });
  };

  const handleGoodsIssueSearchValue = (valueSearch: string) => {
    setGoodsIssueFilter((pre) => {
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

  // Tạo các tab dựa trên GoodsStatus
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: (
        <GoodsIssueTable
          data={listGoodsIssue?.data}
          loading={isLoadingGoodsIssue}
          totalRecords={listGoodsIssue?.totalRecords}
          currentPage={goodsIssueFilter.toPaging?.page}
          pageSize={goodsIssueFilter.toPaging?.pageSize}
          onPageChange={handleGoodsIssuePageChange}
          onEditGoodsIssue={handleEditGoodsIssue}
          onDeleteGoodsIssue={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: GoodsStatus.CREATED.toString(),
      label: genGoodsStatus[GoodsStatus.CREATED].label,
      children: (
        <GoodsIssueTable
          data={listGoodsIssue?.data}
          loading={isLoadingGoodsIssue}
          totalRecords={listGoodsIssue?.totalRecords}
          currentPage={goodsIssueFilter.toPaging?.page}
          pageSize={goodsIssueFilter.toPaging?.pageSize}
          onPageChange={handleGoodsIssuePageChange}
          onEditGoodsIssue={handleEditGoodsIssue}
          onDeleteGoodsIssue={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: GoodsStatus.PENDING.toString(),
      label: genGoodsStatus[GoodsStatus.PENDING].label,
      children: (
        <GoodsIssueTable
          data={listGoodsIssue?.data}
          loading={isLoadingGoodsIssue}
          totalRecords={listGoodsIssue?.totalRecords}
          currentPage={goodsIssueFilter.toPaging?.page}
          pageSize={goodsIssueFilter.toPaging?.pageSize}
          onPageChange={handleGoodsIssuePageChange}
          onEditGoodsIssue={handleEditGoodsIssue}
          onDeleteGoodsIssue={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: GoodsStatus.SUCCESS.toString(),
      label: genGoodsStatus[GoodsStatus.SUCCESS].label,
      children: (
        <GoodsIssueTable
          data={listGoodsIssue?.data}
          loading={isLoadingGoodsIssue}
          totalRecords={listGoodsIssue?.totalRecords}
          currentPage={goodsIssueFilter.toPaging?.page}
          pageSize={goodsIssueFilter.toPaging?.pageSize}
          onPageChange={handleGoodsIssuePageChange}
          onEditGoodsIssue={handleEditGoodsIssue}
          onDeleteGoodsIssue={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: GoodsStatus.CANCELLED.toString(),
      label: genGoodsStatus[GoodsStatus.CANCELLED].label,
      children: (
        <GoodsIssueTable
          data={listGoodsIssue?.data}
          loading={isLoadingGoodsIssue}
          totalRecords={listGoodsIssue?.totalRecords}
          currentPage={goodsIssueFilter.toPaging?.page}
          pageSize={goodsIssueFilter.toPaging?.pageSize}
          onPageChange={handleGoodsIssuePageChange}
          onEditGoodsIssue={handleEditGoodsIssue}
          onDeleteGoodsIssue={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <ExportOutlined className="text-xl font-medium" />
            Quản lý phiếu xuất hàng
          </h2>
          <Button
            variant="solid"
            color="primary"
            onClick={handleOpenCreateModal}
            className="rounded-2xl w-full sm:w-fit"
          >
            Tạo phiếu xuất hàng
          </Button>
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập mã phiếu xuất hàng"
            handleSearchValue={handleGoodsIssueSearchValue}
          />
        </div>
      </div>

      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
      {ordersData?.data && (
        <Modal
          title={
            <h4 className="font-bold text-2xl text-center uppercase">TẠO PHIẾU XUẤT KHO MỚI</h4>
          }
          className="w-11/12 md:w-2/3 xl:w-1/2"
          open={isOpenCreateModal}
          onCancel={handleCloseCreateModal}
          footer={null}
        >
          <CreateGoodsIssue
            handleCreateGoodsIssue={handleCreateGoodsIssue}
            orders={ordersData?.data}
            products={products}
            isLoadingProducts={isLoadingProducts}
            isLoadingOrders={isLoadingOrders}
          />
        </Modal>
      )}

      <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT PHIẾU XUẤT KHO</h4>}
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenDetailModal.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="back" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
        ]}
      >
        {isOpenDetailModal.goodsIssue && (
          <div className="mt-4">
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              items={[
                {
                  span: 2,
                  key: '1',
                  label: 'Mã phiếu xuất',
                  children: isOpenDetailModal.goodsIssue.code,
                },
                {
                  span: 1,
                  key: '2',
                  label: 'Mã đơn hàng',
                  children: isOpenDetailModal.goodsIssue.orderId,
                },
                {
                  span: 1,
                  key: '7',
                  label: 'Kho xuất hàng',
                  children: isOpenDetailModal.goodsIssue.warehouseId,
                },
                {
                  span: 1,
                  key: '3',
                  label: 'Ngày tạo',
                  children: new Date(isOpenDetailModal.goodsIssue.createdAt).toLocaleDateString(
                    'vi-VN'
                  ),
                },
                {
                  span: 1,
                  key: '4',
                  label: 'Tổng giá trị',
                  children: `${isOpenDetailModal.goodsIssue.totalAmount?.toLocaleString(
                    'vi-VN'
                  )} đ`,
                },
                {
                  span: 1,
                  key: '5',
                  label: 'Trạng thái',
                  children: (
                    <Tag color={genGoodsStatus[isOpenDetailModal.goodsIssue.status]?.color}>
                      {genGoodsStatus[isOpenDetailModal.goodsIssue.status]?.label}
                    </Tag>
                  ),
                },
                {
                  span: 1,
                  key: '6',
                  label: 'Ghi chú',
                  children: isOpenDetailModal.goodsIssue.note || 'Không có',
                },
              ]}
            />

            <div className="mt-4">
              <h5 className="font-semibold text-xl mb-2">Chi tiết sản phẩm:</h5>
              <List
                itemLayout="vertical"
                dataSource={isOpenDetailModal.goodsIssue.goodsIssueDetails || []}
                renderItem={(detail, index) => (
                  <List.Item key={index} className="pb-0">
                    <List.Item.Meta
                      title={
                        <p className="font-semibold text-base">
                          Sản phẩm: {detail.product.name} ({detail.product.code})
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
                            <strong>Số lượng yêu cầu:</strong> {detail.quantityRequested}
                          </p>
                          <p>
                            <strong>Số lượng đã xuất:</strong> {detail.quantityIssued}
                          </p>
                          <p>
                            <strong>Tổng giá trị:</strong>{' '}
                            {detail.totalPrice?.toLocaleString('vi-VN')} đ
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
