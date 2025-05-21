import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { authStoreSelectors } from '@/Stores/userStore';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Image, Modal, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { TCreatePosition, TPosition } from '@/interface/TPosition';
import { useQueryPosition } from './Hook/useQueryPosition';
import EditPosition from './Components/EditPosition';
import CreatePosition from './Components/CreatePosition';
import SearchInput from '@/Components/SearchInput';

export default function PositionPage() {
  const role = authStoreSelectors.use.role();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    position?: TPosition;
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
      // {
      //   search: { value: '', queryOperator: '$fli' },
      // },
      {
        name: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$or',
        },
      },
    ],
  });

  const params = useBuilderQuery(filter);
  const { getAllPosition, createPosition, deletePosition, updatePosition } =
    useQueryPosition(params);
  const { data: listPosition } = getAllPosition;

  const handleCreatePosition = (data: TCreatePosition) => {
    createPosition.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdatePosition = (id: string, data: TCreatePosition) => {
    updatePosition.mutate(
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

  const handleEditPosition = (Position: TPosition) => {
    setIsOpenEditModal({ isOpen: true, position: Position });
  };

  const showConfirmNotify = (title: string, desc: string, position: TPosition) => {
    Modal.confirm({
      title: title,
      icon: <ExclamationCircleFilled style={{ fontSize: '22px', color: 'red' }} />,
      content: desc,
      okText: 'Xác nhân',
      okType: 'danger',
      cancelText: 'Huỷ',
      cancelButtonProps: { type: 'default' },
      autoFocusButton: 'cancel',

      onOk: async () => {
        deletePosition.mutate(position.id);
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

  const columns: ColumnsType<TPosition> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',

      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Tên chức vụ',
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
          <Button
            color="gold"
            variant="solid"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => handleEditPosition(record)}
            className={'font-medium'}
          >
            Cập nhật
          </Button>
          <Button
            color="red"
            variant="solid"
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() =>
              showConfirmNotify('Xóa chức vụ', 'Bạn có muốn xóa chức vụ này ?', record)
            }
            className={'font-medium'}
          >
            Xoá
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
        <div className="flex items-center justify-center flex-wrap gap-3">
          <h2 className=" flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty   uppercase text-primary">
            <UnorderedListOutlined className="text-xl font-medium" />
            Danh sách chức vụ
          </h2>
          <Button
            variant="solid"
            color="primary"
            onClick={() => handleOpenCreateModal()}
            className="rounded-2xl w-full sm:w-fit"
          >
            Thêm chức vụ
          </Button>
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput placeholder="Nhập tên chức vụ" handleSearchValue={handleSearchValue} />
        </div>
      </div>

      <div>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={listPosition?.data}
          tableLayout={'auto'}
          scroll={{ x: 700 }}
          className="rounded-md bg-white"
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            showSizeChanger: true,
            onChange: handlePageChange,
            total: listPosition?.totalRecords,
            current: filter.toPaging?.page,
            pageSize: filter.toPaging?.pageSize,
          }}
        />
      </div>

      <Modal
        title={<h4 className="font-bold text-2xl text-center uppercase ">TẠO chức vụ MỚI</h4>}
        className="w-11/12  md:w-1/2 xl:w-1/3"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
        // centered={true}
      >
        <CreatePosition handleCreatePosition={handleCreatePosition} />
      </Modal>

      <Modal
        title={<h4 className="font-bold text-2xl text-center ">SỬA chức vụ</h4>}
        className="w-11/12  md:w-1/2 xl:w-1/3"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        centered={true}
      >
        {isOpenEditModal.position && (
          <EditPosition
            handleUpdatePosition={handleUpdatePosition}
            position={isOpenEditModal.position}
          />
        )}
      </Modal>
    </div>
  );
}
