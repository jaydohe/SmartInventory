import { useBuilderQuery } from '@/hook';
import { useQueryDetailDevice, useQueryDeviceType } from '@/hook/useQueryDeviceType';
import { useUploadFile } from '@/hook/useUploadFile';
import { TBuilderQuery } from '@/interface';
import { TCreateDeviceType, TDeviceType } from '@/interface/TDeviceType';
import { authStoreSelectors } from '@/Stores/userStore';
import { EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Image, Modal, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import CreateDeviceType from './Components/CreateDeviceType';
import EditDeviceType from './Components/EditDeviceType';

export default function DeviceType() {
  const role = authStoreSelectors.use.role();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<{
    isOpen: boolean;
    deviceType?: TDeviceType;
  }>({
    isOpen: false,
  });

  const { uploadFile } = useUploadFile();

  const [filter, setFilter] = useState<TBuilderQuery>({
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
  });

  const params = useBuilderQuery(filter);
  const { getAllDeviceType, createDeviceType, updateDeviceType } = useQueryDeviceType(params);
  const { data: listDeviceType } = getAllDeviceType;

  const handleCreateDeviceType = (data: TCreateDeviceType) => {
    createDeviceType.mutate(data, {
      onSuccess: () => {
        handleCloseCreateModal();
      },
    });
  };

  const handleUpdateDeviceType = (id: string, data: TCreateDeviceType) => {
    updateDeviceType.mutate(
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

  const handleEditDeviceType = (deviceType: TDeviceType) => {
    setIsOpenEditModal({ isOpen: true, deviceType: deviceType });
  };

  const columns: ColumnsType<TDeviceType> = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',

      render: (_, record, index) => <p>{index + 1}</p>,
    },
    {
      title: 'Tên loại thiết bị',
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
      title: 'Icon',
      dataIndex: 'iconPath',
      key: 'iconPath',
      align: 'center',
      width: '5%',
      render: (text) => <Image src={text} alt="icon" />,
    },
    {
      title: 'Gateway',
      dataIndex: 'isGateway',
      key: 'isGateway',
      align: 'center',

      render: (isGateway) => (
        <Tag color={isGateway ? 'green' : 'blue'} className="text-sm font-medium">
          {isGateway ? 'Z Master' : 'Z Inlamp'}
        </Tag>
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
            onClick={() => handleEditDeviceType(record)}
            className={'font-medium'}
          >
            Cập nhật
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 gap-4 flex-wrap  md:justify-start">
        <h2 className=" flex items-center gap-1 font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty   uppercase text-primary">
          <UnorderedListOutlined className="text-xl font-medium" />
          Danh sách Loại thiết bị
        </h2>
        {/* <Button
          variant="solid"
          color="primary"

          onClick={() => handleOpenCreateModal()}
          className="rounded-2xl w-full sm:w-fit"
        >
          Thêm loại thiết bị
        </Button> */}
      </div>

      <div>
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={listDeviceType?.data}
          tableLayout={'auto'}
          scroll={{ x: 700 }}
          className="rounded-md bg-white"
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            showSizeChanger: true,
            onChange: handlePageChange,
            total: listDeviceType?.totalRecords,
            current: filter.toPaging?.page,
            pageSize: filter.toPaging?.pageSize,
          }}
        />
      </div>

      <Modal
        title={<h4 className="font-bold text-2xl text-center ">TẠO LOẠI THIẾT BỊ MỚI</h4>}
        className="w-11/12  md:w-1/2 xl:w-1/3"
        open={isOpenCreateModal}
        onCancel={handleCloseCreateModal}
        footer={null}
        centered={true}
      >
        <CreateDeviceType handleCreateDeviceType={handleCreateDeviceType} />
      </Modal>

      <Modal
        title={<h4 className="font-bold text-2xl text-center ">SỬA LOẠI THIẾT BỊ</h4>}
        className="w-11/12  md:w-1/2 xl:w-1/3"
        open={isOpenEditModal.isOpen}
        onCancel={handleCloseEditModal}
        footer={null}
        centered={true}
      >
        {isOpenEditModal.deviceType && (
          <EditDeviceType
            handleUpdateDeviceType={handleUpdateDeviceType}
            deviceType={isOpenEditModal.deviceType}
          />
        )}
      </Modal>
    </div>
  );
}
