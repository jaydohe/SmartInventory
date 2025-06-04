import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { TCreateCategory, TCategory } from '@/interface/TCategory';
import { useQueryCategoryProduct } from './Hook/useQueryCategoryProduct';
import EditCategoryProduct from './Components/EditCategoryProduct';
import CreateCategoryProduct from './Components/CreateCategoryProduct';
import SearchInput from '@/Components/SearchInput';
import { usePermissions } from '@/hooks/usePermissions';

export default function CategoryProductPage() {
  const permissions = usePermissions('CategoryProductPage');

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    category?: TCategory;
  }>({
    isOpen: false,
  });

  const [filter, setFilter] = useState<TBuilderQuery>({
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
    ],
  });

  const params = useBuilderQuery(filter);
  const {
    getAllCategoryProduct,
    createCategoryProduct,
    deleteCategoryProduct,
    updateCategoryProduct,
  } = useQueryCategoryProduct(params);
  const { data: listCategoryProduct } = getAllCategoryProduct;

  const handleCreateCategoryProduct = (data: TCreateCategory) => {
    createCategoryProduct.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateCategoryProduct = (id: string, data: TCreateCategory) => {
    updateCategoryProduct.mutate(
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

  const handlePageChange = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleEditCategoryProduct = (category: TCategory) => {
    setIsOpenEditModal({ isOpen: true, category: category });
  };

  const showConfirmDelete = (title: string, desc: string, category: TCategory) => {
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
        deleteCategoryProduct.mutate(category.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSearchValue = (valueSearch: string) => {
    setFilter((pre) => {
      // Tạo appendQuery mới bằng cách map qua mảng cũ
      const newAppendQuery = pre.appendQuery?.map((item) => {
        // Nếu object có key là 'name' hoặc 'code'
        if ('name' in item) {
          return {
            name: {
              ...item.name,
              value: valueSearch,
            },
          };
        }
        if ('code' in item) {
          return {
            code: {
              ...item.code,
              value: valueSearch,
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

  const columns: ColumnsType<TCategory> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Mã danh mục',
      dataIndex: 'code',
      key: 'code',
      ellipsis: {
        showTitle: true,
      },
      render: (text) => (
        <span className="font-semibold text-blue-600 max-w-2xl block truncate">{text}</span>
      ),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: true,
      },
      render: (text) => (
        <span className="font-semibold text-blue-600 max-w-2xl block truncate">{text}</span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          {permissions.canUpdate() && (
            <Button
              color="gold"
              variant="solid"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => handleEditCategoryProduct(record)}
              className={'font-medium'}
            >
              Cập nhật
            </Button>
          )}
          {permissions.canDelete() && (
            <Button
              color="red"
              variant="solid"
              shape="round"
              icon={<DeleteOutlined />}
              onClick={() =>
                showConfirmDelete('Xóa danh mục', 'Bạn có muốn xóa danh mục sản phẩm này?', record)
              }
              className={'font-medium'}
            >
              Xoá
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <UnorderedListOutlined className="text-xl font-medium" />
            Danh sách danh mục sản phẩm
          </h2>
          {permissions.canCreate() && (
            <Button
              variant="solid"
              color="primary"
              onClick={() => handleOpenCreateModal()}
              className="rounded-2xl w-full sm:w-fit"
            >
              Thêm danh mục
            </Button>
          )}
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập tên hoặc mã danh mục"
            handleSearchValue={handleSearchValue}
          />
        </div>
      </div>

      <div>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          tableLayout={'auto'}
          scroll={{
            x: 'max-content',
          }}
          dataSource={listCategoryProduct?.data || []}
          loading={getAllCategoryProduct.isLoading}
          pagination={{
            total: listCategoryProduct?.totalPage,
            current: filter.toPaging?.page,
            pageSize: filter.toPaging?.pageSize,
            onChange: handlePageChange,
            showSizeChanger: true,
            position: ['bottomCenter'],
          }}
        />
      </div>

      <Modal
        title="Thêm danh mục sản phẩm"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <CreateCategoryProduct handleCreateCategoryProduct={handleCreateCategoryProduct} />
      </Modal>

      <Modal
        title="Cập nhật danh mục sản phẩm"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
      >
        {isOpenEditModal.category && (
          <EditCategoryProduct
            handleUpdateCategoryProduct={handleUpdateCategoryProduct}
            category={isOpenEditModal.category}
          />
        )}
      </Modal>
    </div>
  );
}
