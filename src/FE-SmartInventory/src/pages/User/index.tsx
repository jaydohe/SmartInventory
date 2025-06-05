import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  FundOutlined,
  InfoCircleOutlined,
  LockFilled,
  PlusOutlined,
  SettingOutlined,
  ToolOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Typography,
  Modal,
  Popconfirm,
  Statistic,
  Row,
  Col,
  Card,
  Tabs,
  Tooltip,
  Drawer,
  Select,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { TCreateUser, TUser } from '@/interface/TUser';
import { ROLE, RoleEnum, RoleEnumString, roleName } from '@/Constant';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { useQueryUser } from './Hook/useQueryUser';
import CreateUser from './Components/CreateUser';
import RoleTag from './Components/RoleTag';
import UserInfo from './Components/UserInfo';
import StatisticCard from '@/Components/Statistic';
import { authStoreSelectors } from '@/Stores/userStore';
import { useQueryWarehouse } from '@/hook/useQueryWarehouse';
import { useQueryEmployee } from '../Employee/Hook/useEmployeePage';
import { useQueryDepartment } from '../DepartmentPage/Hook/useQueryDepartment';

import { usePermissions } from '@/hook/usePermissions';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function User() {
  const role = authStoreSelectors.use.role();
  const permissions = usePermissions('User');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [filter, setFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
  });

  const [filterEmployee, setFilterEmployee] = useState<TBuilderQuery>({
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

  const { getAllDepartment } = useQueryDepartment(useBuilderQuery(filterEmployee), {
    enabled: role === RoleEnumString.DEV,
  });

  const params = useBuilderQuery(filter);
  const { getAllUser, createUser, deleteUser } = useQueryUser(params);
  const { data: listUser } = getAllUser;
  const unitName = listUser?.data?.[0]?.warehouse?.name || 'N/A';

  const handleCreateUser = (data: TCreateUser) => {
    createUser.mutate(data, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  const handleDeleteUser = (id: string) => {
    deleteUser.mutate(id, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenDrawer = (id: string) => {
    setSelectedUserId(id);
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedUserId(null);
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

  const handleUnitChange = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      appendQuery: prev.appendQuery?.map((item) =>
        'wareId' in item
          ? {
              wareId: {
                ...item.wareId,
                value: value ?? '',
              },
            }
          : item
      ),
    }));
  };

  const commonColumns: ColumnsType<TUser> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      width: 10,
      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="font-semibold text-blue-600">{text}</span>,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'loginName',
      key: 'loginName',
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
      render: (text) => <RoleTag role={text} />,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isLogin',
      key: 'isLogin',
      render: (isLogin) => (
        <Tag
          className=" text-sm font-medium "
          color={isLogin ? 'green' : 'red'}
          icon={isLogin ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
        >
          {isLogin ? 'Hoạt động' : 'Bị khóa'}
        </Tag>
      ),
    },
  ];

  const actionColumn: ColumnsType<TUser> = [
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Cập nhật tài khoản">
            <Button
              color="gold"
              variant="solid"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => handleOpenDrawer(record.id)}
              className={'font-medium'}
            ></Button>
          </Tooltip>

          <Tooltip title="Xóa người dùng">
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa người dùng này không?"
              onConfirm={() => handleDeleteUser(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                color="danger"
                variant="solid"
                className="rounded-2xl"
                icon={<DeleteOutlined />}
              >
                Xóa
              </Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const columns: ColumnsType<TUser> =
    permissions.canDelete() || permissions.canUpdate()
      ? [...commonColumns, ...actionColumn]
      : commonColumns;

  const initialRoleCounts = ROLE.filter(
    (role) => role.name !== RoleEnumString.DEV && role.name !== RoleEnumString.ADMIN
  ).reduce((acc, role) => {
    acc[role.name] = 0;
    return acc;
  }, {} as { [key: string]: number });

  const roleCounts = listUser?.data?.reduce((accumulator, user) => {
    // Tăng giá trị của vai trò này lên 1
    if (accumulator[user.role] !== undefined) {
      accumulator[user.role] += 1;
    }
    // Trả về accumulator để tiếp tục cho lần lặp tiếp theo
    return accumulator;
  }, initialRoleCounts);

  const usersByRole: { [key: string]: TUser[] } =
    listUser?.data?.reduce((accumulator, user) => {
      // Nếu vai trò của người dùng chưa có trong accumulator, khởi tạo nó với một mảng rỗng
      if (!accumulator[user.role]) {
        accumulator[user.role] = [];
      }
      // Thêm người dùng vào mảng tương ứng với vai trò của họ
      accumulator[user.role].push(user);
      // Trả về accumulator để tiếp tục cho lần lặp tiếp theo
      return accumulator;
    }, {} as { [key in RoleEnumString]: TUser[] }) || {}; // Khởi tạo accumulator là một đối tượng rỗng

  return (
    <div className="px-4">
      <div className="flex items-center my-4 gap-4 flex-wrap justify-center md:justify-start">
        <Title level={2} className="mb-0 uppercase text-center text-pretty ">
          Quản lý Tài khoản
        </Title>
        {permissions.canCreate() && (
          <Button
            variant="solid"
            color="primary"
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal()}
            className="rounded-2xl w-full sm:w-fit"
          >
            <Text className=" font-semibold text-textWhite">Thêm tài khoản</Text>
          </Button>
        )}
        {role === RoleEnumString.ADMIN && (
          <div className="w-full md:w-1/5 flex gap-4 items-center ml-auto">
            <Select
              placeholder="Chọn đơn vị"
              onChange={handleUnitChange}
              className="w-full"
              virtual={false}
              allowClear
              onClear={() => handleUnitChange('')}
            >
              {getAllDepartment.data?.data.map((dept) => (
                <Select.Option key={dept.id} value={dept.id}>
                  {dept.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        )}
      </div>

      {role !== RoleEnumString.DEV && (
        <div className="w-full overflow-x-scroll md:overflow-hidden">
          <Row gutter={16} className="mb-5 flex min-w-max md:min-w-full">
            {roleCounts &&
              Object.keys(roleCounts).map((role) => (
                <Col span={8} key={role}>
                  <StatisticCard
                    title={roleName[role as RoleEnumString].toUpperCase()}
                    value={roleCounts[role]}
                  />
                </Col>
              ))}
          </Row>
        </div>
      )}

      <div>
        {role !== RoleEnumString.DEV && (
          <Tabs defaultActiveKey="all">
            <TabPane
              tab={<span className="font-semibold text-sm uppercase">Tất cả</span>}
              key="all"
            >
              <Table
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={listUser?.data}
                tableLayout={'auto'}
                scroll={{ x: 700 }}
                className="rounded-md bg-white"
                pagination={
                  role === RoleEnumString.ADMIN
                    ? false
                    : {
                        position: ['bottomCenter'],
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        onChange: handlePageChange,
                        total: listUser?.totalRecords,
                        current: filter.toPaging?.page,
                        pageSize: filter.toPaging?.pageSize,
                      }
                }
              />
            </TabPane>
            {Object.keys(usersByRole).map((role) => (
              <TabPane
                tab={
                  role === RoleEnumString.WAREHOUSE_STAFF ? (
                    <div className="text-sm font-semibold uppercase">
                      <FundOutlined className="mr-2" />
                      {roleName[role as RoleEnumString]}
                    </div>
                  ) : role === RoleEnumString.WAREHOUSE_PRODUCER ? (
                    <div className="text-sm font-semibold uppercase">
                      <EyeOutlined className="mr-2" />
                      {roleName[role as RoleEnumString]}
                    </div>
                  ) : role === RoleEnumString.SALESMAN ? (
                    <div className="text-sm font-semibold uppercase">
                      <SettingOutlined className="mr-2" />
                      {roleName[role as RoleEnumString]}
                    </div>
                  ) : (
                    roleName[role as RoleEnumString]
                  )
                }
                key={role}
              >
                <Table
                  rowKey={(record) => record.id}
                  columns={columns}
                  dataSource={usersByRole[role as RoleEnumString]}
                  tableLayout={'auto'}
                  scroll={{ x: 700 }}
                  className="rounded-md bg-white"
                  pagination={
                    role === RoleEnumString.ADMIN
                      ? false
                      : {
                          position: ['bottomCenter'],
                          defaultCurrent: 1,
                          showSizeChanger: true,
                          onChange: handlePageChange,
                          total: usersByRole[role as RoleEnumString]?.length,
                          current: filter.toPaging?.page,
                          pageSize: filter.toPaging?.pageSize,
                        }
                  }
                />
              </TabPane>
            ))}
          </Tabs>
        )}

        {role === RoleEnumString.DEV && (
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={listUser?.data}
            tableLayout={'auto'}
            scroll={{ x: 700 }}
            className="rounded-md bg-white"
            pagination={{
              position: ['bottomCenter'],
              defaultCurrent: 1,
              showSizeChanger: true,
              onChange: handlePageChange,
              total: listUser?.totalRecords,
              current: filter.toPaging?.page,
              pageSize: filter.toPaging?.pageSize,
            }}
          />
        )}
      </div>

      <Modal
        title={<h4 className="font-bold text-2xl text-center ">TẠO TÀI KHOẢN MỚI</h4>}
        className="w-11/12  md:w-1/2 xl:w-1/3"
        open={isOpenModal}
        onCancel={handleCloseModal}
        footer={null}
        centered={true}
      >
        <CreateUser handleCreateUser={handleCreateUser} />
      </Modal>

      <Drawer
        title="Thông tin người dùng"
        width={820}
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
      >
        {selectedUserId && (
          <UserInfo handleCloseDrawer={handleCloseDrawer} userId={selectedUserId} />
        )}
      </Drawer>
    </div>
  );
}
