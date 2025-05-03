import { TDevice } from '@/interface/TDevice';
import { Image } from 'antd';
export interface IPopDetailDeviceProps {
  device: TDevice;
}

export default function PopDetailDevice({ device }: IPopDetailDeviceProps) {
  return (
    <div className="font-medium">
      <p>
        <span className="text-primary">Thiết bị {device.deviceType?.name}: </span>
        <span className="font-semibold">{device.name} </span>
      </p>
      <p>
        <span className="text-primary ">MAC: </span> <span className="">{device.code} </span>
      </p>
      <p>
        <span className="text-primary ">Mô tả: </span>
        <span className="">{device.description} </span>
      </p>

      <p>
        <span className="text-primary ">Địa Chỉ: </span>
        <span className="text-pretty">
          {device.address ? `${device.address},` : ''}{' '}
          {device.ward?.name ? `${device.ward?.name},` : ''}{' '}
          {device.district?.name ? `${device.district?.name},` : ''}{' '}
          {device.province?.name ? `${device.province?.name}` : ''}
        </span>
      </p>
      {device.imagePath && (
        <div>
          <Image width={'100%'} src={device.imagePath} className="mt-1 rounded-sm" />
        </div>
      )}
    </div>
  );
}
