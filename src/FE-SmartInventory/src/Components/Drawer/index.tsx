import { Button, Drawer, Select, Space, Tooltip } from 'antd';
import { ReactNode, memo } from 'react';
import { WechatOutlined } from '@ant-design/icons';
export interface IDrawerProps {
  openDrawer: boolean;
  handleCloseDrawer: () => void;
  handleSubmit?: () => void;
  children: ReactNode;
  width: string;
  maskClosable?: boolean;
  closeTitle?: string;
  submitTitle?: string;
  title: string | ReactNode;
  footer?: ReactNode;
  paddingTop?: boolean;
  styles?: any;
}

function DrawerComponents({
  openDrawer,
  handleCloseDrawer,
  maskClosable = true,
  handleSubmit,
  children,
  width,
  closeTitle,
  submitTitle,
  title,
  paddingTop,
  footer,
  styles,
}: IDrawerProps) {
  return (
    <>
      <Drawer
        footer={footer}
        maskClosable={maskClosable}
        title={<h2 className="text-lg xl:text-xl text-primary">{title}</h2>}
        width={width}
        onClose={handleCloseDrawer}
        open={openDrawer}
        styles={
          paddingTop
            ? {
                body: {
                  padding: 0,
                },
                ...styles,
              }
            : { ...styles }
        }
        extra={
          <Space>
            {closeTitle && <Button onClick={handleCloseDrawer}>{closeTitle}</Button>}
            {submitTitle && (
              <Tooltip placement="left" title={submitTitle}>
                <Button
                  size="large"
                  className="rounded-full"
                  onClick={handleSubmit}
                  type="primary"
                  icon={<WechatOutlined />}
                ></Button>
              </Tooltip>
            )}
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
}
export default memo(DrawerComponents);
