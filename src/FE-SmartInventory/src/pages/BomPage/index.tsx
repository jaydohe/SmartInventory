import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  ExclamationCircleFilled,
  UnorderedListOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps, Descriptions, List, Tag } from 'antd';
import { useState } from 'react';

import { TBom, TBomCreate, TBomUpdate } from '@/interface/TBom';
import { useQueryBom } from './Hook/useQueryBom';
import { useQueryProduct } from '../ProductPage/Hook/useQueryProduct';
import BomTable from './Components/BomTable';
import CreateBom from './Components/CreateBom';
import EditBom from './Components/EditBom';
import SearchInput from '@/Components/SearchInput';
import { usePermissions } from '@/hook/usePermissions';
import { formatDate } from '@/utils/formatDate';
import { ProductTypes, genProductTypes } from '@/Constant/ProductTypes';

export default function BomPage() {
  const permissions = usePermissions('BomPage');

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    bom?: TBom;
  }>({
    isOpen: false,
  });
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    bom?: TBom;
  }>({
    isOpen: false,
  });

  // Filter cho BOM
  const [bomFilter, setBomFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['product.*', 'billOfMaterialDetails.*', 'billOfMaterialDetails.material.*'],
    appendQuery: [
      {
        'product.name': {
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

  // Filter cho Product và Material
  const [productFilter] = useState<TBuilderQuery>({
    isAsc: false,
    // appendQuery: [
    //   {
    //     deletedOn: {
    //       value: 'null',
    //       queryOperator: '$eq',
    //       queryOperatorParent: '$and',
    //     },
    //   },
    // ],
  });

  const [materialFilter] = useState<TBuilderQuery>({
    isAsc: false,
    // appendQuery: [
    //   {
    //     deletedOn: {
    //       value: 'null',
    //       queryOperator: '$eq',
    //       queryOperatorParent: '$and',
    //     },
    //   },
    // ],
  });

  const bomParams = useBuilderQuery(bomFilter);
  const productParams = useBuilderQuery(productFilter);
  const materialParams = useBuilderQuery(materialFilter);

  // BOM queries
  const { getAllBom, createBom, updateBom, deleteBom } = useQueryBom(bomParams);
  const { data: listBom, isLoading: isLoadingBom } = getAllBom;

  // Product và Material queries
  const { getAllProduct } = useQueryProduct(productParams);
  const { getAllProductMaterial } = useQueryProduct(materialParams);
  const { data: listProduct, isLoading: isLoadingProduct } = getAllProduct;
  const { data: listMaterial, isLoading: isLoadingMaterial } = getAllProductMaterial;

  const handleCreateBom = (data: TBomCreate) => {
    createBom.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateBom = (id: string, data: TBomUpdate) => {
    updateBom.mutate(
      { id, data },
      {
        onSuccess: () => {
          handleCloseEditModal();
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

  const handleCloseEditModal = () => {
    setIsOpenEditModal({ isOpen: false });
  };

  const handleOpenDetailModal = (bom: TBom) => {
    setIsOpenDetailModal({ isOpen: true, bom });
  };

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setBomFilter({
      ...bomFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleEditBom = (bom: TBom) => {
    setIsOpenEditModal({ isOpen: true, bom: bom });
  };

  const showConfirmDelete = (bom: TBom) => {
    Modal.confirm({
      title: 'Xóa định mức',
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'red' }} />,
      content: 'Bạn có muốn xóa định mức này?',
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'default' },
      autoFocusButton: 'cancel',

      onOk: async () => {
        deleteBom.mutate(bom.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSearchValue = (valueSearch: string) => {
    setBomFilter((pre) => {
      // Tạo appendQuery mới bằng cách map qua mảng cũ
      const newAppendQuery = pre.appendQuery?.map((item) => {
        // Nếu object có key là 'product.name' hoặc 'code'
        if ('product.name' in item) {
          return {
            'product.name': {
              ...item['product.name'],
              value: valueSearch, // Cập nhật giá trị search cho product name
            },
          };
        }
        if ('code' in item) {
          return {
            code: {
              ...item.code,
              value: valueSearch, // Cập nhật giá trị search cho code
            },
          };
        }
        return item; // Giữ nguyên các item khác
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

  // Tạo các tab

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <ShoppingOutlined className="text-xl font-medium" />
            Quản lý định mức nguyên vật liệu
          </h2>
          {permissions.canCreate() && (
            <Button
              variant="solid"
              color="primary"
              onClick={handleOpenCreateModal}
              className="rounded-2xl w-full sm:w-fit"
            >
              Thêm định mức
            </Button>
          )}
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập tên sản phẩm hoặc mã định mức"
            handleSearchValue={handleSearchValue}
          />
        </div>
      </div>
      <BomTable
        data={listBom?.data}
        loading={isLoadingBom}
        totalRecords={listBom?.totalRecords}
        currentPage={bomFilter.toPaging?.page}
        pageSize={bomFilter.toPaging?.pageSize}
        onPageChange={handlePageChange}
        onEditBom={handleEditBom}
        onDeleteBom={showConfirmDelete}
        onViewDetail={handleOpenDetailModal}
        permissions={permissions}
      />

      {/* Modal tạo định mức */}
      <Modal
        title={
          <h4 className="font-bold text-2xl text-center uppercase">
            TẠO ĐỊNH MỨC NGUYÊN VẬT LIỆU MỚI
          </h4>
        }
        className="w-11/12 md:w-4/5 xl:w-3/4"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
        centered={true}
      >
        <CreateBom
          handleCreateBom={handleCreateBom}
          products={listProduct?.data || []}
          materials={listMaterial?.data || []}
          isLoadingProducts={isLoadingProduct}
          isLoadingMaterials={isLoadingMaterial}
        />
      </Modal>

      {/* Modal sửa định mức */}
      <Modal
        title={<h4 className="font-bold text-2xl text-center">SỬA ĐỊNH MỨC NGUYÊN VẬT LIỆU</h4>}
        className="w-11/12 md:w-4/5 xl:w-3/4"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        centered={true}
      >
        {isOpenEditModal.bom && (
          <EditBom
            handleUpdateBom={handleUpdateBom}
            bom={isOpenEditModal.bom}
            materials={listMaterial?.data || []}
            isLoadingMaterials={isLoadingMaterial}
          />
        )}
      </Modal>

      {/* Modal xem chi tiết định mức */}
      <Modal
        title={
          <h4 className="font-bold text-2xl text-center">CHI TIẾT ĐỊNH MỨC NGUYÊN VẬT LIỆU</h4>
        }
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenDetailModal.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="back" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
        ]}
      >
        {isOpenDetailModal.bom && (
          <div className="mt-4">
            <Descriptions
              bordered
              column={{ xs: 1, sm: 2 }}
              items={[
                {
                  span: 2,
                  key: '1',
                  label: 'Mã định mức',
                  children: isOpenDetailModal.bom.code,
                },
                {
                  span: 2,
                  key: '2',
                  label: 'Sản phẩm',
                  children: isOpenDetailModal.bom.product?.name,
                },
                {
                  span: 1,
                  key: '3',
                  label: 'Đơn vị',
                  children: isOpenDetailModal.bom.product?.unit,
                },
                {
                  span: 1,
                  key: '4',
                  label: 'Số lượng NVL',
                  children: (
                    <Tag color="blue">
                      {isOpenDetailModal.bom.billOfMaterialDetails?.length || 0} nguyên vật liệu
                    </Tag>
                  ),
                },
                {
                  span: 1,
                  key: '5',
                  label: 'Ngày tạo',
                  children: formatDate(isOpenDetailModal.bom.createdAt),
                },
                {
                  span: 1,
                  key: '6',
                  label: 'Ngày cập nhật',
                  children: formatDate(isOpenDetailModal.bom.modifiedOn),
                },
              ]}
            />

            <div className="mt-4">
              <h5 className="font-semibold text-xl mb-2">Chi tiết nguyên vật liệu:</h5>
              <List
                itemLayout="vertical"
                dataSource={isOpenDetailModal.bom.billOfMaterialDetails || []}
                renderItem={(detail, index) => (
                  <List.Item key={index} className="pb-0">
                    <List.Item.Meta
                      title={
                        <p className="font-semibold text-base">
                          Nguyên vật liệu: {detail.material.name}
                        </p>
                      }
                      description={
                        <div className="grid grid-cols-2 gap-1">
                          <p>
                            <strong>Mã NVL:</strong> {detail.material.code}
                          </p>
                          <p>
                            <strong>Tên NVL:</strong> {detail.material.name}
                          </p>
                          <p>
                            <strong>Đơn vị:</strong> {detail.material.unit}
                          </p>
                          <p>
                            <strong>Số lượng:</strong> {detail.quantity}
                          </p>
                          <p>
                            <strong>Đơn giá:</strong>{' '}
                            {detail.material.purchasePrice?.toLocaleString('vi-VN')} đ
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
