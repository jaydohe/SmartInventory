import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { ExclamationCircleFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Descriptions, List, Modal, Tag } from 'antd';
import { useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import { useQueryGoodsReceipt } from './Hook/useQueryGoodsReceipt';
import GoodsReceiptTable from './Components/GoodsReceiptTable';
import { TGoodsReceipt } from '@/interface/TGoodsReceipt';
import { genGoodsStatus, GoodsStatus } from '@/Constant/GoodsStatus';
import CreateGoodsReceiptContainer from './Components/CreateGoodsReceiptContainer';

import { usePermissions } from '@/hook/usePermissions';

export default function GoodsReceiptPage() {
  const permissions = usePermissions('GoodsReceiptPage');

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    goodsReceipt?: TGoodsReceipt;
  }>({
    isOpen: false,
  });

  const [goodsReceiptFilter, setGoodsReceiptFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['goodsReceiptDetail.*', 'goodsReceiptDetail.product.*'],
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

  const goodsReceiptParams = useBuilderQuery(goodsReceiptFilter);
  const { getAllGoodsReceipt, deleteGoodsReceipt, updateGoodsReceiptStatus } =
    useQueryGoodsReceipt(goodsReceiptParams);

  const { data: listGoodsReceipt, isLoading: isLoadingGoodsReceipt } = getAllGoodsReceipt;

  const handleOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const handleOpenDetailModal = (goodsReceipt: TGoodsReceipt) => {
    setIsOpenDetailModal({ isOpen: true, goodsReceipt });
  };

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
  };

  const handleGoodsReceiptPageChange = (page: number, pageSize: number) => {
    setGoodsReceiptFilter({
      ...goodsReceiptFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleEditGoodsReceipt = (goodsReceipt: TGoodsReceipt) => {
    // Xử lý cập nhật trạng thái phiếu nhập hàng
    Modal.confirm({
      title: 'Cập nhật trạng thái phiếu nhập',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'blue' }} />,
      content: 'Bạn có muốn xác nhận phiếu nhập hàng này?',
      okText: 'Xác nhận',
      cancelText: 'Huỷ',
      onOk: async () => {
        updateGoodsReceiptStatus.mutate({
          id: goodsReceipt.id,
          data: {
            status: GoodsStatus.SUCCESS,
            note: goodsReceipt.note || '',
          },
        });
      },
    });
  };

  const showConfirmDelete = (goodsReceipt: TGoodsReceipt) => {
    Modal.confirm({
      title: 'Xóa phiếu nhập hàng',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'red' }} />,
      content: 'Bạn có muốn xóa phiếu nhập hàng này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'default' },
      autoFocusButton: 'cancel',
      onOk: async () => {
        deleteGoodsReceipt.mutate(goodsReceipt.id);
      },
    });
  };

  const handleGoodsReceiptSearchValue = (valueSearch: string) => {
    setGoodsReceiptFilter((pre) => {
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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <ShoppingCartOutlined className="text-xl font-medium" />
            Quản lý phiếu nhập hàng
          </h2>
          {permissions.canCreate() && (
            <Button
              type="primary"
              onClick={handleOpenCreateModal}
              className="rounded-2xl w-full sm:w-fit"
            >
              Tạo phiếu nhập hàng
            </Button>
          )}
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập mã phiếu nhập hàng"
            handleSearchValue={handleGoodsReceiptSearchValue}
          />
        </div>
      </div>

      <GoodsReceiptTable
        data={listGoodsReceipt?.data}
        loading={isLoadingGoodsReceipt}
        totalRecords={listGoodsReceipt?.totalRecords}
        currentPage={goodsReceiptFilter.toPaging?.page}
        pageSize={goodsReceiptFilter.toPaging?.pageSize}
        onPageChange={handleGoodsReceiptPageChange}
        onEditGoodsReceipt={handleEditGoodsReceipt}
        onDeleteGoodsReceipt={showConfirmDelete}
        onViewDetail={handleOpenDetailModal}
        permissions={permissions}
      />

      <CreateGoodsReceiptContainer
        isModalOpen={isOpenCreateModal}
        handleCloseModal={handleCloseCreateModal}
      />

      <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT PHIẾU NHẬP HÀNG</h4>}
        open={isOpenDetailModal.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="back" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
        ]}
        className="w-11/12 md:w-8/12 xl:w-1/2"
      >
        {isOpenDetailModal.goodsReceipt && (
          <div className="mt-4">
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              items={[
                {
                  span: 2,
                  key: '1',
                  label: 'Mã phiếu',
                  children: isOpenDetailModal.goodsReceipt.code,
                },
                {
                  span: 2,
                  key: '2',
                  label: 'Shipper',
                  children: isOpenDetailModal.goodsReceipt.shipperName,
                },
                {
                  span: 2,
                  key: '3',
                  label: 'Tổng giá trị',
                  children: `${isOpenDetailModal.goodsReceipt.totalAmount?.toLocaleString(
                    'vi-VN'
                  )} đ`,
                },
                {
                  span: 2,
                  key: '4',
                  label: 'Ghi chú',
                  children: isOpenDetailModal.goodsReceipt.note || 'Không có',
                },

                {
                  span: 2,
                  key: '5',
                  label: 'Loại phiếu nhập',
                  children: (
                    <Tag
                      className="font-medium text-blue-600"
                      color={
                        isOpenDetailModal.goodsReceipt.productionCommandId
                          ? 'blue'
                          : isOpenDetailModal.goodsReceipt.materialSupplierId
                          ? 'green'
                          : 'cyan'
                      }
                    >
                      {isOpenDetailModal.goodsReceipt.productionCommandId
                        ? 'Lệnh sản xuất'
                        : isOpenDetailModal.goodsReceipt.materialSupplierId
                        ? 'Nhà cung cấp'
                        : 'Đơn hàng'}
                    </Tag>
                  ),
                },

                {
                  span: 2,
                  key: '6',
                  label: 'Trạng thái',
                  children: (
                    <Tag color={genGoodsStatus[isOpenDetailModal.goodsReceipt.status]?.color}>
                      {genGoodsStatus[isOpenDetailModal.goodsReceipt.status]?.label}
                    </Tag>
                  ),
                },
              ]}
            />

            <div className="mt-4">
              <h5 className="font-semibold text-xl mb-2">Chi tiết sản phẩm:</h5>
              {isOpenDetailModal.goodsReceipt.goodsReceiptDetail &&
              isOpenDetailModal.goodsReceipt.goodsReceiptDetail.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={isOpenDetailModal.goodsReceipt.goodsReceiptDetail}
                  renderItem={(detail, index) => (
                    <List.Item key={index} className="pb-0 bg-blue-50">
                      <List.Item.Meta
                        title={
                          <p className="font-semibold text-base">
                            {detail?.product?.name} ({detail?.product?.code})
                          </p>
                        }
                        description={
                          <div className="grid grid-cols-3 gap-2">
                            <p>
                              <span>Số lượng đặt:</span> {detail.quantityOrdered}
                            </p>
                            <p>
                              <span>Số lượng nhận:</span> {detail.quantityReceived}
                            </p>
                            <p>
                              <span>Tổng giá trị:</span>{' '}
                              {detail.totalPrice?.toLocaleString('vi-VN')} đ
                            </p>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <p>Không có sản phẩm nào</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
