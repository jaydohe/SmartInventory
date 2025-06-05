import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  ExclamationCircleFilled,
  UnorderedListOutlined,
  ShoppingOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { Button, Modal, Tabs, TabsProps } from 'antd';
import { useState } from 'react';

import { TCreateProduct, TProduct, TUpdateProduct } from '@/interface/TProduct';
import { useQueryProduct } from './Hook/useQueryProduct';
import { useQueryCategoryProduct } from '../CategoryProductPage/Hook/useQueryCategoryProduct';
import EditProduct from './Components/EditProduct';
import CreateProduct from './Components/CreateProduct';
import SearchInput from '@/Components/SearchInput';
import ProductTable from './Components/ProductTable';
import { ProductTypes } from '@/Constant/ProductTypes';
<<<<<<< Updated upstream
=======
import { usePermissions } from '@/hook/usePermissions';
>>>>>>> Stashed changes

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<string>('1'); // Tab sản phẩm là tab mặc định

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    product?: TProduct;
  }>({
    isOpen: false,
  });

  // Default warehouse ID (giả định, cần thay thế bằng giá trị thực tế)
  const defaultWarehouseId = 'warehouse-id-placeholder';

  // Lấy danh sách CategoryProduct để hiển thị trong dropdown
  const [categoryFilter] = useState<TBuilderQuery>({
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

  const categoryParams = useBuilderQuery(categoryFilter);
  const { getAllCategoryProduct } = useQueryCategoryProduct(categoryParams);
  const { data: listCategory, isLoading: isLoadingCategory } = getAllCategoryProduct;

  const [productFilter, setProductFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
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

  const [materialFilter, setMaterialFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
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

  const productParams = useBuilderQuery(productFilter);
  const materialParams = useBuilderQuery(materialFilter);

  const { getAllProduct, getAllProductMaterial, createProduct, deleteProduct, updateProduct } =
    useQueryProduct(activeTab === '1' ? productParams : materialParams);

  // Data và loading sẽ phụ thuộc vào tab active
  const { data: listProduct, isLoading: isLoadingProduct } = getAllProduct;
  const { data: listMaterial, isLoading: isLoadingMaterial } = getAllProductMaterial;

  const handleCreateProduct = (data: TCreateProduct) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateProduct = (id: string, data: TUpdateProduct) => {
    updateProduct.mutate(
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

  const handleProductPageChange = (page: number, pageSize: number) => {
    setProductFilter({
      ...productFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleMaterialPageChange = (page: number, pageSize: number) => {
    setMaterialFilter({
      ...materialFilter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleEditProduct = (product: TProduct) => {
    setIsOpenEditModal({ isOpen: true, product: product });
  };

  const showConfirmNotify = (title: string, desc: string, product: TProduct) => {
    Modal.confirm({
      title: title,
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'red' }} />,
      content: desc,
      okText: 'Xác nhận',
      okType: 'danger',
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'default' },
      autoFocusButton: 'cancel',

      onOk: async () => {
        deleteProduct.mutate(product.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleProductSearchValue = (valueSearch: string) => {
    setProductFilter((pre) => {
      // Tạo appendQuery mới bằng cách map qua mảng cũ
      const newAppendQuery = pre.appendQuery?.map((item) => {
        // Nếu object có key là 'name' hoặc 'code'
        if ('name' in item) {
          return {
            name: {
              ...item.name,
              value: valueSearch, // Cập nhật giá trị search cho name
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

  const handleMaterialSearchValue = (valueSearch: string) => {
    setMaterialFilter((pre) => {
      // Tạo appendQuery mới bằng cách map qua mảng cũ
      const newAppendQuery = pre.appendQuery?.map((item) => {
        // Nếu object có key là 'name' hoặc 'code'
        if ('name' in item) {
          return {
            name: {
              ...item.name,
              value: valueSearch, // Cập nhật giá trị search cho name
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

  const onChange = (key: string) => {
    setActiveTab(key);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center gap-1">
          <ShoppingOutlined />
          <span>Sản phẩm</span>
        </div>
      ),
      children: (
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center justify-center flex-wrap gap-3">
              <Button
                variant="solid"
                color="primary"
                onClick={() => handleOpenCreateModal()}
                className="rounded-2xl w-full sm:w-fit"
              >
                Thêm sản phẩm
              </Button>
            </div>

            <div className="w-full sm:w-1/3 justify-end">
              <SearchInput
                placeholder="Nhập tên hoặc mã sản phẩm"
                handleSearchValue={handleProductSearchValue}
              />
            </div>
          </div>

          <ProductTable
            data={listProduct?.data}
            loading={isLoadingProduct}
            totalRecords={listProduct?.totalRecords}
            currentPage={productFilter.toPaging?.page}
            pageSize={productFilter.toPaging?.pageSize}
            categories={listCategory?.data}
            onPageChange={handleProductPageChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={(product) =>
              showConfirmNotify('Xóa sản phẩm', 'Bạn có muốn xóa sản phẩm này?', product)
            }
          />
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center gap-1">
          <InboxOutlined />
          <span>Nguyên vật liệu</span>
        </div>
      ),
      children: (
        <div>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center justify-center flex-wrap gap-3">
              <Button
                variant="solid"
                color="primary"
                onClick={() => handleOpenCreateModal()}
                className="rounded-2xl w-full sm:w-fit"
              >
                Thêm nguyên vật liệu
              </Button>
            </div>

            <div className="w-full sm:w-1/3 justify-end">
              <SearchInput
                placeholder="Nhập tên hoặc mã nguyên vật liệu"
                handleSearchValue={handleMaterialSearchValue}
              />
            </div>
          </div>

          <ProductTable
            data={listMaterial?.data}
            loading={isLoadingMaterial}
            totalRecords={listMaterial?.totalRecords}
            currentPage={materialFilter.toPaging?.page}
            pageSize={materialFilter.toPaging?.pageSize}
            categories={listCategory?.data}
            onPageChange={handleMaterialPageChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={(product) =>
              showConfirmNotify(
                'Xóa nguyên vật liệu',
                'Bạn có muốn xóa nguyên vật liệu này?',
                product
              )
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
          <UnorderedListOutlined className="text-xl font-medium" />
          Quản lý sản phẩm & nguyên vật liệu
        </h2>
      </div>

      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

      <Modal
        title={
          <h4 className="font-bold text-2xl text-center uppercase">
            {activeTab === '1' ? 'TẠO SẢN PHẨM MỚI' : 'TẠO NGUYÊN VẬT LIỆU MỚI'}
          </h4>
        }
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <CreateProduct
          handleCreateProduct={handleCreateProduct}
          warehouseId={defaultWarehouseId}
          defaultProductType={activeTab === '1' ? ProductTypes.GOODS : ProductTypes.RAW_MATERIAL}
          categories={listCategory?.data || []}
          isLoadingCategories={isLoadingCategory}
        />
      </Modal>

      <Modal
        title={
          <h4 className="font-bold text-2xl text-center">
            {isOpenEditModal.product?.productType === ProductTypes.GOODS
              ? 'SỬA SẢN PHẨM'
              : 'SỬA NGUYÊN VẬT LIỆU'}
          </h4>
        }
        className="w-11/12 md:w-2/3 xl:w-1/2"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        centered={true}
      >
        {isOpenEditModal.product && listCategory?.data && (
          <EditProduct
            handleUpdateProduct={handleUpdateProduct}
            product={isOpenEditModal.product}
            categories={listCategory?.data}
            isLoadingCategories={isLoadingCategory}
          />
        )}
      </Modal>
    </div>
  );
}
