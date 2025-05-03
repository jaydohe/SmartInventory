import SearchInput from '@/Components/SearchInput';
import { genTicketEnum, TicketStatusEnum } from '@/Constant/TicketEnumStatus';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { TCreateTicket, TReportTicket } from '@/interface/TReportTicket';
import { authStoreSelectors } from '@/Stores/userStore';
import DrawerComponents from '@/Components/Drawer/index';

import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  QuestionCircleFilled,
  SyncOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { DatePicker, Table, Tag, Image, Space, Avatar, Tooltip, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf('day');
};

import { QueryKeys, rangePresets } from '@/Constant';
import { RangePickerProps } from 'antd/es/date-picker';
import { useQueryReportTicket } from '../ReportTicket/Hook/useQueryReportTikcet';
import UpdateMyReportTicket from './Components/UpdateMyReportTicket';
import { useQueryClient } from '@tanstack/react-query';

export interface IMyReportTicketProps {}

export default function MyReportTicket(props: IMyReportTicketProps) {
  const userId = authStoreSelectors.use.userId() ?? '';
  const queryClient = useQueryClient();
  const [isOpenTicket, setIsOpenTicket] = useState<{
    isOpen: boolean;
    type?: 'EDIT' | 'DELETE';
    ticket?: TReportTicket;
  }>({ isOpen: false });

  const [filterTicket, setFilterTicket] = useState<TBuilderQuery>({
    toJoin: [
      'user.name',
      'user.role',
      'device.*',
      'processes.*',
      'processes.userReceived.*',
      'processes.userSender.*',
    ],
    isAsc: false,
    orderBy: 'createdAt',
    appendQuery: [
      {
        userId: {
          value: userId,
          queryOperator: '$fli',
          queryOperatorParent: '$and',
        },
      },
      {
        name: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$and',
        },
      },
      {
        createdAt: {
          value: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
          queryOperator: '$lte',
          queryOperatorParent: '$and',
        },
      },
      {
        createdAt: {
          value: moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          queryOperator: '$gte',
          queryOperatorParent: '$and',
        },
      },
    ],
    toPaging: {
      page: 1,
      pageSize: 10,
    },
  });
  const { getAllTicket, deleteTicket, updateTicket } = useQueryReportTicket(
    useBuilderQuery(filterTicket)
  );

  const { data: allTicket } = getAllTicket;

  const handleSearchValue = (valueSearch: string) => {
    setFilterTicket((pre) => {
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

  const columns: ColumnsType<TReportTicket> = [
    {
      title: `STT`,
      // fixed: 'left',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => <p className="font-semibold">{index + 1}</p>,
    },
    {
      title: `Trạng thái`,
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => {
        return (
          <Tag
            className="m-0 font-medium text-sm"
            color={genTicketEnum(status).color}
            icon={
              status === TicketStatusEnum.NEW ? (
                <PlusCircleOutlined />
              ) : status === TicketStatusEnum.PROCESSED ? (
                <CheckCircleOutlined />
              ) : status === TicketStatusEnum.RECEVIED ? (
                <SyncOutlined spin />
              ) : (
                <MinusCircleOutlined />
              )
            }
            key={'status'}
          >
            {genTicketEnum(status).Title}
          </Tag>
        );
      },
    },
    {
      title: `Tên sự cố`,
      dataIndex: 'name',
      className: 'break-words	 truncate ',
      key: 'name',

      render: (text) => (
        <p className="font-semibold cursor-pointer	text-ellipsis  overflow-hidden w-full text-pretty">
          {text}
        </p>
      ),
    },
    {
      title: `Nội dung`,
      dataIndex: 'description',
      className: 'break-words	 truncate',
      key: 'description',
      render: (text) => (
        <p className=" 	text-ellipsis  overflow-hidden w-full text-pretty">{text}</p>
      ),
    },
    {
      title: `Thiết bị`,
      dataIndex: 'device',
      className: 'break-words	 truncate ',
      key: 'device',

      render: (_, record) => (
        <p className="text-pretty">
          {record.device.name}, toạ độ ({record.device.latitude}, {record.device.longitude})
        </p>
      ),
    },

    {
      title: `Thời gian`,
      dataIndex: 'createdAt',
      className: 'break-words	 truncate',
      key: 'createdAt',
      render: (text) => <p className="">{moment(text).format('DD/MM/YYYY HH:mm')}</p>,
    },
    {
      width: '5%',
      title: `Hình ảnh`,
      dataIndex: 'imagePath',
      className: 'break-words	 truncate',
      key: 'imagePath',
      render: (text) => <Image className="rounded m-auto " src={text} />,
    },

    {
      title: `Thao tác`,
      key: 'action',
      // fixed: 'right',

      render: (_, record) => (
        <Space>
          {record.status === TicketStatusEnum.NEW && (
            <Tooltip title="Chỉnh sửa">
              <Avatar
                className="cursor-pointer	"
                style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
                icon={<EditOutlined />}
                onClick={() => {
                  setIsOpenTicket({
                    isOpen: true,
                    type: 'EDIT',
                    ticket: record,
                  });
                }}
              />
            </Tooltip>
          )}

          {record.status === TicketStatusEnum.NEW && (
            <Tooltip title="Xoá">
              <Avatar
                className="cursor-pointer	"
                style={{ backgroundColor: '#ffccc7', color: '#ff4d4f' }}
                icon={<DeleteOutlined />}
                onClick={() => {
                  setIsOpenTicket({
                    isOpen: true,
                    type: 'DELETE',
                    ticket: record,
                  });
                }}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setFilterTicket({
      ...filterTicket,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const onRangeChangeAll = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setFilterTicket((pre) => {
        // Tạo appendQuery mới bằng cách map qua mảng cũ
        const newAppendQuery = pre.appendQuery?.map((item) => {
          if ('createdAt' in item && item['createdAt'].queryOperator === '$lte') {
            return {
              createdAt: {
                ...item.createdAt,
                value: moment(dateStrings[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
              },
            };
          }
          if ('createdAt' in item && item['createdAt'].queryOperator === '$gte') {
            return {
              createdAt: {
                ...item.createdAt,
                value: moment(dateStrings[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
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
    }
  };

  const handleDeleteTicket = () => {
    if (isOpenTicket.ticket) {
      deleteTicket.mutate(isOpenTicket.ticket.id, {
        onSuccess: (data) => {
          setIsOpenTicket({ isOpen: false });
        },
      });
    }
  };

  const handleUpdateTicket = (id: string, data: TCreateTicket) => {
    updateTicket.mutate(
      { id, data },
      {
        onSuccess: (data) => {
          setIsOpenTicket({ isOpen: false });
          // queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_REPORT_TICKET, id] });
        },
      }
    );
  };
  return (
    <div className=" min-h-min p-4">
      <div className={`flex items-center justify-between  flex-wrap lg:flex-nowrap gap-4 mb-4`}>
        <div className="min-w-fit flex  items-center gap-3">
          <h2 className="font-bold text-xl md:text-2xl   text-inherit text-pretty  text-center uppercase text-primary">
            <UnorderedListOutlined className="text-xl" /> Danh sách báo sự cố của tôi
          </h2>
        </div>

        <div className="w-full flex items-center justify-end gap-3 md:gap-5 flex-wrap md:flex-nowrap">
          <div className="flex justify-center lg:justify-start items-center gap-1   w-full lg:w-fit ">
            <h2 className="font-medium   min-w-fit	">Thời gian:</h2>
            <RangePicker
              className="w-full"
              // size="large"
              style={{ width: '100%' }}
              popupClassName={' invisible w-1/2 lg:visible lg:w-fit'}
              // popupStyle={{ width: '80vw' }}
              format="YYYY/M/D"
              disabledDate={disabledDate}
              defaultValue={[
                // dayjs(dayjs().add(-7, 'd'), 'YYYY/MM/DD'),
                dayjs(dayjs(), 'YYYY/MM/DD'),
                dayjs(dayjs(), 'YYYY/MM/DD'),
              ]}
              presets={rangePresets}
              onChange={onRangeChangeAll}
            />
          </div>

          <div className="w-full  lg:w-1/3">
            <SearchInput placeholder="Tìm kiếm sự cố" handleSearchValue={handleSearchValue} />
          </div>
        </div>
      </div>

      {allTicket?.data && (
        <Table
          columns={columns}
          dataSource={allTicket?.data}
          tableLayout={'auto'}
          // loading
          scroll={{ x: 650 }}
          rowKey={(record) => record.id}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            showSizeChanger: true,
            onChange: handlePageChange,
            total: allTicket?.totalRecords,
            current: filterTicket.toPaging?.page,
            pageSize: filterTicket.toPaging?.pageSize,
          }}
        />
      )}

      <Modal
        title={
          <div className="text-xl font-semibold text-errorColor">
            <QuestionCircleFilled size={20} className=" font-semibold mr-1" />
            <span className="uppercase ">Xoá báo cáo sự cố</span>
          </div>
        }
        open={isOpenTicket.isOpen && isOpenTicket.type === 'DELETE'}
        onOk={handleDeleteTicket}
        onCancel={() => {
          setIsOpenTicket({ isOpen: false });
        }}
        okText="Xác nhận xoá"
        cancelText="Huỷ"
        okType="danger"
        cancelButtonProps={{ type: 'default' }}
        className="w-11/12 md:w-1/2 xl:w-1/3 "
        // centered
      >
        {isOpenTicket.ticket && (
          <p>
            Hành động này sẽ xoá báo cáo sự cố{' '}
            <span className="font-semibold cursor-pointer  ">{isOpenTicket.ticket.name}</span>. Vui
            lòng xác nhận để xoá.
          </p>
        )}
      </Modal>

      <DrawerComponents
        // paddingTop={true}
        title={`Cập nhật báo cáo sự cố`}
        openDrawer={isOpenTicket.isOpen && isOpenTicket.type === 'EDIT'}
        handleCloseDrawer={() => {
          setIsOpenTicket({ isOpen: false });
        }}
        maskClosable={false}
        children={
          isOpenTicket.ticket && (
            <UpdateMyReportTicket
              detailTicket={isOpenTicket.ticket}
              handleUpdateTicket={handleUpdateTicket}
            ></UpdateMyReportTicket>
          )
        }
        width={window.innerWidth >= 1024 ? '50%' : '100%'}
      />
    </div>
  );
}
