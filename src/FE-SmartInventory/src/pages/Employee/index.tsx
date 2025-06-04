import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';

import { TCreateEmployee, TEmployee, TUpdateEmployee } from '@/interface/TEmployee';
import { useQueryEmployee } from './Hook/useEmployeePage';
import EditEmployee from './Components/EditEmployee';
import CreateEmployee from './Components/CreateEmployee';
import SearchInput from '@/Components/SearchInput';
import { GenderTypes, genGenderTypes } from '@/Constant/EmployeeTypes';
import dayjs from 'dayjs';
import { usePermissions } from '@/hooks/usePermissions';

// Giả lập danh sách phòng ban, chức vụ và kho
// Trong thực tế, bạn cần lấy từ API
const mockDepartments = [
  { id: '1', name: 'Phòng nhân sự' },
  { id: '2', name: 'Phòng kế toán' },
  { id: '3', name: 'Phòng kỹ thuật' },
];

const mockPositions = [
  { id: '1', name: 'Giám đốc' },
  { id: '2', name: 'Trưởng phòng' },
  { id: '3', name: 'Nhân viên' },
];

const mockWarehouses = [
  { id: '1', name: 'Kho Hà Nội' },
  { id: '2', name: 'Kho Hồ Chí Minh' },
  { id: '3', name: 'Kho Đà Nẵng' },
];

export default function EmployeePage() {
  const permissions = usePermissions('Employee');

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    employee?: TEmployee;
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
    toJoin: ['department.*', 'position.*', 'warehouse.*'],
  });

  const params = useBuilderQuery(filter);
  const { getAllEmployee, createEmployee, deleteEmployee, updateEmployee } =
    useQueryEmployee(params);
  const { data: listEmployee, isLoading } = getAllEmployee;

  const handleCreateEmployee = (data: TCreateEmployee) => {
    createEmployee.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateEmployee = (id: string, data: TUpdateEmployee) => {
    updateEmployee.mutate(
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

  const handleEditEmployee = (employee: TEmployee) => {
    setIsOpenEditModal({ isOpen: true, employee: employee });
  };

  const showConfirmNotify = (title: string, desc: string, employee: TEmployee) => {
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
        deleteEmployee.mutate(employee.id);
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

  const columns: ColumnsType<TEmployee> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 80,
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Mã nhân viên',
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
      title: 'Tên nhân viên',
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
      title: 'Giới tính',
      dataIndex: 'genderType',
      key: 'genderType',
      render: (gender: GenderTypes) => <span>{genGenderTypes[gender]}</span>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: {
        showTitle: true,
      },
    },

    {
      title: 'Vai trò',
      dataIndex: 'isManager',
      key: 'isManager',
      render: (isManager) =>
        isManager ? <Tag color="green">Quản lý</Tag> : <Tag color="blue">Nhân viên</Tag>,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position.name',
      key: 'position',
      render: (_, record) => <span>{record.position?.name}</span>,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department.name',
      key: 'department',
      render: (_, record) => <span>{record.department?.name}</span>,
    },

    {
      title: 'Ngày vào làm',
      dataIndex: 'dateHired',
      key: 'dateHired',
      render: (date) => <span>{dayjs(date).format('DD/MM/YYYY')}</span>,
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
              onClick={() => handleEditEmployee(record)}
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
                showConfirmNotify('Xóa nhân viên', 'Bạn có muốn xóa nhân viên này?', record)
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
            <UserOutlined className="text-xl font-medium" />
            Danh sách nhân viên
          </h2>
          {permissions.canCreate() && (
            <Button
              variant="solid"
              color="primary"
              onClick={() => handleOpenCreateModal()}
              className="rounded-2xl w-full sm:w-fit"
            >
              Thêm nhân viên
            </Button>
          )}
        </div>

        <div className="w-full sm:w-1/3 justify-end">
          <SearchInput
            placeholder="Nhập tên hoặc mã nhân viên"
            handleSearchValue={handleSearchValue}
          />
        </div>
      </div>

      <div>
        <Table
          rowKey={(record) => record.id}
          tableLayout={'auto'}
          scroll={{
            x: 'max-content',
          }}
          columns={columns}
          dataSource={listEmployee?.data || []}
          loading={isLoading}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            showSizeChanger: true,
            current: filter.toPaging?.page,
            pageSize: filter.toPaging?.pageSize,
            total: listEmployee?.totalRecords,
            onChange: handlePageChange,
          }}
        />
      </div>

      <Modal
        title={<Typography.Title level={4}>Thêm nhân viên mới</Typography.Title>}
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
        width={700}
      >
        <CreateEmployee handleCreateEmployee={handleCreateEmployee} />
      </Modal>

      <Modal
        title={<Typography.Title level={4}>Cập nhật thông tin nhân viên</Typography.Title>}
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        width={700}
      >
        {isOpenEditModal.employee && (
          <EditEmployee
            handleUpdateEmployee={handleUpdateEmployee}
            employee={isOpenEditModal.employee}
          />
        )}
      </Modal>
    </div>
  );
}
