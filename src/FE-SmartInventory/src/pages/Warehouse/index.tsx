import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ExclamationCircleFilled,
  HomeOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { TCreateWarehouse, TWarehouse } from '@/interface/TWarehouse';
import { useQueryWarehousePage } from './Hook/useQueryWarehouse';
import EditWarehouse from './Components/EditWarehouse';
import CreateWarehouse from './Components/CreateWarehouse';
import DetailWarehouse from './Components/DetailWarehouse';
import SearchInput from '@/Components/SearchInput';

export default function WarehousePage() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    warehouse?: TWarehouse;
  }>({
    isOpen: false,
  });
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<{
    isOpen: boolean;
    warehouseId?: string;
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
      {
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
    toJoin: ['category.*'],
  });

  const params = useBuilderQuery(filter);
  const { getAllWarehouse, createWarehouse, deleteWarehouse, updateWarehouse } =
    useQueryWarehousePage(params);
  const { data: listWarehouse, isLoading } = getAllWarehouse;

  const handleCreateWarehouse = (data: TCreateWarehouse) => {
    createWarehouse.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateWarehouse = (id: string, data: TCreateWarehouse) => {
    updateWarehouse.mutate(
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

  const handleCloseDetailModal = () => {
    setIsOpenDetailModal({ isOpen: false });
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

  const handleEditWarehouse = (warehouse: TWarehouse) => {
    setIsOpenEditModal({ isOpen: true, warehouse: warehouse });
  };

  const handleViewDetail = (warehouseId: string) => {
    setIsOpenDetailModal({ isOpen: true, warehouseId: warehouseId });
  };

  const showConfirmDelete = (title: string, desc: string, warehouse: TWarehouse) => {
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
        deleteWarehouse.mutate(warehouse.id);
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
        // Nếu object có key là 'name'
        if ('name' in item) {
          return {
            name: {
              ...item.name,
              value: valueSearch,
            },
          };
        }
        // Nếu object có key là 'code'
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

  const columns: ColumnsType<TWarehouse> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Mã kho',
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
      title: 'Tên kho',
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
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: 'Sức chứa',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity) => <span>{capacity.toLocaleString()} m3</span>,
    },
    {
      title: 'Loại kho',
      dataIndex: 'warehouseId',
      key: 'warehouseType',
      render: (warehouseId) =>
        warehouseId ? <Tag color="blue">Kho con</Tag> : <Tag color="green">Kho cha</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 250,
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="cyan"
            variant="solid"
            shape="round"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record.id)}
            className={'font-medium'}
          >
            {/* Chi tiết */}
          </Button>
          <Button
            color="gold"
            variant="solid"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => handleEditWarehouse(record)}
            className={'font-medium'}
          >
            {/* Cập nhật */}
          </Button>
          <Button
            color="red"
            variant="solid"
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => showConfirmDelete('Xóa kho', 'Bạn có muốn xóa kho này?', record)}
            className={'font-medium'}
          >
            {/* Xoá */}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <HomeOutlined className="text-xl font-medium" />
            Danh sách kho
          </h2>
          <Button
            variant="solid"
            color="primary"
            onClick={() => handleOpenCreateModal()}
            className="rounded-2xl w-full sm:w-fit"
          >
            Thêm kho
          </Button>
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput placeholder="Nhập tên hoặc mã kho" handleSearchValue={handleSearchValue} />
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
          dataSource={listWarehouse?.data || []}
          loading={isLoading}
          pagination={{
            total: listWarehouse?.totalPage,
            current: filter.toPaging?.page,
            pageSize: filter.toPaging?.pageSize,
            onChange: handlePageChange,
            showSizeChanger: true,
            position: ['bottomCenter'],
          }}
        />
      </div>

      <Modal
        title="Thêm kho mới"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <CreateWarehouse handleCreateWarehouse={handleCreateWarehouse} />
      </Modal>

      <Modal
        title="Cập nhật thông tin kho"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
      >
        {isOpenEditModal.warehouse && (
          <EditWarehouse
            handleUpdateWarehouse={handleUpdateWarehouse}
            warehouse={isOpenEditModal.warehouse}
          />
        )}
      </Modal>

      <Modal
        title="Chi tiết kho"
        open={isOpenDetailModal.isOpen}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="close" onClick={handleCloseDetailModal}>
            Đóng
          </Button>,
        ]}
        width={700}
      >
        {isOpenDetailModal.warehouseId && (
          <DetailWarehouse warehouseId={isOpenDetailModal.warehouseId} />
        )}
      </Modal>
    </div>
  );
}
