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
import { RiAdminFill } from 'react-icons/ri';
import { SiDevdotto } from 'react-icons/si';

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
    case RoleEnumString.OPERATION:
      icon = <FundOutlined />;
      color = 'blue';
      break;
    case RoleEnumString.SUPERVISION:
      icon = <EyeOutlined />;
      color = 'purple';
      break;
    case RoleEnumString.TECHNICAL:
      icon = <SettingOutlined />;
      color = 'orange';
      break;
    case RoleEnumString.MAINTENANCE:
      icon = <ToolOutlined />;
      color = 'green';
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
    <Tag className={classNames('text-sm font-medium mx-0 w-fit  truncate', className)} icon={icon} color={color}>
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
