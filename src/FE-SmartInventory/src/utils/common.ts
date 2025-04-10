import { MenuProps, Tag } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
type MenuChildren = {
  type: 'group';
  label: string;
  children?: {
    label: string;
    key: string;
  };
};

export function getChildrenItem(type: string, label: React.ReactNode, key: React.Key): MenuItem {
  return {
    label,
    key,
    type,
  } as MenuItem;
}

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[] | MenuChildren[],
  // disabled?: boolean
  popupClassName?: string
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

export function getLogOut(
  label: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode,
  danger?: boolean,
  disabled?: boolean
): MenuItem {
  return {
    key,
    icon,
    label,
    danger,
    disabled,
  } as MenuItem;
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

