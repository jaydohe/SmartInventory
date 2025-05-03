import {
  ArrowRightOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Card,
  Col,
  Progress,
  Row,
  Space,
  Tag,
  Typography,
  Upload,
  Button,
  Modal,
  InputNumber,
  Form,
} from 'antd';
import React, { useState } from 'react';
import { TScheme } from '@/interface/TScheme';
import { useQueryScheme } from '../../Scheme/Hook/useQueryScheme';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { QueryKeys, roleNumToStr } from '@/Constant';
import { divIcon } from 'leaflet';
import StatusTag from '@/pages/Scheme/Components/StatusTag';
import ViewListPrivateFile from '@/Components/ViewListPrivateFile';
import RoleTag from '@/pages/User/Components/RoleTag';

const { Title, Text } = Typography;

interface ReceivedSchemeDetail {
  data: TScheme;
  receivedUser: string;
}

const ReceivedSchemeDetail: React.FC<ReceivedSchemeDetail> = ({ data, receivedUser }) => {
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
  } = data;
  console.log('subFiles', subFiles);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newProgress, setNewProgress] = useState<number>(
    processes.find((process) => process.userId === receivedUser)?.completedPercent || 0
  );
  const queryClient = useQueryClient();

  const { updateProcess } = useQueryScheme('');

  const handleProgressChange = (value: number | null) => {
    if (value !== null) {
      setNewProgress(value);
    }
  };

  const handleUpdateProgress = () => {
    updateProcess.mutate(
      { id: schemeId, percent: newProgress },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_SCHEME], schemeId });
          setIsModalVisible(false);
          form.resetFields();
        },
      }
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    console.log('haha');

    setIsModalVisible(false);
  };

  return (
    <div className="flex gap-2 flex-col">
      {/* Thông tin kế hoạch */}
      <Card className="shadow-sm">
        {/* Header Section */}
        <div className="mb-6">
          <Row align="middle" justify="space-between" className="mb-4">
            <Col span={22}>
              <Space direction="vertical" className="w-full">
                <Title level={3} className="m-0">
                  {name}
                </Title>
                <Space align="center">
                  <Tag className="flex items-center gap-1" color="blue">
                    <UserOutlined className="font-semibold" />
                    <span className="text-sm">{user?.name || 'Không xác định'}</span>
                  </Tag>
                  {/* <Tag color="blue">{status}</Tag> */}
                  <StatusTag status={status} />
                </Space>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Date Info Section */}
        <div className="py-4 mb-6 border-y border-colorBgLayout">
          <Row gutter={[32, 16]}>
            <Col span={12}>
              <div className="space-y-1">
                <div className="text-gray-500 text-sm flex items-center">
                  <CalendarOutlined className="text-blue-500 mr-2" />
                  Ngày tạo
                </div>
                <div className="font-medium">
                  {new Date(createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
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
                    expireAt && new Date(expireAt) < new Date() ? 'text-red-500' : 'text-orange-500'
                  }`}
                >
                  {expireAt
                    ? new Date(expireAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Không có'}
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Typography.Title level={5} className="mb-0">
              Tiến độ công việc
            </Typography.Title>
          </div>
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
          <Row align="top" justify="space-between" className="mb-4">
            <Col span={4}>
              <Typography.Text type="secondary">Người đang xử lý</Typography.Text>
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
      {/* User Progress Section */}
      <Card className="shadow-sm mt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography.Title level={5} className="mb-0">
            Tiến độ của tôi
          </Typography.Title>
          <Button
            type="default"
            variant="outlined"
            onClick={showModal}
            className="mt-2"
            icon={<EditOutlined />}
            disabled={status == 2 || status == -1}
          >
            Cập nhật
          </Button>
        </div>
        <Progress
          percent={
            processes.find((process) => process.userId === receivedUser)?.completedPercent || 0
          }
          status={
            processes.find((process) => process.userId === receivedUser)?.completedPercent === 100
              ? 'success'
              : 'active'
          }
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />
      </Card>

      {/* Modal for updating progress */}
      <Modal
        title={
          <div className="w-full flex item-center justify-center">
            <Title level={4} className="uppercase text-primary">
              Cập nhật tiến độ
            </Title>
          </div>
        }
        open={isModalVisible}
        onOk={handleUpdateProgress}
        onCancel={handleCancel}
        okText="Cập nhật"
        centered
        footer={false}
      >
        <Form layout="vertical">
          <div className="flex justify-around items-center gap-4 flex-wrap sm:flex-nowrap">
            <div className="bg-colorBgLayout w-full h-20 rounded-xl flex items-center justify-center flex-col gap-1 text-[#6c6c6c]">
              <p className="text-base font-semibold uppercase">Hiện tại</p>
              <p className="text-base font-medium">
                {processes.find((process) => process.userId === receivedUser)?.completedPercent ||
                  0}
                %
              </p>
            </div>

            <ArrowRightOutlined className="text-2xl font-semibold text-primary" />
            <div className="bg-primaryColorHover w-full h-20 rounded-xl flex items-center justify-center flex-col gap-1 text-textWhite">
              <p className="text-base font-semibold uppercase">Tiến độ mới </p>
              <InputNumber
                min={0}
                max={100}
                value={newProgress}
                onChange={handleProgressChange}
                className="text-white bg-gray-800"
              />
            </div>
          </div>
          <div className="my-4">
            <Progress
              percent={
                processes.find((process) => process.userId === receivedUser)?.completedPercent || 0
              }
            />
          </div>
        </Form>
        <div className="w-full flex items-center justify-center">
          <Button
            onClick={handleUpdateProgress}
            variant="solid"
            color="primary"
            className="rounded-xl text-base font-semibold w-full"
          >
            Cập nhật
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReceivedSchemeDetail;
