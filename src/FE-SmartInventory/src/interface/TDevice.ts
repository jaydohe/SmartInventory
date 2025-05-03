import { DeviceStateEnum, DeviceStatusEnum } from '@/Constant/DeviceEnum';
import { TDeviceType } from './TDeviceType';

export type TDevice = {
  refGatewayId: string | null;
  refId: string | null;
  code: string;
  name: string;
  status: DeviceStatusEnum;
  state: DeviceStateEnum;
  longitude: number;
  latitude: number;
  iconPath: string;
  imagePath: string;
  description: string;
  address: string;
  wardId: string | null;
  districtId: string | null;
  provinceId: string | null;
  deviceTypeId: string;
  unitId: string;
  deviceId: string | null;
  createdAt: string;
  id: string;
  deviceType?: TDeviceType;
  ward?: {
    id: string;
    name: string;
    districtId: string;
  };
  district?: {
    id: string;
    name: string;
    provinceId: string;
  };
  province?: {
    id: string;
    name: string;
  };
  unit?: {
    name: string;
  };
};

export type TCreateDevice = {
  deviceTypeId: string;
  isGateWay: boolean;
  deviceCode: string;
  deviceMasterId?: string;
  longitude: number;
  latitude: number;
  imagePath?: string;
  address?: string;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
  description?: string;
};
export type TUpdateDevice = Omit<TCreateDevice, 'deviceTypeId' | 'isGateWay'> & {
  refGatewayId: string;
  refId: string;
};
