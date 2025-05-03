import issuesLogo from '@/assets/img/warningIcon.png';
import DrawerComponents from '@/Components/Drawer/index';
import { genTicketEnum, ProcessesStateEnum, TicketStatusEnum } from '@/Constant/TicketEnumStatus';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery, TPage } from '@/interface';
import {
  ModalTypeProcessEnum,
  TAssignTicket,
  TProcessedTicket,
  TReportTicket,
  TTicketProcesses,
  TUpdateProcessTicket,
} from '@/interface/TReportTicket';
import { useQueryDetailReportTicket } from '@/pages/ReportTicket/Hook/useQueryReportTikcet';
import {
  CheckCircleOutlined,
  ExclamationCircleFilled,
  FileDoneOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  QuestionCircleFilled,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Descriptions, List, Modal, Tag } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import DetailIssue from './DetailIssue';

import ChangeStatusTicket from './ChangeStatusTicket';
import AssignTicket from './AssignTicket';
import UpdateProcess from './UpdateProcess';
import ConfirmProcessed from './ConfirmProcessed';

const { confirm } = Modal;
export interface IIssueListProps {
  ticketList: TPage<TReportTicket>;
}
export default function IssueList({ ticketList }: IIssueListProps) {
  const [isDetailIssue, setIsDetailIssue] = useState<{
    isOpen: boolean;
    issueId: string;
  }>({
    isOpen: false,
    issueId: '',
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
  const [isAssignTicket, setIsAssignTicket] = useState<boolean>(false);

  const [filterTicket, setFilterTicket] = useState<TBuilderQuery>({
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
  } = useQueryDetailReportTicket(isDetailIssue.issueId, useBuilderQuery(filterTicket));
  const { data: detailTicket } = getTicketById;

  const handleCloseModal = () => {
    setIsDetailIssue({
      isOpen: false,
      issueId: '',
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

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={false}
        dataSource={ticketList.data}
        className="overflow-auto"
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[]}
            className="flex flex-wrap gap-3 lg:gap-5  items-center md:flex-nowrap"
          >
            <div className="m-auto  ">
              <List.Item.Meta
                className="text-center items-center md:text-left mb-0"
                avatar={<Avatar size={'large'} src={issuesLogo} />}
                title={
                  <>
                    <p className="text-lg text-left font-semibold">{item.name} </p>
                    <p className="text-sm text-left">
                      {/* Thiết bị {item.device.name} (#{item.device.code}), */}
                      Mô tả sự cố: <span className="font-semibold">{item.description}</span>,
                      {/* <br></br> */} Toạ độ thiết bị: {item.device.latitude},{' '}
                      {item.device.longitude}
                    </p>
                  </>
                }
              />

              <Descriptions size="small">
                <Descriptions.Item label="Người gửi" className=" text-medium">
                  {item.user.name}
                </Descriptions.Item>
                <Descriptions.Item label="Thời gian" className=" text-medium">
                  {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Trạng thái" className=" text-medium">
                  <Tag
                    className="m-0 font-medium"
                    color={genTicketEnum(item.status).color}
                    icon={
                      item.status === TicketStatusEnum.NEW ? (
                        <PlusCircleOutlined />
                      ) : item.status === TicketStatusEnum.PROCESSED ? (
                        <CheckCircleOutlined />
                      ) : item.status === TicketStatusEnum.RECEVIED ? (
                        <SyncOutlined spin />
                      ) : (
                        <MinusCircleOutlined />
                      )
                    }
                    key={'status'}
                  >
                    {genTicketEnum(item.status).Title}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className=" w-full flex-wrap md:w-fit  md:justify-end flex justify-center items-center ">
              <Button
                type="primary"
                size="middle"
                shape="round"
                className="bg-infoColor hover:bg-infoColorHover"
                icon={<InfoCircleOutlined />}
                onClick={() => {
                  // navigateFunction(`/book-of-doc/${record.id}`);

                  setIsDetailIssue({ isOpen: true, issueId: item.id });
                }}
              >
                Chi tiết
              </Button>
            </div>
          </List.Item>
        )}
      />
      {isDetailIssue.issueId && detailTicket?.data && (
        <DrawerComponents
          // paddingTop={true}
          title={`Chi tiết sự cố`}
          openDrawer={isDetailIssue.isOpen}
          handleCloseDrawer={() => {
            handleCloseModal();
          }}
          maskClosable={false}
          children={
            <DetailIssue
              key={detailTicket.data.id}
              detailTicket={detailTicket.data}
              handleOpenModalProcess={handleOpenModalProcess}
              handleOpenModalTicket={handleOpenModalTicket}
            ></DetailIssue>
          }
          width={window.innerWidth >= 1024 ? '50%' : '100%'}
        />
      )}

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
    </div>
  );
}
