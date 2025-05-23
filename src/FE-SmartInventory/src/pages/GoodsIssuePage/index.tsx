import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  ExclamationCircleFilled,
  ShoppingOutlined,
  ShoppingCartOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import { useQueryGoodsIssue } from './Hook/useQueryGoodsIssue';
import GoodsIssueTable from './Components/GoodsIssueTable';
import { TGoodsIssue, TGoodsIssueCreate, TGoodsIssueUpdate } from '@/interface/TGoodsIssuse';
import CreateGoodsIssue from './Components/CreateGoodsIssue';
import { TProduct } from '@/interface/TProduct';
import { GoodsStatus, genGoodsStatus } from '@/Constant/GoodsStatus';

export default function GoodsIssuePage() {
  const [activeTab, setActiveTab] = useState<string>('all'); // Tab "Tất cả" là tab mặc định
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    goodsIssue?: TGoodsIssue;
  }>({
    isOpen: false,
  });

  // Dữ liệu mock cho đại lý và sản phẩm (cần thay thế bằng dữ liệu thực)
  const agencies = [
    { id: 'agency1', name: 'Đại lý 1' },
    { id: 'agency2', name: 'Đại lý 2' },
  ];

  const products: TProduct[] = [
    { id: 'product1', code: 'SP001', name: 'Sản phẩm 1', productType: 0 } as TProduct,
    { id: 'product2', code: 'SP002', name: 'Sản phẩm 2', productType: 0 } as TProduct,
  ];

  const [goodsIssueFilter, setGoodsIssueFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
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

  const handleCreateGoodsIssue = (data: TGoodsIssueCreate) => {
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
    // Hiển thị modal để cập nhật trạng thái phiếu xuất hàng
    Modal.confirm({
      title: 'Cập nhật trạng thái phiếu xuất',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'blue' }} />,
      content: (
        <div>
          <p>Chọn trạng thái mới cho phiếu xuất:</p>
          <select
            id="goodsIssueStatus"
            className="w-full p-2 mt-2 border rounded"
            defaultValue={goodsIssue.status}
          >
            <option value={GoodsStatus.CREATED}>Tạo mới</option>
            <option value={GoodsStatus.PENDING}>Chờ xác nhận</option>
            <option value={GoodsStatus.SUCCESS}>Đã xác nhận</option>
            <option value={GoodsStatus.CANCELLED}>Đã hủy</option>
          </select>
        </div>
      ),
      okText: 'Cập nhật',
      cancelText: 'Huỷ',
      onOk: async () => {
        const selectElement = document.getElementById('goodsIssueStatus') as HTMLSelectElement;
        const newStatus = parseInt(selectElement.value);

        const updateData: TGoodsIssueUpdate = {
          status: newStatus,
          note: goodsIssue.note || '',
        };

        updateGoodsIssueStatus.mutate({
          id: goodsIssue.id,
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
        <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
          <ExportOutlined className="text-xl font-medium" />
          Quản lý phiếu xuất hàng
        </h2>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
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

      <Modal
        title={<h4 className="font-bold text-2xl text-center uppercase">TẠO PHIẾU XUẤT HÀNG</h4>}
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <CreateGoodsIssue
          handleCreateGoodsIssue={handleCreateGoodsIssue}
          agencies={agencies}
          products={products}
          isLoadingProducts={false}
          isLoadingAgencies={false}
        />
      </Modal>

      <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT PHIẾU XUẤT HÀNG</h4>}
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
            <p>
              <strong>Mã phiếu:</strong> {isOpenDetailModal.goodsIssue.code}
            </p>
            <p>
              <strong>Đại lý/Khách hàng:</strong> {isOpenDetailModal.goodsIssue.receiverName}
            </p>
            <p>
              <strong>Ngày giao hàng:</strong>{' '}
              {new Date(isOpenDetailModal.goodsIssue.deliveryDate).toLocaleDateString('vi-VN')}
            </p>
            <p>
              <strong>Tổng giá trị:</strong>{' '}
              {isOpenDetailModal.goodsIssue.totalAmount?.toLocaleString('vi-VN')} đ
            </p>
            <p>
              <strong>Trạng thái:</strong>{' '}
              <span
                className={`text-${genGoodsStatus[isOpenDetailModal.goodsIssue.status]?.color}`}
              >
                {genGoodsStatus[isOpenDetailModal.goodsIssue.status]?.label}
              </span>
            </p>
            <p>
              <strong>Ghi chú:</strong> {isOpenDetailModal.goodsIssue.note || 'Không có'}
            </p>
            <div className="mt-4">
              <h5 className="font-semibold mb-2">Chi tiết sản phẩm:</h5>
              <ul className="list-disc pl-5">
                {isOpenDetailModal.goodsIssue.goodsIssueDetail?.map((detail, index) => (
                  <li key={index} className="mb-2">
                    <p>
                      <strong>Sản phẩm:</strong> {detail.product.name} ({detail.product.code})
                    </p>
                    <p>
                      <strong>Số lượng:</strong> {detail.quantity}
                    </p>
                    <p>
                      <strong>Đơn giá:</strong> {detail.unitPrice?.toLocaleString('vi-VN')} đ
                    </p>
                    <p>
                      <strong>Thành tiền:</strong> {detail.totalPrice?.toLocaleString('vi-VN')} đ
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
