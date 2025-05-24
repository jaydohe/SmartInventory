import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { ExclamationCircleFilled, AppstoreOutlined, ToolOutlined } from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps, Progress, Descriptions, List, Tag } from 'antd';
import { useEffect, useState } from 'react';
import SearchInput from '@/Components/SearchInput';
import { useQueryProductionCommand } from './Hook/useQueryProductionCommand';
import ProductionCommandTable from './Components/ProductionCommandTable';
import {
  TProductionCommand,
  TProductionCommandCreate,
  TProductionCommandProcessUpdate,
  TProductionCommandStatusUpdate,
} from '@/interface/TProductionCommand';
import { TProduct } from '@/interface/TProduct';
import {
  ProductCommandProcessStatus,
  ProductCommandStatus,
  genProductCommandProcessStatus,
  genProductCommandStatus,
} from '@/Constant/ProductCommandStatus';
import CreateProductionCommand from './Components/CreateProductionCommand';
import UpdateProductionCommandProcess from './Components/UpdateProductionCommandProcess';
import { useQueryProduct } from '../ProductPage/Hook/useQueryProduct';
import { ProductTypes } from '@/Constant/ProductTypes';

export default function ProductionCommandPage() {
  const [activeTab, setActiveTab] = useState<string>('all'); // Tab "Tất cả" là tab mặc định
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<{
    isOpen: boolean;
    productionCommand?: TProductionCommand;
  }>({
    isOpen: false,
  });
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    productionCommand?: TProductionCommand;
  }>({
    isOpen: false,
  });

  // Bộ lọc cho products
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

  // Lấy dữ liệu sản phẩm và nguyên vật liệu từ API
  const productParams = useBuilderQuery(filter);
  const { getAllProduct, getAllProductMaterial } = useQueryProduct(productParams);

  const { data: productsData, isLoading: isLoadingProducts } = getAllProduct;
  const { data: materialsData, isLoading: isLoadingMaterials } = getAllProductMaterial;

  // Kết hợp sản phẩm và nguyên vật liệu
  const products = productsData?.data || [];
  const materials = materialsData?.data || [];
  const [productionCommandFilter, setProductionCommandFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['processes.*', 'details.product.*', 'details.*'],
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

  // Thêm bộ lọc theo trạng thái lệnh sản xuất
  useEffect(() => {
    if (activeTab !== 'all') {
      const statusValue = parseInt(activeTab);
      // Cập nhật bộ lọc để thêm điều kiện lọc theo trạng thái
      setProductionCommandFilter((prev) => {
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
      setProductionCommandFilter((prev) => {
        return {
          ...prev,
          appendQuery: prev.appendQuery?.filter((q) => !('status' in q)),
        };
      });
    }
  }, [activeTab]);

  const productionCommandParams = useBuilderQuery(productionCommandFilter);
  const {
    getAllProductionCommand,
    createProductionCommand,
    deleteProductionCommand,
    updateProductionCommandStatus,
    updateProductionCommandProcess,
  } = useQueryProductionCommand(productionCommandParams);

  const { data: listProductionCommand, isLoading: isLoadingProductionCommand } =
    getAllProductionCommand;

  const handleCreateProductionCommand = (data: TProductionCommandCreate) => {
    createProductionCommand.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateProductionCommandStatus = (
    id: string,
    data: TProductionCommandStatusUpdate
  ) => {
    updateProductionCommandStatus.mutate({ id, data });
  };

  const handleUpdateProductionCommandProcess = (
    id: string,
    data: TProductionCommandProcessUpdate
  ) => {
    updateProductionCommandProcess.mutate(
      { id, data },
      {
        onSuccess: () => {
          handleCloseUpdateModal();
        },
      }
    );
  };

  const handleOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const handleOpenUpdateModal = (productionCommand: TProductionCommand) => {
    setIsOpenUpdateModal({ isOpen: true, productionCommand });
  };

  const handleCloseUpdateModal = () => {
    setIsOpenUpdateModal({ isOpen: false });
  };

  const handleOpenDetailModal = (productionCommand: TProductionCommand) => {
    setIsOpenDetailModal({ isOpen: true, productionCommand });
  };

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
  };

  const handleProductionCommandPageChange = (page: number, pageSize: number) => {
    setProductionCommandFilter({
      ...productionCommandFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const showConfirmDelete = (productionCommand: TProductionCommand) => {
    Modal.confirm({
      title: 'Xóa lệnh sản xuất',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'red' }} />,
      content: 'Bạn có muốn xóa lệnh sản xuất này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'default' },
      autoFocusButton: 'cancel',
      onOk: async () => {
        deleteProductionCommand.mutate(productionCommand.id);
      },
    });
  };

  const handleProductionCommandSearchValue = (valueSearch: string) => {
    setProductionCommandFilter((pre) => {
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

  // Tạo các tab dựa trên ProductCommandProcessStatus
  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: 'Tất cả',
      children: (
        <ProductionCommandTable
          data={listProductionCommand?.data}
          loading={isLoadingProductionCommand}
          totalRecords={listProductionCommand?.totalRecords}
          currentPage={productionCommandFilter.toPaging?.page}
          pageSize={productionCommandFilter.toPaging?.pageSize}
          onPageChange={handleProductionCommandPageChange}
          onEditProductionCommand={handleOpenUpdateModal}
          onDeleteProductionCommand={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: ProductCommandProcessStatus.PREPARATION.toString(),
      label: genProductCommandProcessStatus[ProductCommandProcessStatus.PREPARATION].label,
      children: (
        <ProductionCommandTable
          data={listProductionCommand?.data}
          loading={isLoadingProductionCommand}
          totalRecords={listProductionCommand?.totalRecords}
          currentPage={productionCommandFilter.toPaging?.page}
          pageSize={productionCommandFilter.toPaging?.pageSize}
          onPageChange={handleProductionCommandPageChange}
          onEditProductionCommand={handleOpenUpdateModal}
          onDeleteProductionCommand={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: ProductCommandProcessStatus.PRODUCTION.toString(),
      label: genProductCommandProcessStatus[ProductCommandProcessStatus.PRODUCTION].label,
      children: (
        <ProductionCommandTable
          data={listProductionCommand?.data}
          loading={isLoadingProductionCommand}
          totalRecords={listProductionCommand?.totalRecords}
          currentPage={productionCommandFilter.toPaging?.page}
          pageSize={productionCommandFilter.toPaging?.pageSize}
          onPageChange={handleProductionCommandPageChange}
          onEditProductionCommand={handleOpenUpdateModal}
          onDeleteProductionCommand={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: ProductCommandProcessStatus.QUALITYCONTROL.toString(),
      label: genProductCommandProcessStatus[ProductCommandProcessStatus.QUALITYCONTROL].label,
      children: (
        <ProductionCommandTable
          data={listProductionCommand?.data}
          loading={isLoadingProductionCommand}
          totalRecords={listProductionCommand?.totalRecords}
          currentPage={productionCommandFilter.toPaging?.page}
          pageSize={productionCommandFilter.toPaging?.pageSize}
          onPageChange={handleProductionCommandPageChange}
          onEditProductionCommand={handleOpenUpdateModal}
          onDeleteProductionCommand={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: ProductCommandProcessStatus.PACKAGING.toString(),
      label: genProductCommandProcessStatus[ProductCommandProcessStatus.PACKAGING].label,
      children: (
        <ProductionCommandTable
          data={listProductionCommand?.data}
          loading={isLoadingProductionCommand}
          totalRecords={listProductionCommand?.totalRecords}
          currentPage={productionCommandFilter.toPaging?.page}
          pageSize={productionCommandFilter.toPaging?.pageSize}
          onPageChange={handleProductionCommandPageChange}
          onEditProductionCommand={handleOpenUpdateModal}
          onDeleteProductionCommand={showConfirmDelete}
          onViewDetail={handleOpenDetailModal}
        />
      ),
    },
    {
      key: ProductCommandProcessStatus.COMPLETED.toString(),
      label: genProductCommandProcessStatus[ProductCommandProcessStatus.COMPLETED].label,
      children: (
        <ProductionCommandTable
          data={listProductionCommand?.data}
          loading={isLoadingProductionCommand}
          totalRecords={listProductionCommand?.totalRecords}
          currentPage={productionCommandFilter.toPaging?.page}
          pageSize={productionCommandFilter.toPaging?.pageSize}
          onPageChange={handleProductionCommandPageChange}
          onEditProductionCommand={handleOpenUpdateModal}
          onDeleteProductionCommand={showConfirmDelete}
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
            <ToolOutlined className="text-xl font-medium" />
            Quản lý lệnh sản xuất
          </h2>
          <Button
            variant="solid"
            color="primary"
            onClick={handleOpenCreateModal}
            className="rounded-2xl w-full sm:w-fit"
          >
            Tạo lệnh sản xuất mới
          </Button>
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập mã lệnh sản xuất"
            handleSearchValue={handleProductionCommandSearchValue}
          />
        </div>
      </div>

      <Tabs defaultActiveKey="all" items={items} onChange={onChange} />
      {materials && products && (
        <Modal
          title={
            <h4 className="font-bold text-2xl text-center uppercase">TẠO LỆNH SẢN XUẤT MỚI</h4>
          }
          className="w-11/12 md:w-2/3 xl:w-1/2"
          open={isOpenCreateModal}
          onCancel={handleCloseCreateModal}
          footer={null}
        >
          <CreateProductionCommand
            materials={materials}
            handleCreateProductionCommand={handleCreateProductionCommand}
            products={products}
            isLoadingProducts={isLoadingProducts || isLoadingMaterials}
          />
        </Modal>
      )}

      <Modal
        title={<h4 className="font-bold text-2xl text-center uppercase">CẬP NHẬT TIẾN ĐỘ</h4>}
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenUpdateModal.isOpen}
        onCancel={handleCloseUpdateModal}
        footer={null}
      >
        {isOpenUpdateModal.productionCommand && (
          <UpdateProductionCommandProcess
            key={isOpenUpdateModal.productionCommand.id}
            productionCommand={isOpenUpdateModal.productionCommand}
            handleUpdateProcess={handleUpdateProductionCommandProcess}
            handleUpdateProductionCommandStatus={handleUpdateProductionCommandStatus}
          />
        )}
      </Modal>

      <Modal
        title={<h4 className="font-bold text-2xl text-center">CHI TIẾT LỆNH SẢN XUẤT</h4>}
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenDetailModal.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="back" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
        ]}
      >
        {isOpenDetailModal.productionCommand && (
          <div className="mt-4">
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              items={[
                {
                  span: 2,
                  key: '1',
                  label: 'Mã lệnh',
                  children: isOpenDetailModal.productionCommand.code,
                },
                {
                  span: 2,
                  key: '2',
                  label: 'Sản phẩm',
                  children: `${isOpenDetailModal.productionCommand.details[0].product?.name} (${isOpenDetailModal.productionCommand.details[0].product?.code})`,
                },
                {
                  span: 2,
                  key: '3',
                  label: 'Số lượng',
                  children: isOpenDetailModal.productionCommand.details[0].quantity,
                },
                {
                  span: 2,
                  key: '4',
                  label: 'Kế hoạch bắt đầu',
                  children: new Date(
                    isOpenDetailModal.productionCommand.plannedStart
                  ).toLocaleDateString('vi-VN'),
                },
                {
                  span: 2,
                  key: '5',
                  label: 'Kế hoạch kết thúc',
                  children: new Date(
                    isOpenDetailModal.productionCommand.plannedEnd
                  ).toLocaleDateString('vi-VN'),
                },
                {
                  span: 2,
                  key: '6',
                  label: 'Tình trạng',
                  children: (
                    <Tag
                      color={
                        genProductCommandStatus[isOpenDetailModal.productionCommand.status]?.color
                      }
                    >
                      {genProductCommandStatus[isOpenDetailModal.productionCommand.status]?.label}
                    </Tag>
                  ),
                },
              ]}
            />

            <div className="mt-4">
              <h5 className="font-semibold text-xl mb-2">Tiến độ:</h5>
              {isOpenDetailModal.productionCommand.processes &&
              isOpenDetailModal.productionCommand.processes.length > 0 ? (
                <div>
                  <Progress
                    percent={
                      isOpenDetailModal.productionCommand.processes[
                        isOpenDetailModal.productionCommand.processes.length - 1
                      ].percentage
                    }
                    status={
                      isOpenDetailModal.productionCommand.status === ProductCommandStatus.COMPLETED
                        ? 'success'
                        : 'active'
                    }
                  />
                </div>
              ) : (
                <p>Chưa có cập nhật tiến độ</p>
              )}
            </div>

            <div className="mt-4">
              <h5 className="font-semibold text-xl mb-2">Nguyên vật liệu sử dụng:</h5>
              {isOpenDetailModal.productionCommand.details &&
              isOpenDetailModal.productionCommand.details.length > 0 ? (
                <List
                  itemLayout="vertical"
                  dataSource={isOpenDetailModal.productionCommand.details}
                  renderItem={(detail, index) => (
                    <List.Item key={index} className="pb-0">
                      <List.Item.Meta
                        title={
                          <p className="font-semibold text-base">
                            {detail.product.name} ({detail.product.code})
                          </p>
                        }
                        description={
                          <div className="grid grid-cols-3 gap-2">
                            <p>
                              <span>Số lượng:</span> {detail.quantity} {detail.product.unit}
                            </p>
                            <p>
                              <span>Đơn giá:</span> {detail.price?.toLocaleString('vi-VN')} đ
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
                <p>Không có nguyên vật liệu nào được sử dụng</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
