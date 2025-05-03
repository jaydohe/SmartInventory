import React from 'react';
import { Tag } from 'antd';
import {
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { SchemeStatus } from '@/Constant';

interface StatusTagProps {
  status: SchemeStatus;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  switch (status) {
    case SchemeStatus.CANCLED:
      return (
        <Tag color="red" className="text-medium text-sm" icon={<CloseCircleOutlined />}>
          Đã hủy
        </Tag>
      );
    case SchemeStatus.CREATED:
      return (
        <Tag color="cyan" className="text-medium text-sm" icon={<PlusCircleOutlined />}>
          Thêm mới
        </Tag>
      );
    case SchemeStatus.PROCESSING:
      return (
        <Tag color="blue" className="text-medium text-sm" icon={<SyncOutlined />}>
          Đang xử lý
        </Tag>
      );
    case SchemeStatus.COMPLETED:
      return (
        <Tag color="green" className="text-medium text-sm" icon={<CheckCircleOutlined />}>
          Hoàn thành
        </Tag>
      );
    default:
      return (
        <Tag color="default" className="text-medium text-sm">
          Không xác định
        </Tag>
      );
  }
};

export default StatusTag;
