import DrawerComponents from '@/Components/Drawer/index';
import SearchInput from '@/Components/SearchInput';
import {
  DeviceStateEnum,
  DeviceStateToStr,
  DeviceStatusEnum,
  DeviceStatusStr,
} from '@/Constant/DeviceEnum';
import { useBuilderQuery } from '@/hook';
import { useQueryDevice } from '@/hook/useQueryDevice';
import { TBuilderQuery } from '@/interface';
import { TDevice, TUpdateDevice } from '@/interface/TDevice';
import { TDeviceType } from '@/interface/TDeviceType';
import { authStoreSelectors } from '@/Stores/userStore';
import { useWindowSize } from '@/utils/useWindowSize';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  MinusCircleOutlined,
  QuestionCircleFilled,
  RightOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, DatePicker, Divider, Modal, Space, Table, Tag } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import moment from 'moment';
import { useState } from 'react';
import { GiStreetLight } from 'react-icons/gi';
import { LiaCcMastercard } from 'react-icons/lia';
import DetailDevice from './DetailDevice';
import EditDetailDevice from './EditDetailDevice';

const { RangePicker } = DatePicker;
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf('day');
};
export interface IMyComDeviceListProps {
  device: TDevice;
}

export default function ComDeviceList({ device }: IMyComDeviceListProps) {
  const userId = authStoreSelectors.use.userId() ?? '';
  const unitId = authStoreSelectors.use.unitId() ?? '';
  const [isOpenDevice, setIsOpenDevice] = useState<{
    isOpen: boolean;
    type: 'DETAIL' | 'EDIT' | 'DELETE';
    detailDevice?: TDevice;
  }>({
    isOpen: false,
    type: 'DETAIL',
  });
  console.log('ComDeviceList', device.deviceId);
  const { isMobile } = useWindowSize();
  const [filterDevice, setFilterDevice] = useState<TBuilderQuery>({
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    isAsc: false,
    orderBy: 'createdAt',
    toJoin: ['province.*', 'district.*', 'ward.*', 'devicetype.*'],
    appendQuery: [
      {
        name: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$and',
        },
      },
      {
        status: {
          value: `${DeviceStatusEnum.DELETE}`,
          queryOperator: '$neq',
          queryOperatorParent: '$and',
        },
      },
      {
        unitId: {
          value: unitId,
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
      {
        deviceId: {
          value: device.id ? device.id : '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const { getAllDevice, updateDevice, deleteDevice } = useQueryDevice(
    useBuilderQuery(filterDevice)
  );
  const { data: devices } = getAllDevice;

  const handleSearchValue = (valueSearch: string) => {
    setFilterDevice((pre) => {
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

  const columns: ColumnsType<TDevice> = [
    {
      title: `STT`,
      // fixed: 'left',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      render: (_, record, index) => <p className="font-medium text-center">{index + 1}</p>,
    },

    {
      title: `Tên thiết bị`,
      dataIndex: 'name',
      className: 'break-words	 truncate ',
      key: 'name',
      ellipsis: true,
      render: (_, record) => (
        <p className="font-medium cursor-pointer truncate w-full  ">
          {record.iconPath && <Avatar size={'small'} className="mr-1" src={record.iconPath} />}
          <span>
            {record.name} (#{record.code})
          </span>
        </p>
      ),
    },
    // {
    //   title: `MAC`,
    //   dataIndex: 'code',
    //   className: 'break-words	 truncate ',
    //   key: 'code',

    //   render: (text) => (
    //     <p className="font-medium cursor-pointer	text-ellipsis  overflow-hidden w-full text-pretty">
    //       {text}
    //     </p>
    //   ),
    // },

    {
      title: `Toạ độ`,
      dataIndex: 'device',
      className: 'break-words	 truncate ',
      key: 'device',
      render: (_, record) => (
        <p className="text-pretty">
          {record.latitude}, {record.longitude}
        </p>
      ),
    },

    {
      title: `Thời gian tạo`,
      dataIndex: 'createdAt',
      className: 'break-words	 truncate',
      key: 'createdAt',
      ellipsis: true,
      width: '16%',
      render: (text) => <p className="truncate">{moment(text).format('DD/MM/YYYY HH:mm')}</p>,
    },
    {
      width: '15%',
      title: `Tình trạng`,
      dataIndex: 'state',
      className: 'break-words	 truncate',
      key: 'state',

      render: (_, record) => (
        <Tag
          className=" mx-0 text-sm font-medium"
          color={DeviceStateToStr[record.state].color}
          icon={
            record.state === DeviceStateEnum.NORMAL ? (
              <CheckCircleOutlined />
            ) : record.state === DeviceStateEnum.ERROR ? (
              <WarningOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
        >
          {DeviceStateToStr[record.state].name}
        </Tag>
      ),
    },
    {
      width: '15%',
      title: `Trạng thái`,
      dataIndex: 'status',
      className: 'break-words	 truncate',
      key: 'status',

      render: (_, record) => (
        <Tag
          className=" mx-0 text-sm font-medium"
          color={DeviceStatusStr[record.status].color}
          icon={
            record.status === DeviceStatusEnum.ACTIVE ? (
              <CheckCircleOutlined />
            ) : record.status === DeviceStatusEnum.INACTIVE ? (
              <MinusCircleOutlined />
            ) : (
              <CloseCircleOutlined />
            )
          }
        >
          {DeviceStatusStr[record.status].name}
        </Tag>
      ),
    },
    // {
    //   width: '10%',
    //   title: `Hình ảnh`,
    //   dataIndex: 'imagePath',
    //   className: 'break-words	 truncate',
    //   key: 'imagePath',

    //   render: (text) => <Image className="rounded m-auto " src={text} />,
    // },
    {
      title: `Thao tác`,
      key: 'action',
      // fixed: 'right',
      width: isMobile ? '16%' : '',
      render: (_, record) => (
        <Space wrap>
          <Avatar
            className="cursor-pointer	"
            style={{ backgroundColor: '#e6f4ff', color: '#4096ff' }}
            icon={<EyeOutlined />}
            onClick={() => {
              setIsOpenDevice({
                isOpen: true,
                type: 'DETAIL',
                detailDevice: record,
              });
            }}
          />

          <Avatar
            className="cursor-pointer	"
            style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
            icon={<EditOutlined />}
            onClick={() => {
              setIsOpenDevice({
                isOpen: true,
                type: 'EDIT',
                detailDevice: record,
              });
            }}
          />

          <Avatar
            className="cursor-pointer	"
            style={{ backgroundColor: '#ffccc7', color: '#ff4d4f' }}
            icon={<DeleteOutlined />}
            onClick={() => {
              setIsOpenDevice({
                isOpen: true,
                type: 'DELETE',
                detailDevice: record,
              });
            }}
          />
        </Space>
      ),
    },
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setFilterDevice({
      ...filterDevice,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };
  const handleClose = () => {
    setIsOpenDevice({ isOpen: false, type: 'DETAIL' });
  };

  const handleUpdateDevice = async (data: TUpdateDevice) => {
    updateDevice.mutate(data, {
      onSuccess: (data) => {
        handleClose();
      },
    });
  };

  const handleDeleteDevice = async () => {
    if (isOpenDevice.detailDevice) {
      deleteDevice.mutate(isOpenDevice.detailDevice.id, {
        onSuccess: (data) => {
          handleClose();
        },
      });
    }
  };

  return (
    <div className=" h-full ">
      <div className={`flex items-center justify-between  flex-wrap  gap-4 my-4`}>
        <div className="min-w-fit flex justify-center  items-center gap-3">
          <h2 className="font-semibold text-xl md:text-xl   text-inherit text-pretty  text-center uppercase">
            <UnorderedListOutlined className="text-xl" /> Danh sách Z-Inlamp thuộc
            <span className={'text-primary'}>
              {' '}
              {device.deviceType?.name} {device.name}
            </span>
          </h2>
        </div>

        <div className="min-w-full md:min-w-fit  flex items-center justify-end gap-3 md:gap-5 flex-wrap md:flex-nowrap">
          <div className=" sm:min-w-96 w-full lg:w-1/3">
            <SearchInput placeholder="Nhập tên thiết bị" handleSearchValue={handleSearchValue} />
          </div>
        </div>
      </div>

      {devices?.data && (
        <Table
          columns={columns}
          // size="small"
          dataSource={devices?.data}
          tableLayout={'fixed'}
          // loading
          scroll={{ x: 960 }}
          rowKey={(record) => record.id}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            showSizeChanger: true,
            onChange: handlePageChange,
            total: devices?.totalRecords,
            current: filterDevice.toPaging?.page,
            pageSize: filterDevice.toPaging?.pageSize,
          }}
        />
      )}

      <DrawerComponents
        // paddingTop={true}
        title={isOpenDevice.type === 'DETAIL' ? ` Chi tiết thiết bị` : 'Cập nhật thiết bị'}
        openDrawer={isOpenDevice.isOpen && isOpenDevice.type !== 'DELETE'}
        handleCloseDrawer={() => {
          handleClose();
        }}
        // maskClosable={false}
        children={
          <>
            {isOpenDevice.detailDevice && isOpenDevice.type === 'DETAIL' && (
              <DetailDevice
                key={isOpenDevice.detailDevice.code}
                detailDevice={isOpenDevice.detailDevice}
              ></DetailDevice>
            )}
            {isOpenDevice.detailDevice && isOpenDevice.type === 'EDIT' && (
              <EditDetailDevice
                key={isOpenDevice.detailDevice.code}
                device={isOpenDevice.detailDevice}
                handleUpdateDevice={handleUpdateDevice}
              ></EditDetailDevice>
            )}
          </>
        }
        width={window.innerWidth >= 1024 ? '70%' : '100%'}
      />

      <Modal
        title={
          <div className="text-xl font-semibold text-errorColor">
            <QuestionCircleFilled size={20} className=" font-semibold mr-1" />
            <span className="uppercase ">Xoá thiết bị </span>
          </div>
        }
        open={isOpenDevice.isOpen && isOpenDevice.type === 'DELETE'}
        onOk={handleDeleteDevice}
        onCancel={handleClose}
        okText="Xác nhận xoá"
        cancelText="Huỷ"
        okType="danger"
        cancelButtonProps={{ type: 'default' }}
        className="w-11/12 md:w-1/2 xl:w-1/3 "
        // centered
      >
        {isOpenDevice.detailDevice && (
          <p>
            Hành động này sẽ xoá thiết bị
            <span className="font-medium cursor-pointer  inline-block">
              {isOpenDevice.detailDevice?.iconPath && (
                <Avatar size={'small'} className="mr-1" src={isOpenDevice.detailDevice?.iconPath} />
              )}
              <span>
                {isOpenDevice.detailDevice?.name} (#{isOpenDevice.detailDevice?.code})
              </span>
            </span>
            . Vui lòng xác nhận để xoá.
          </p>
        )}
      </Modal>
    </div>
  );
}
