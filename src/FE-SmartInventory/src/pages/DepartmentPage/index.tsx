import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { authStoreSelectors } from '@/Stores/userStore';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import { TCreateDepartment, TDepartment } from '@/interface/TDepartment';
import { useQueryDepartment } from './Hook/useQueryDepartment';
import EditDepartment from './Components/EditDepartment';
import CreateDepartment from './Components/CreateDepartment';
import SearchInput from '@/Components/SearchInput';

export default function DepartmentPage() {

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    department?: TDepartment;
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
        deletedOn: {
          value: 'null',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const params = useBuilderQuery(filter);
  const { getAllDepartment, createDepartment, deleteDepartment, updateDepartment } =
    useQueryDepartment(params);
  const { data: listDepartment } = getAllDepartment;

  const handleCreateDepartment = (data: TCreateDepartment) => {
    createDepartment.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateDepartment = (id: string, data: TCreateDepartment) => {
    updateDepartment.mutate(
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

  const handleEditDepartment = (department: TDepartment) => {
    setIsOpenEditModal({ isOpen: true, department: department });
  };

  const showConfirmNotify = (title: string, desc: string, department: TDepartment) => {
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
        deleteDepartment.mutate(department.id);
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

  const columns: ColumnsType<TDepartment> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Mã phòng ban',
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
      title: 'Tên phòng ban',
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
            onClick={() => handleEditDepartment(record)}
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
              showConfirmNotify('Xóa phòng ban', 'Bạn có muốn xóa phòng ban này?', record)
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
          <h2 className="flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty uppercase text-primary">
            <UnorderedListOutlined className="text-xl font-medium" />
            Danh sách phòng ban
          </h2>
          <Button
            variant="solid"
            color="primary"
            onClick={() => handleOpenCreateModal()}
            className="rounded-2xl w-full sm:w-fit"
          >
            Thêm phòng ban
          </Button>
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập tên hoặc mã phòng ban"
            handleSearchValue={handleSearchValue}
          />
        </div>
      </div>

      <div>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={listDepartment?.data}
          tableLayout={'auto'}
          scroll={{ x: 700 }}
          className="rounded-md bg-white"
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            showSizeChanger: true,
            onChange: handlePageChange,
            total: listDepartment?.totalRecords,
            current: filter.toPaging?.page,
            pageSize: filter.toPaging?.pageSize,
          }}
        />
      </div>

      <Modal
        title={<h4 className="font-bold text-2xl text-center uppercase">TẠO PHÒNG BAN MỚI</h4>}
        className="w-11/12 md:w-1/2 xl:w-1/3"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
      >
        <CreateDepartment handleCreateDepartment={handleCreateDepartment} />
      </Modal>

      <Modal
        title={<h4 className="font-bold text-2xl text-center">SỬA PHÒNG BAN</h4>}
        className="w-11/12 md:w-1/2 xl:w-1/3"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        centered={true}
      >
        {isOpenEditModal.department && (
          <EditDepartment
            handleUpdateDepartment={handleUpdateDepartment}
            department={isOpenEditModal.department}
          />
        )}
      </Modal>
    </div>
  );
}
