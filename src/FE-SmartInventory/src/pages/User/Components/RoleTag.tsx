import React from 'react';
import { Tag } from 'antd';
import {
  ToolOutlined,
  EyeOutlined,
  SettingOutlined,
  SafetyOutlined,
  FundOutlined,
  AndroidOutlined,
  GithubOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { RoleEnumString, roleName } from '@/Constant';
import classNames from 'classnames';

const RoleTag = ({
  role,
  className,
  userName,
}: {
  role: RoleEnumString;
  className?: string;
  userName?: string;
}) => {
  let icon;
  let color;
  switch (role) {
    case RoleEnumString.WAREHOUSE_STAFF:
      icon = <FundOutlined />;
      color = 'blue';
      break;
    case RoleEnumString.WAREHOUSE_PRODUCER:
      icon = <EyeOutlined />;
      color = 'purple';
      break;
    case RoleEnumString.SALESMAN:
      icon = <SettingOutlined />;
      color = 'orange';
      break;
    case RoleEnumString.ADMIN:
      icon = <UserOutlined />;
      color = 'cyan';
      break;
    case RoleEnumString.DEV:
      icon = <GithubOutlined />;
      color = 'magenta';
      break;
    default:
      icon = null;
      color = 'default';
  }
  return (
    <Tag className={classNames('text-sm font-medium mx-0 w-fit  ', className)} icon={icon} color={color}>
      {userName ? (
        <span className="">
          {userName} ({roleName[role] || role})
        </span>
      ) : (
        <span className="">{roleName[role] || role}</span>
      )}
    </Tag>
  );
};

export default RoleTag;
