import { Card, Image, Modal } from 'antd';

import {
  DeviceStateEnum,
  DeviceStateToStr,
  DeviceStatusEnum,
  DeviceStatusStr,
} from '@/Constant/DeviceEnum';
import { TDevice } from '@/interface/TDevice';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { Avatar, Descriptions, Tag } from 'antd';
import moment from 'moment';
import ComDeviceList from './ComDeviceList';
const { confirm } = Modal;

export interface IDetailDeviceProps {
  detailDevice: TDevice;
}

export default function DetailDevice({ detailDevice }: IDetailDeviceProps) {
  return (
    <div>
      <Card
        title={
          <p className="flex items-center gap-1">
            {detailDevice.iconPath && <Avatar size={'default'} src={detailDevice.iconPath} />}
            {detailDevice.name} (#
            {detailDevice.code})
          </p>
        }
      >
        <Descriptions className="" column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}>
          <Descriptions.Item label="Toạ độ thiết bị" className=" font-medium">
            {detailDevice.latitude}, {detailDevice.longitude}
          </Descriptions.Item>
          <Descriptions.Item label="Loại thiết bị" className=" font-medium">
            <p className="flex items-center gap-1">
              <Avatar size={'small'} src={detailDevice.deviceType?.iconPath} />
              {detailDevice.deviceType?.name}
            </p>
          </Descriptions.Item>
          <Descriptions.Item label="EOH-GatewayId" className=" font-medium">
            {detailDevice.refGatewayId}
          </Descriptions.Item>
          <Descriptions.Item label="EOH-Id" className=" font-medium">
            {detailDevice.refId}
          </Descriptions.Item>

          <Descriptions.Item label="Tình trạng" className=" font-medium">
            <Tag
              className=" mx-0 text-sm font-medium"
              color={DeviceStateToStr[detailDevice.state].color}
              icon={
                detailDevice.state === DeviceStateEnum.NORMAL ? (
                  <CheckCircleOutlined />
                ) : detailDevice.state === DeviceStateEnum.ERROR ? (
                  <WarningOutlined />
                ) : (
                  <CloseCircleOutlined />
                )
              }
            >
              {DeviceStateToStr[detailDevice.state].name}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Trạng thái" className=" font-medium">
            <Tag
              className=" mx-0 text-sm font-medium"
              color={DeviceStatusStr[detailDevice.status].color}
              icon={
                detailDevice.status === DeviceStatusEnum.ACTIVE ? (
                  <CheckCircleOutlined />
                ) : detailDevice.status === DeviceStatusEnum.INACTIVE ? (
                  <MinusCircleOutlined />
                ) : (
                  <CloseCircleOutlined />
                )
              }
            >
              {DeviceStatusStr[detailDevice.status].name}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Mô tả " className=" font-medium">
            {detailDevice.description}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian tạo" className=" font-medium">
            {moment(detailDevice.createdAt).format('DD/MM/YYYY HH:mm')}
          </Descriptions.Item>

          <Descriptions.Item label="Địa chỉ" className=" font-medium">
            {detailDevice.address ? `${detailDevice.address},` : ''}{' '}
            {detailDevice.ward?.name ? `${detailDevice.ward?.name},` : ''}{' '}
            {detailDevice.district?.name ? `${detailDevice.district?.name},` : ''}{' '}
            {detailDevice.province?.name ? `${detailDevice.province?.name}` : ''}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh thiết bị" className=" font-medium">
            <Image className="rounded m-auto " width={'30%'} src={detailDevice.imagePath} />
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {detailDevice.deviceType?.isGateway && (
        <>
          <ComDeviceList device={detailDevice} key={detailDevice.id}></ComDeviceList>
        </>
      )}
    </div>
  );
}
