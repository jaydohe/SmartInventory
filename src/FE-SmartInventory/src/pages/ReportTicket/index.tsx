import DrawerComponents from '@/Components/Drawer/index';
import SearchInput from '@/Components/SearchInput';
import {
  genProcessesStateEnum,
  genTicketEnum,
  ProcessesStateEnum,
  TicketStatusEnum,
} from '@/Constant/TicketEnumStatus';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import {
  ModalTypeProcessEnum,
  TAssignTicket,
  TProcessedTicket,
  TReportTicket,
  TTicketProcesses,
  TUpdateProcessTicket,
} from '@/interface/TReportTicket';
const { RangePicker } = DatePicker;
import dayjs, { Dayjs } from 'dayjs';
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf('day');
};
import { authStoreSelectors } from '@/Stores/userStore';
import {
  AppstoreAddOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  EyeOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  QuestionCircleFilled,
  SyncOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  DatePicker,
  Modal,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useEffect, useState } from 'react';

import DetailIssue from '../IssueMap/Components/DetailIssue';
import { useQueryDetailReportTicket, useQueryReportTicket } from './Hook/useQueryReportTikcet';
import AssignTicket from '../IssueMap/Components/AssignTicket';
import ChangeStatusTicket from '../IssueMap/Components/ChangeStatusTicket';
import UpdateProcess from '@/pages/IssueMap/Components/UpdateProcess';
import ConfirmProcessed from '../IssueMap/Components/ConfirmProcessed';
import { RangePickerProps } from 'antd/es/date-picker';
import { MAINTENANCE, QueryKeys, rangePresets, roleNumToStr, TECHNICAL } from '@/Constant';
import RoleTag from '../User/Components/RoleTag';
import { useLocation, useNavigate } from 'react-router';
import { downloadFile } from '@/utils/downloadFile';
import { useQueryClient } from '@tanstack/react-query';

export interface IReportTicketProps {}

export default function ReportTicket(props: IReportTicketProps) {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();
  const unitId = authStoreSelectors.use.unitId() ?? '';
  const role = authStoreSelectors.use.role() ?? '';
  const userId = authStoreSelectors.use.userId() ?? '';
  const [openExportExcel, setOpenExportExcel] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState<{
    isOpen: boolean;
    ticket?: TReportTicket;
  }>({ isOpen: false });

  const [detailIssueTicket, setDetailIssueTicket] = useState<{
    isOpen: boolean;
    detailTicketId?: string;
  }>({
    isOpen: false,
  });
  const [timeToExportExcel, setTimeToExportExcel] = useState({
    from: moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    to: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  });

  const [isModalProcess, setIsModalProcess] = useState<{
    isOpen: boolean;
    process?: TTicketProcesses;
    type: ModalTypeProcessEnum;
  }>({
    isOpen: false,
    type: ModalTypeProcessEnum.assignTicket,
  });

  const [isModalTicket, setIsModalTicket] = useState<{
    isOpen: boolean;
    ticket?: TReportTicket;
    type?: ModalTypeProcessEnum;
  }>({
    isOpen: false,
  });

  const handleCancel = () => {
    setIsModalProcess({
      isOpen: false,
      type: ModalTypeProcessEnum.assignTicket,
    });
    setIsModalTicket({
      isOpen: false,
      type: ModalTypeProcessEnum.assignTicket,
    });
  };
  const handleOpenModalProcess = (process: TTicketProcesses, type: ModalTypeProcessEnum) => {
    setIsModalProcess({ isOpen: true, process: process, type: type });
  };
  const handleOpenModalTicket = (ticket: TReportTicket, type: ModalTypeProcessEnum) => {
    setIsModalTicket({ isOpen: true, ticket: ticket, type: type });
  };

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
        'processes.userReceivedId': {
          value: role === TECHNICAL || role === MAINTENANCE ? userId : '',
          queryOperator: '$eq',
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
  const { getAllTicket, createTicket, updateTicket, exportExcelTicket, deleteTicket } =
    useQueryReportTicket(useBuilderQuery(filterTicket));

  const [filterDetailTicket, setFilterDetailTicket] = useState<TBuilderQuery>({
    toJoin: [
      'user.name',
      'user.role',
      'device.name',
      'device.code',
      'device.longitude',
      'device.latitude',
      'processes.*',
      'device.deviceType.name',
      'processes.userReceived.*',
      'processes.userSender.*',
    ],
  });

  const {
    getTicketById,
    assignTicket,
    rollBackTicket,
    ProcessedTicket,
    updateProcessTicket,
    updateStatusTicket,
  } = useQueryDetailReportTicket(
    detailIssueTicket.detailTicketId ? detailIssueTicket.detailTicketId : '',
    useBuilderQuery(filterDetailTicket)
  );
  const { data: allTicket } = getAllTicket;
  const { data: detailTicket } = getTicketById;
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

  const handleExportExcel = () => {
    console.log(123);
    exportExcelTicket.mutate(timeToExportExcel, {
      onSuccess: (data) => {
        // toast.success(data.message);
        console.log(data);
        setOpenExportExcel(false);
        downloadFile(
          data,
          `Thống kê báo cáo sự cố từ ngày ${moment(timeToExportExcel.from).format(
            'DD/MM/YYYY'
          )} đến ngày ${moment(timeToExportExcel.to).format('DD/MM/YYYY')}`
        );
      },
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
      title: `Người báo cáo`,
      dataIndex: 'user',
      className: 'break-words	 truncate',
      key: 'user',
      render: (_, record) => (
        <p className="">
          <RoleTag role={roleNumToStr[record.user.role]} userName={record.user.name} />
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
      title: `Thao tác`,
      key: 'action',
      // fixed: 'right',

      render: (_, record) => (
        <Space>
          <Tooltip title="Chi tiết">
            <Avatar
              className="cursor-pointer	"
              style={{ backgroundColor: '#e6f4ff', color: '#4096ff' }}
              icon={<EyeOutlined />}
              onClick={() => {
                setDetailIssueTicket({
                  isOpen: true,
                  detailTicketId: record.id,
                });
              }}
            />
          </Tooltip>
          {record.status === TicketStatusEnum.PROCESSED && (
            <Tooltip title="Xoá">
              <Avatar
                className="cursor-pointer	"
                style={{ backgroundColor: '#ffccc7', color: '#ff4d4f' }}
                icon={<DeleteOutlined />}
                onClick={() => {
                  setIsOpenDelete({
                    isOpen: true,
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

  const expandedRowRender = (record: TReportTicket) => {
    const columns: TableColumnsType<TTicketProcesses> = [
      {
        title: `Người giao`,
        dataIndex: 'userSender',
        key: 'userSender',

        render: (_, record) => (
          <p className="font-semibold cursor-pointer	text-ellipsis  overflow-hidden w-full text-pretty">
            <RoleTag
              role={roleNumToStr[record.userSender.role]}
              userName={record.userSender.name}
            />
          </p>
        ),
      },
      {
        title: `Người thực hiện`,
        dataIndex: 'userReceived',
        key: 'userReceived',

        render: (_, record) => (
          <p className="font-semibold cursor-pointer	text-ellipsis  overflow-hidden w-full text-pretty">
            <RoleTag
              role={roleNumToStr[record.userReceived.role]}
              userName={record.userReceived.name}
            />
          </p>
        ),
      },
      {
        title: `Chỉ thị `,
        dataIndex: 'message',
        key: 'message',
        render: (text) => (
          <p className="cursor-pointer font-medium	text-ellipsis  overflow-hidden w-full text-pretty">
            {text}
          </p>
        ),
      },

      {
        title: `Ngày giao`,
        dataIndex: 'createdAt',
        className: 'break-words	 truncate',
        key: 'createdAt',
        render: (text) => <p className="">{moment(text).format('DD/MM/YYYY HH:mm')}</p>,
      },
      {
        title: `Hạn xử lý`,
        dataIndex: 'expireAt',
        className: 'break-words	 truncate',
        key: 'expireAt',
        render: (text) => <p className="">{moment(text).format('DD/MM/YYYY HH:mm')}</p>,
      },
      {
        title: `Trạng thái`,
        key: 'state',
        dataIndex: 'state',

        render: (_, { state }) => {
          return (
            <Tag
              className="m-0"
              color={genProcessesStateEnum(state).color}
              icon={
                state === ProcessesStateEnum.PROCESSED ? (
                  <CheckCircleOutlined />
                ) : (
                  <SyncOutlined spin />
                )
              }
              key={'state'}
            >
              {genProcessesStateEnum(state).Title}
            </Tag>
          );
        },
      },
    ];

    return (
      <Table size="middle" columns={columns} dataSource={record.processes} pagination={false} />
    );
  };

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
    // isAssignee && setIsAssignee(false);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

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
  const handleCloseModal = () => {
    setDetailIssueTicket({
      isOpen: false,
    });
  };
  const handleOk = () => {
    if (isModalProcess.type === ModalTypeProcessEnum.rollBack && isModalProcess.process) {
      rollBackTicket.mutate([`${isModalProcess.process.userReceivedId}`], {
        onSuccess: () => {
          handleCancel();
        },
      });
    }
  };

  const handleUpdateProcess = (data: TUpdateProcessTicket) => {
    if (isModalProcess.type === ModalTypeProcessEnum.updateProcess && isModalProcess.process) {
      updateProcessTicket.mutate(
        { processesId: isModalProcess.process.id, data: data },
        {
          onSuccess: () => {
            handleCancel();
          },
        }
      );
    }
  };
  const handleChangeStatusTicket = (newStatus: TicketStatusEnum) => {
    if (isModalTicket.type === ModalTypeProcessEnum.updateStatusTicket && isModalTicket.ticket) {
      updateStatusTicket.mutate(newStatus, {
        onSuccess: () => {
          handleCancel();
        },
      });
      console.log('handleChangeStatusTicket', newStatus);
    }
  };

  const handleAssignTicket = (data: TAssignTicket) => {
    if (isModalTicket.type === ModalTypeProcessEnum.assignTicket) {
      assignTicket.mutate(data, {
        onSuccess: () => {
          handleCancel();
        },
      });
    }
  };
  const handleConfirmProcessed = (data: TProcessedTicket) => {
    if (isModalProcess.type === ModalTypeProcessEnum.updateProcessed && isModalProcess.process) {
      ProcessedTicket.mutate(data, {
        onSuccess: () => {
          handleCancel();
        },
      });
    }
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
      setTimeToExportExcel({
        from: moment(dateStrings[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        to: moment(dateStrings[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
      });
    }
  };

  useEffect(() => {
    if (state && state.targetId) {
      console.log(state);

      setDetailIssueTicket({
        isOpen: true,
        detailTicketId: state.targetId,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DETAIL_REPORT_TICKET, state.targetId],
      });
    }
  }, [state]);
  useEffect(() => {
    // Nếu có state, cập nhật URL để xóa state
    if (state) {
      // Thay thế URL hiện tại bằng URL không có state
      navigate(location.pathname, { replace: true });
    }
  }, []);
  const handleDeleteTicket = () => {
    if (isOpenDelete.ticket) {
      deleteTicket.mutate(isOpenDelete.ticket.id, {
        onSuccess: (data) => {
          setIsOpenDelete({ isOpen: false });
        },
      });
    }
  };
  return (
    <div className=" min-h-min p-4">
      <div className={`flex items-center justify-between  flex-wrap lg:flex-nowrap gap-4 mb-4`}>
        <div className="min-w-fit flex  items-center gap-3">
          <h2 className="font-bold text-xl md:text-2xl  text-inherit text-pretty text-center uppercase text-primary">
            <UnorderedListOutlined className="text-xl" /> Danh sách sự cố
          </h2>
          <Button
            type="primary"
            size="middle"
            shape="round"
            icon={<AppstoreAddOutlined />}
            onClick={() => {
              setOpenExportExcel(true);
            }}
          >
            Xuất Excel
          </Button>
        </div>

        <div className="w-full flex items-center justify-end gap-3 md:gap-5 flex-wrap md:flex-nowrap ">
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
                dayjs(dayjs().add(-7, 'd'), 'YYYY/MM/DD'),
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
          expandable={{
            expandedRowRender,
            defaultExpandedRowKeys: ['0'],
          }}
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

      {/* -------- Add New --------- */}

      <DrawerComponents
        title={` Thêm báo cáo sự cố `}
        openDrawer={openDrawer}
        handleCloseDrawer={handleCloseDrawer}
        children={<></>}
        width={window.innerWidth >= 1025 ? '60%' : '100%'}
      />

      {detailTicket?.data && (
        <DrawerComponents
          // paddingTop={true}
          title={`Chi tiết sự cố`}
          openDrawer={detailIssueTicket.isOpen}
          handleCloseDrawer={() => {
            handleCloseModal();
          }}
          maskClosable={false}
          children={
            <DetailIssue
              detailTicket={detailTicket?.data}
              handleOpenModalProcess={handleOpenModalProcess}
              handleOpenModalTicket={handleOpenModalTicket}
            ></DetailIssue>
          }
          width={window.innerWidth >= 1024 ? '50%' : '100%'}
        />
      )}

      <Modal
        title={
          <div className="text-xl font-semibold text-primary">
            <QuestionCircleFilled size={20} className=" font-semibold mr-1" />
            <span className="uppercase ">Xuất Excel báo cáo sự cố </span>
          </div>
        }
        open={openExportExcel}
        onOk={handleExportExcel}
        onCancel={() => setOpenExportExcel(false)}
        okText="Xác nhận"
        cancelText="Huỷ"
        okType="primary"
        cancelButtonProps={{ type: 'default' }}
        className="w-11/12 md:w-1/2 xl:w-1/3 "
        // centered
      >
        <p>
          Hành động này sẽ xuất Excel báo cáo sự cố từ ngày{' '}
          <span className="font-medium">{moment(timeToExportExcel.from).format('L')}</span> đến ngày{' '}
          <span className="font-medium">{moment(timeToExportExcel.to).format('L')}</span> . Vui lòng
          xác nhận để xuất Excel.
        </p>
      </Modal>

      {isModalProcess.process && isModalProcess.type === ModalTypeProcessEnum.rollBack && (
        <Modal
          title={
            <div className="text-xl font-semibold text-primary">
              <ExclamationCircleFilled size={20} className=" font-semibold " />
              <span className="uppercase "> Thu hồi phân công</span>
            </div>
          }
          open={isModalProcess.isOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Xác nhận"
          cancelText="Huỷ"
          okType="primary"
          cancelButtonProps={{ type: 'default' }}
          className="w-11/12 md:w-1/2 xl:w-1/3 "
          centered
        >
          <p className="font-medium">
            Hành động này sẽ thu hồi phân công thực hiện của
            <Tag icon={<UserOutlined />} color="cyan" className="mx-1">
              {isModalProcess.process.userReceived.name}
            </Tag>
            Vui lòng xác nhận để thu hồi.
          </p>
        </Modal>
      )}
      {isModalTicket.type === ModalTypeProcessEnum.updateStatusTicket && isModalTicket.ticket && (
        <ChangeStatusTicket
          handleCloseModal={handleCancel}
          isModalProcessOpen={isModalTicket.isOpen}
          currentState={isModalTicket.ticket.status}
          handleChangeStatusTicket={handleChangeStatusTicket}
        ></ChangeStatusTicket>
      )}
      {isModalProcess.type === ModalTypeProcessEnum.updateProcess && isModalProcess.process && (
        <UpdateProcess
          handleCloseModal={handleCancel}
          isModalProcessOpen={isModalProcess.isOpen}
          currentProcess={isModalProcess.process}
          handleUpdateProcess={handleUpdateProcess}
        ></UpdateProcess>
      )}

      {isModalTicket.type === ModalTypeProcessEnum.assignTicket && isModalTicket.ticket && (
        <AssignTicket
          handleCloseModal={handleCancel}
          isModalProcessOpen={isModalTicket.isOpen}
          handleAssignTicket={handleAssignTicket}
        ></AssignTicket>
      )}
      {isModalProcess.type === ModalTypeProcessEnum.updateProcessed && isModalProcess.process && (
        <ConfirmProcessed
          handleCloseModal={handleCancel}
          isModalProcessOpen={isModalProcess.isOpen}
          handleConfirmProcessed={handleConfirmProcessed}
        ></ConfirmProcessed>
      )}

      <Modal
        title={
          <div className="text-xl font-semibold text-errorColor">
            <QuestionCircleFilled size={20} className=" font-semibold mr-1" />
            <span className="uppercase ">Xoá báo cáo sự cố</span>
          </div>
        }
        open={isOpenDelete.isOpen}
        onOk={handleDeleteTicket}
        onCancel={() => {
          setIsOpenDelete({ isOpen: false });
        }}
        okText="Xác nhận xoá"
        cancelText="Huỷ"
        okType="danger"
        cancelButtonProps={{ type: 'default' }}
        className="w-11/12 md:w-1/2 xl:w-1/3 "
        // centered
      >
        {isOpenDelete.ticket && (
          <p>
            Hành động này sẽ xoá báo cáo sự cố{' '}
            <span className="font-semibold cursor-pointer  ">{isOpenDelete.ticket.name}</span>. Vui
            lòng xác nhận để xoá.
          </p>
        )}
      </Modal>
    </div>
  );
}
