export enum StatusDevice {
  activated = 'ACTIVATED',
  inventory = 'INVENTORY',
}

export enum RecordTypes {
  Text = 0,
  DateTime = 1,
  Number = 2,
}

export const RecordTypesList = [
  { id: RecordTypes.Text, name: 'Chữ' },
  { id: RecordTypes.Number, name: 'Số' },
  { id: RecordTypes.DateTime, name: 'Ngày' },
];

export enum SchemeStatus {
  CANCLED = -1,
  CREATED = 0,
  PROCESSING = 1,
  COMPLETED = 2,
}

export const SchemeStatusNames: Record<SchemeStatus, string> = {
  [SchemeStatus.CANCLED]: 'Đã hủy',
  [SchemeStatus.CREATED]: 'Thêm mới',
  [SchemeStatus.PROCESSING]: 'Đang xử lý ',
  [SchemeStatus.COMPLETED]: 'Hoàn thành',
};

export const SchemeStatusList = [
  { name: 'Đã hủy', id: SchemeStatus.CANCLED },
  { name: 'Thêm mới', id: SchemeStatus.CREATED },
  { name: 'Đang xử lý', id: SchemeStatus.PROCESSING },
  { name: 'Hoàn thành', id: SchemeStatus.COMPLETED },
];
