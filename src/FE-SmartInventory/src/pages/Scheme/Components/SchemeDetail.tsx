import { QueryKeys, roleNumToStr, SchemeStatus, SchemeStatusList } from '@/Constant';
import { authStoreSelectors } from '@/Stores/userStore';
import { useBuilderQuery } from '@/hook/useBuilderQuery';
import { TBuilderQuery } from '@/interface/TBuilderQuery';
import { TScheme } from '@/interface/TScheme';
import { useQueryUser } from '@/pages/User/Hook/useQueryUser';
import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
  UserDeleteOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Flex,
  Form,
  Modal,
  Progress,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import React, { useMemo, useState } from 'react';
import { useQueryScheme } from '../Hook/useQueryScheme';
import AssignUsers from './AssignUsers';
import EditScheme from './EditScheme';
import StatusTag from './StatusTag';
import ViewListFile from '@/Components/ViewListFile';
import ViewListPrivateFile from '@/Components/ViewListPrivateFile';
import { BiSolidEdit } from 'react-icons/bi';
import moment from 'moment';
import RoleTag from '@/pages/User/Components/RoleTag';

const { Title, Link, Text } = Typography;
const { Item } = Descriptions;

interface SchemeDetailProps {
  data: TScheme;
}

const SchemeDetail: React.FC<SchemeDetailProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [form] = Form.useForm();
  const id = authStoreSelectors.use.userId();
  const [filter, setFilter] = useState<TBuilderQuery>({
    appendQuery: [
      {
        userId: {
          value: id || '',
          queryOperator: '$eq',
          queryOperatorParent: '$or',
        },
      },
    ],
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['processes.user.name', 'user.name'],
  });

  const params = useBuilderQuery(filter);
  const { updateScheme, assignUser, unassignUser } = useQueryScheme(params);

  const { getAllUser } = useQueryUser(
    useBuilderQuery({
      isAsc: false,
      toPaging: {
        page: 1,
        pageSize: 10,
      },
      toJoin: ['unit.*'],
    })
  );

  const users = getAllUser.data?.data || [];

  const {
    name,
    user,
    status,
    expireAt,
    createdAt,
    completedPercent,
    processes,
    filePath,
    subFiles,
    id: schemeId,
    userId: currentUser,
  } = data;

  const handleEdit = () => {
    form.setFieldsValue({
      name,
      expireAt,
    });
    setIsEditModalVisible(true);
  };

  const handleStatusChange = (newStatus: SchemeStatus) => {
    updateScheme.mutate(
      {
        id: schemeId,
        data: {
          ...data,
          status: newStatus,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_SCHEME, schemeId] });
        },
      }
    );
  };

  const handleEditSubmit = (values: any) => {
    updateScheme.mutate(
      { id: schemeId, data: values },
      {
        onSuccess: () => {
          setIsEditModalVisible(false);
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_SCHEME, schemeId] });
        },
      }
    );
  };

  const handleAssignUser = () => {
    assignUser.mutate(
      { id: schemeId, userIds: selectedUsers },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_SCHEME, schemeId] });
          setSelectedUsers([]);
        },
      }
    );
  };

  const handleUnassignUser = (userId: string) => {
    console.log(userId);
    unassignUser.mutate(
      { id: schemeId, userIds: [userId] },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_SCHEME, schemeId] });
        },
      }
    );
  };
  const processColumns = useMemo(
    () => [
      {
        title: 'Người thực hiện',
        dataIndex: 'user',
        key: 'user',
        render: (user: any) => <span>{user.name}</span>,
      },
      {
        title: 'Ngày bắt đầu',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm'),
      },
      {
        title: 'Ngày cập nhật',
        dataIndex: 'modifiedOn',
        key: 'modifiedOn',
        render: (date: string) =>
          date ? (
            <Text type="secondary">{moment(date).format('DD/MM/YYYY HH:mm')}</Text>
          ) : (
            'Chưa cập nhật'
          ),
      },
      {
        title: 'Tiến độ',
        dataIndex: 'completedPercent',
        key: 'completedPercent',
        render: (percent: number) => <Progress percent={percent} size="small" type="circle" />,
      },
      {
        key: 'action',
        render: (record: any) => (
          <Tooltip title="Thu hồi">
            <Button
              danger
              shape="circle"
              icon={<UserDeleteOutlined />}
              onClick={() => handleUnassignUser(record.userId)}
            />
          </Tooltip>
        ),
      },
    ],
    []
  );

  const handleStatusModal = () => {
    setIsStatusModalVisible(true);
  };

  return (
    <div className="flex gap-2 flex-col">
      {/* Thông tin kế hoạch */}
      <Card
        className="mb-4"
        actions={
          currentUser === id
            ? [
                <Flex
                  justify="center"
                  align="center"
                  gap="small"
                  className="text-base font-semibold text-successColorHover1 "
                  onClick={handleEdit}
                >
                  <EditOutlined size={20} className=" font-medium " /> Chỉnh sửa
                </Flex>,
                <Flex
                  justify="center"
                  align="center"
                  gap="small"
                  className="text-base font-semibold text-primary"
                  onClick={handleStatusModal}
                >
                  <BiSolidEdit size={20} className=" font-medium " /> Trạng thái
                </Flex>,
              ]
            : []
        }
      >
        {/* Header Section */}
        <div>
          <Row align="middle" justify="space-between" className="mb-3">
            <Col span={24}>
              <Space direction="vertical" className="w-full">
                <Title level={3} className="m-0">
                  {name}
                </Title>
              </Space>
            </Col>

            <div className="w-full items-center gap-2 flex mt-2">
              {user.name && user.role && (
                <RoleTag role={roleNumToStr[user?.role]} userName={user?.name} />
              )}

              <StatusTag status={status} />
            </div>
          </Row>
        </div>

        {/* Date Info Section */}
        <div className="py-4 mb-4 border-y border-colorBgLayout">
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <div className="space-y-1">
                <div className="text-gray-500 text-sm flex items-center">
                  <CalendarOutlined className="text-blue-500 mr-2" />
                  Ngày tạo
                </div>
                <div className="font-medium">{moment(createdAt).format('DD MMMM YYYY HH:mm')}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="space-y-1">
                <div className="text-gray-500 text-sm flex items-center">
                  <ClockCircleOutlined className="text-orange-500 mr-2" />
                  Hạn hoàn thành
                </div>
                <div
                  className={`font-medium ${
                    expireAt && moment(expireAt).isBefore(moment())
                      ? 'text-red-500'
                      : 'text-orange-500'
                  }`}
                >
                  {expireAt ? moment(expireAt).format('DD MMMM YYYY HH:mm') : 'Không có'}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <Typography.Title level={5} className="mb-2">
            Tiến độ công việc
          </Typography.Title>
          <Progress
            percent={completedPercent}
            status={completedPercent === 100 ? 'success' : 'active'}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>

        {/* Info Section */}
        <div className=" rounded-lg space-y-4">
          <Row align="top" justify="space-between" className="mb-3">
            <Col span={4}>
              <Typography.Text className="font-medium">Người đang xử lý</Typography.Text>
            </Col>
            <Col span={20}>
              {processes.map((process) => (
                <RoleTag
                  className="mr-2"
                  role={roleNumToStr[process.user.role]}
                  userName={process.user.name}
                />
              ))}
            </Col>
          </Row>

          <div className="flex items-center gap-4 border-t  pt-3  border-colorBgLayout">
            {filePath && (
              <div className="space-y-2   w-full">
                <Typography.Text className="font-medium">Tài liệu chính</Typography.Text>
                <ViewListPrivateFile
                  arrayFile={[
                    {
                      id: filePath,
                      url: filePath,
                      fileName: filePath,
                    },
                  ]}
                ></ViewListPrivateFile>
              </div>
            )}

            {subFiles && subFiles.length > 0 && (
              <div className="space-y-2   w-full">
                <Typography.Text className="font-medium">Tài liệu đính kèm</Typography.Text>
                <ViewListPrivateFile
                  arrayFile={[
                    {
                      id: subFiles[0].id,
                      url: subFiles[0].filePath,
                      fileName: subFiles[0].fileName,
                    },
                  ]}
                ></ViewListPrivateFile>
              </div>
            )}
          </div>
        </div>
      </Card>
      {currentUser === id && (
        <AssignUsers
          users={users}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          handleAssignUser={handleAssignUser}
          processes={processes}
          processColumns={processColumns}
        />
      )}
      <Modal
        maskClosable={false}
        centered
        title={
          <h4 className="font-bold text-2xl px-5 mb-3 text-primary text-center uppercase">
            Cập nhật trạng thái
          </h4>
        }
        open={isStatusModalVisible}
        onCancel={() => setIsStatusModalVisible(false)}
        footer={null}
        className="w-11/12 md:w-1/2 xl:w-1/3"
      >
        <div className="flex justify-around items-center gap-4 flex-wrap sm:flex-nowrap">
          <div className="bg-colorBgLayout w-full h-20 rounded-xl flex items-center justify-center flex-col gap-1 text-[#6c6c6c]">
            <p className="text-base font-semibold uppercase">Trạng thái hiện tại</p>
            <p className="text-base font-medium">
              <StatusTag status={status} />
            </p>
          </div>

          <ArrowRightOutlined className="text-2xl font-semibold text-primary" />

          <div className="bg-primaryColorHover w-full h-20 rounded-xl flex items-center justify-center flex-col gap-1 text-textWhite">
            <p className="text-base font-semibold uppercase">Trạng thái mới</p>
            <Select
              value={status}
              onChange={(value) => {
                handleStatusChange(value);
                setIsStatusModalVisible(false);
              }}
              variant="borderless"
              className="w-fit"
            >
              {SchemeStatusList.filter((item) =>
                status === SchemeStatus.CREATED ? item : item.id !== SchemeStatus.CREATED
              ).map((itemStatus) => (
                <Select.Option value={itemStatus.id}>
                  <StatusTag status={itemStatus.id} />
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </Modal>

      {/* Modal chỉnh sửa kế hoạch */}
      <Modal
        maskClosable={false}
        // centered
        title={<h4 className="font-bold text-primary ">Chỉnh sửa kế hoạch</h4>}
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => form.submit()}
        footer={false}
        className="w-11/12  md:w-2/3 xl:w-1/2"
      >
        <EditScheme handleEditScheme={handleEditSubmit} schemeData={data} />
      </Modal>
    </div>
  );
};

export default SchemeDetail;
