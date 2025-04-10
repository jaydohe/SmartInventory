import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { useWindowSize } from '@/utils/useWindowSize';
export type MenuItem = Required<MenuProps>['items'][number];
import { BsMenuAppFill } from 'react-icons/bs';

interface ResponsiveMenuProps {
  items: MenuItem[];
}

const ResponsiveMenu: React.FC<ResponsiveMenuProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useWindowSize();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick: MenuProps['onClick'] = (item) => {
    if (item.key !== 'IOT') {
      navigate(item.key);
    }
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {isMobile && (
        <div className="flex justify-between items-center bg-white">
          <Button
            type="text"
            size="large"
            icon={
              isMenuOpen ? (
                <BsMenuAppFill className="text-2xl" />
              ) : (
                <MenuOutlined className="text-2xl" />
              )
            }
            onClick={toggleMenu}
            className="mobile-menu-toggle"
          />
        </div>
      )}

      <div
        className={`menu-container  ${
          isMobile ? (isMenuOpen ? 'show' : 'hide') : ''
        }`}
      >
        <Menu
          mode={isMobile ? 'inline' : 'horizontal'}
          className={`responsive-menu  z-[1000000] ${isMobile ? 'mobile-menu' : ''}`}
          style={{
            flex: isMobile ? 'none' : 1,
            minWidth: 0,
            backgroundColor: 'transparent',
            width: isMobile ? '100%' : 'auto',
          }}
          onClick={handleClick}
          defaultOpenKeys={[location.pathname]}
          selectedKeys={[location.pathname]}
          items={items}
        />
      </div>
    </div>
  );
};

export default ResponsiveMenu;
