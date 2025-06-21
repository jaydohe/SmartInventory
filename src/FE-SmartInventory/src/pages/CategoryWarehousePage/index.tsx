import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, Table, Typography, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { TCreateCategory, TCategory } from '@/interface/TCategory';
import { useQueryCategoryWarehouse } from './Hook/useQueryCategoryWarehouse';
import EditCategoryWarehouse from './Components/EditCategoryWarehouse';
import CreateCategoryWarehouse from './Components/CreateCategoryWarehouse';
import SearchInput from '@/Components/SearchInput';

export default function CategoryWarehousePage() {
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
    getAllCategoryWarehouse,
    createCategoryWarehouse,
    deleteCategoryWarehouse,
    updateCategoryWarehouse,
  } = useQueryCategoryWarehouse(params);
  const { data: listCategoryWarehouse } = getAllCategoryWarehouse;

  const handleCreateCategoryWarehouse = (data: TCreateCategory) => {
    createCategoryWarehouse.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateCategoryWarehouse = (id: string, data: TCreateCategory) => {
    updateCategoryWarehouse.mutate(
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

  const handleEditCategoryWarehouse = (category: TCategory) => {
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
        deleteCategoryWarehouse.mutate(category.id);
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
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Cập nhật danh mục kho">
            <Button
              color="gold"
              variant="solid"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => handleEditCategoryWarehouse(record)}
              className={'font-medium'}
            ></Button>
          </Tooltip>
          <Tooltip title="Xoá danh mục kho">
            <Button
              color="red"
              variant="solid"
              shape="round"
              icon={<DeleteOutlined />}
              onClick={() =>
                showConfirmDelete('Xóa danh mục', 'Bạn có muốn xóa danh mục kho này?', record)
              }
              className={'font-medium'}
            ></Button>
          </Tooltip>
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
            Danh sách danh mục kho
          </h2>
          <Button
            variant="solid"
            color="primary"
            onClick={() => handleOpenCreateModal()}
            className="rounded-2xl w-full sm:w-fit"
          >
            Thêm danh mục
          </Button>
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
          dataSource={listCategoryWarehouse?.data || []}
          loading={getAllCategoryWarehouse.isLoading}
          pagination={{
            total: listCategoryWarehouse?.totalPage,
            current: filter.toPaging?.page,
            pageSize: filter.toPaging?.pageSize,
            onChange: handlePageChange,
            showSizeChanger: true,
            position: ['bottomCenter'],
          }}
        />
      </div>

      <Modal
        title="Thêm danh mục kho"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <CreateCategoryWarehouse handleCreateCategoryWarehouse={handleCreateCategoryWarehouse} />
      </Modal>

      <Modal
        title="Cập nhật danh mục kho"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
      >
        {isOpenEditModal.category && (
          <EditCategoryWarehouse
            handleUpdateCategoryWarehouse={handleUpdateCategoryWarehouse}
            category={isOpenEditModal.category}
          />
        )}
      </Modal>
    </div>
  );
}
