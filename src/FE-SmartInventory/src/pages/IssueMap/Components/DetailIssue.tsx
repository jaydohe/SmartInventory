import {
  genProcessesStateEnum,
  genTicketEnum,
  ProcessesStateEnum,
  TicketStatusEnum,
} from '@/Constant/TicketEnumStatus';
import issuesLogo from '@/assets/img/warningIcon.png';
import { ModalTypeProcessEnum, TReportTicket, TTicketProcesses } from '@/interface/TReportTicket';
import { Button, Card, Flex, Image, List, Modal } from 'antd';
import { FaUserCog } from 'react-icons/fa';
import { BiSolidEdit } from 'react-icons/bi';

import ViewListFile from '@/Components/ViewListFile';
import { authStoreSelectors } from '@/Stores/userStore';
import {
  CheckCircleOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  RollbackOutlined,
  SyncOutlined,
  UserOutlined,
  QuestionCircleFilled,
  ExclamationCircleFilled,
  FileDoneOutlined,
} from '@ant-design/icons';
import { Avatar, Descriptions, Divider, Tag } from 'antd';
import moment from 'moment';
import { UseMutationResult } from '@tanstack/react-query';
import { TResponse } from '@/interface';
import { useCallback } from 'react';
import RoleTag from '@/pages/User/Components/RoleTag';
import {
  MAINTENANCE,
  ROLE,
  RoleEnumString,
  roleNumToStr,
  SUPERVISION,
  TECHNICAL,
} from '@/Constant';
const { confirm } = Modal;

export interface IDetailIssueProps {
  detailTicket: TReportTicket;
  handleOpenModalProcess: (process: TTicketProcesses, type: ModalTypeProcessEnum) => void;
  handleOpenModalTicket: (ticket: TReportTicket, type: ModalTypeProcessEnum) => void;
}

export default function DetailIssue({
  detailTicket,
  handleOpenModalProcess,
  handleOpenModalTicket,
}: IDetailIssueProps) {
  const role = authStoreSelectors.use.role();
  const userId = authStoreSelectors.use.userId() ?? '';

  console.log(detailTicket);

  return (
    <div>
      <Card
        actions={
          detailTicket.status !== TicketStatusEnum.PROCESSED &&
          role !== TECHNICAL &&
          role !== MAINTENANCE &&
          role !== SUPERVISION
            ? [
                <Flex
                  justify="center"
                  align="center"
                  gap="small"
                  className="text-lg font-semibold text-infoColor hover:text-infoColorHover"
                  onClick={() => {
                    handleOpenModalTicket(detailTicket, ModalTypeProcessEnum.assignTicket);
                  }}
                >
                  <FaUserCog size={20} className=" font-semibold " /> Phân công
                </Flex>,
                <Flex
                  justify="center"
                  align="center"
                  gap="small"
                  className="text-base font-semibold text-primary hover:text-primaryColorHover "
                  onClick={() => {
                    handleOpenModalTicket(detailTicket, ModalTypeProcessEnum.updateStatusTicket);
                  }}
                >
                  <BiSolidEdit size={20} className=" font-medium  " /> Trạng thái
                </Flex>,
              ]
            : []
        }
        title={
          <>
            <Avatar size={'large'} src={issuesLogo} /> {detailTicket.name} - thiết bị{' '}
            {detailTicket.device.name} (#
            {detailTicket.device.code})
          </>
        }
      >
        <Descriptions size="middle" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}>
          <Descriptions.Item label="Mô tả sự cố" className=" font-medium">
            {detailTicket.description}
          </Descriptions.Item>
          <Descriptions.Item label="Toạ độ thiết bị" className=" font-medium">
            {detailTicket.device.latitude}, {detailTicket.device.longitude}
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" className=" font-medium">
            <Tag
              className="m-0 font-medium"
              color={genTicketEnum(detailTicket.status).color}
              icon={
                detailTicket.status === TicketStatusEnum.NEW ? (
                  <PlusCircleOutlined />
                ) : detailTicket.status === TicketStatusEnum.PROCESSED ? (
                  <CheckCircleOutlined />
                ) : detailTicket.status === TicketStatusEnum.RECEVIED ? (
                  <SyncOutlined spin />
                ) : (
                  <MinusCircleOutlined />
                )
              }
              key={'status'}
            >
              {genTicketEnum(detailTicket.status).Title}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label="Thời gian" className=" font-medium">
            {moment(detailTicket.createdAt).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Người báo cáo" className=" font-medium">
     
            <RoleTag
              role={roleNumToStr[detailTicket.user.role]}
              userName={detailTicket.user.name}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh sự cố" className=" font-medium">
            <Image className="rounded m-auto " width={'30%'} src={detailTicket.imagePath} />
          </Descriptions.Item>
        </Descriptions>
        {/* <>
          <Divider orientation="left" className="text-md font-semibold text-primary ">
            Ảnh sự cố
          </Divider>
          <Image className="rounded m-auto " width={'30%'} src={detailTicket.imagePath} />
        </> */}
        {detailTicket.filePath && (
          <>
            <Divider orientation="left" className="text-base font-semibold text-primary ">
              Tệp đính kèm
            </Divider>

            <ViewListFile
              arrayFile={[
                {
                  id: detailTicket.filePath,
                  filePath: detailTicket.filePath,
                  fileName: detailTicket.filePath,
                },
              ]}
            ></ViewListFile>
          </>
        )}
      </Card>

      <Divider orientation="left" className="text-xl font-semibold text-primary ">
        Danh sách phân công xử lý
      </Divider>

      <List
        size="large"
        pagination={false}
        dataSource={detailTicket.processes}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            className="flex flex-wrap gap-3 lg:gap-5  items-center md:flex-nowrap px-0 pt-0 mb-3"
          >
            <Card
              actions={
                userId === item.userSenderId
                  ? [
                      <Flex
                        justify="center"
                        align="center"
                        gap="small"
                        className="text-base font-semibold text-successColorHover1 "
                        onClick={() => {
                          handleOpenModalProcess(item, ModalTypeProcessEnum.updateProcess);
                        }}
                      >
                        <EditOutlined size={20} className=" font-medium " /> Cập nhật chỉ thị
                      </Flex>,
                      <Flex
                        justify="center"
                        align="center"
                        gap="small"
                        className="text-base font-semibold text-errorColor "
                        onClick={() => handleOpenModalProcess(item, ModalTypeProcessEnum.rollBack)}
                      >
                        <RollbackOutlined size={20} className=" font-medium " /> Thu hồi phân công
                      </Flex>,
                    ]
                  : userId === item.userReceivedId && item.state !== ProcessesStateEnum.PROCESSED
                  ? [
                      <Flex
                        justify="center"
                        align="center"
                        gap="small"
                        className="text-base font-semibold text-successColor1 hover:text-successColorHover1 "
                        onClick={() => {
                          handleOpenModalProcess(item, ModalTypeProcessEnum.updateProcessed);
                        }}
                      >
                        <FileDoneOutlined size={20} className=" font-semibold " /> Hoàn thành
                      </Flex>,
                    ]
                  : []
              }
              className="m-auto  "
              title={
                <div className="flex w-full items-center gap-x-4 justify-center md:justify-between flex-wrap ">
                  <p className="text-lg text-left font-semibold ">Chỉ thị: {item.message}</p>
                  <p className="text-base font-medium flex items-center gap-2">
                    Trạng thái:
                    <Tag
                      className=" font-medium"
                      color={genProcessesStateEnum(item.state).color}
                      icon={
                        item.state === ProcessesStateEnum.PROCESSED ? (
                          <CheckCircleOutlined />
                        ) : (
                          <SyncOutlined spin />
                        )
                      }
                      key={'status'}
                    >
                      {genProcessesStateEnum(item.state).Title}
                    </Tag>
                  </p>
                </div>
              }
            >
              <Descriptions size="small" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}>
                <Descriptions.Item label="Người giao" className=" text-medium">
                  <RoleTag
                    role={roleNumToStr[item.userSender.role]}
                    userName={item.userSender.name}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo" className=" font-medium">
                  {moment(item.createdAt).format('DD/MM/YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Người thực hiện" className=" text-medium">
                  <RoleTag
                    role={roleNumToStr[item.userReceived.role]}
                    userName={item.userReceived.name}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Hạn xử lý" className=" font-medium">
                  {moment(item.expireAt).format('DD/MM/YYYY HH:mm')}
                </Descriptions.Item>
              </Descriptions>
              {item.imagePath && (
                <>
                  <Divider orientation="left" className="text-base font-semibold text-primary ">
                    Ảnh hoàn thành
                  </Divider>
                  <Image className="rounded m-auto " width={'20%'} src={item.imagePath} />
                </>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
