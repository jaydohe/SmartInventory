export type TDeviceType = {
  name: string;
  iconPath: string;
  isGateway: boolean; // True là Z-Master, False là Z-Inlamp
  id: string;
};

export type TCreateDeviceType = Pick<TDeviceType, 'name' | 'iconPath'>;

export interface TUpdateDeviceType {
  name?: string;
  iconPath?: string;
}
