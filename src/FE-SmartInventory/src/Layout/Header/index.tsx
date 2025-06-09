import BellNotification from '@/assets/img/BellNotification.svg';
import logo from '@/assets/img/Login_Logo.png';
import DrawerComponents from '@/Components/Drawer/index';
import NotificationCom from '@/Components/Notification';
import { ADMIN, WAREHOUSE_STAFF, WAREHOUSE_PRODUCER, SALESMAN } from '@/Constant';
import { useBuilderQuery } from '@/hook';
import { useGetNotification } from '@/hook/useGetNotification';
import { useUserPermissions } from '@/hook/usePermissions';
import { TBuilderQuery } from '@/interface';
import AuthStore, { authStoreSelectors } from '@/Stores/userStore';
import {
  DownOutlined,
  LoginOutlined,
  UserOutlined,
  BarChartOutlined,
  BoxPlotOutlined,
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  CarOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  ImportOutlined,
  ExportOutlined,
  DatabaseOutlined,
  UserSwitchOutlined,
  BankOutlined,
  SafetyOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  ToolOutlined,
  DollarCircleOutlined,
  BuildOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Badge, Button, Dropdown, MenuProps, Space, Tabs, TabsProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { NavigateNotifyPage, SIZE_NOTIFY_ALL, TNotifyType } from '../../Constant/NotificationState';
import { getItem, getLogOut } from '../../utils';
import ResponsiveMenu from './Components/ResponsiveMenu';
import NotificationStore, { notificationStoreSelectors } from '@/Stores/notificationStore';

export type MenuItem = Required<MenuProps>['items'][number];

// Function to generate menu items based on user permissions
const generateMenuItems = (permissions: ReturnType<typeof useUserPermissions>): MenuItem[] => {
  const menuItems: MenuItem[] = [];

  // Dashboard - available for all users
  if (permissions.canAccess('Dashboard')) {
    menuItems.push(getItem(<span className="">Trang chủ</span>, 'dashboard', <BarChartOutlined />));
  }

  // Thiết lập section
  const configChildren: MenuItem[] = [];

  // Danh mục sub-menu
  const categoryChildren: MenuItem[] = [];
  if (permissions.canAccess('CategoryProductPage')) {
    categoryChildren.push(
      getItem(<span className="">Sản phẩm</span>, 'category/product', <BoxPlotOutlined />)
    );
  }
  if (permissions.canAccess('CategoryWarehousePage')) {
    categoryChildren.push(
      getItem(<span className="">Kho</span>, 'category/warehouse', <HomeOutlined />)
    );
  }
  if (categoryChildren.length > 0) {
    configChildren.push(
      getItem(
        <span className="">Danh mục</span>,
        'category',
        <AppstoreOutlined />,
        categoryChildren
      )
    );
  }

  if (permissions.canAccess('AgencyPage')) {
    configChildren.push(getItem(<span className="">Đại lý</span>, 'agency', <TeamOutlined />));
  }

  if (permissions.canAccess('MaterialSupplierPage')) {
    configChildren.push(
      getItem(<span className="">Nhà cung cấp NVL</span>, 'material-supplier', <CarOutlined />)
    );
  }

  if (permissions.canAccess('SetupPage')) {
    configChildren.push(
      getItem(<span className="">Thiết lập thông số</span>, 'set-parameter', <SettingOutlined />)
    );
  }

  if (configChildren.length > 0) {
    menuItems.push(
      getItem(<span className="">Thiết lập</span>, 'config', <InfoCircleOutlined />, configChildren)
    );
  }

  // Kho section
  const warehouseChildren: MenuItem[] = [];
  if (permissions.canAccess('Warehouse')) {
    warehouseChildren.push(
      getItem(<span className="">Kho, bãi</span>, 'warehouse', <HomeOutlined />)
    );
  }
  if (permissions.canAccess('GoodsReceiptPage')) {
    warehouseChildren.push(
      getItem(<span className="">Nhập kho</span>, 'goods-receipt', <ImportOutlined />)
    );
  }
  if (permissions.canAccess('GoodsIssuePage')) {
    warehouseChildren.push(
      getItem(<span className="">Xuất kho</span>, 'goods-issue', <ExportOutlined />)
    );
  }
  if (permissions.canAccess('InventoryPage')) {
    warehouseChildren.push(
      getItem(<span className="">Tồn kho</span>, 'inventory', <DatabaseOutlined />)
    );
  }

  if (warehouseChildren.length > 0) {
    menuItems.push(
      getItem(
        <span className="">Kho</span>,
        'manage-warehouse',
        <HomeOutlined />,
        warehouseChildren
      )
    );
  }

  // Quản lý nhân sự section
  const hrChildren: MenuItem[] = [];
  if (permissions.canAccess('Employee')) {
    hrChildren.push(getItem(<span className="">Nhân sự</span>, 'employee', <UserSwitchOutlined />));
  }
  if (permissions.canAccess('User')) {
    hrChildren.push(getItem(<span className="">Tài khoản</span>, 'user', <UserOutlined />));
  }
  if (permissions.canAccess('DepartmentPage')) {
    hrChildren.push(getItem(<span className="">Phòng ban</span>, 'department', <BankOutlined />));
  }
  if (permissions.canAccess('PositionPage')) {
    hrChildren.push(getItem(<span className="">Chức vụ</span>, 'position', <SafetyOutlined />));
  }

  if (hrChildren.length > 0) {
    menuItems.push(
      getItem(
        <span className="">Quản lý nhân sự</span>,
        'user',
        <UsergroupAddOutlined />,
        hrChildren
      )
    );
  }

  // Sản xuất section
  const productionChildren: MenuItem[] = [];
  if (permissions.canAccess('ProductPage')) {
    productionChildren.push(
      getItem(<span className="">Sản phẩm</span>, 'product', <BoxPlotOutlined />)
    );
  }
  if (permissions.canAccess('OrderPage')) {
    productionChildren.push(
      getItem(<span className="">Đơn hàng</span>, 'order', <FileTextOutlined />)
    );
  }
  if (permissions.canAccess('ProductionCommandPage')) {
    productionChildren.push(
      getItem(<span className="">Lệnh sản xuất</span>, 'production-command', <ToolOutlined />)
    );
  }
  if (permissions.canAccess('BomPage')) {
    productionChildren.push(
      getItem(<span className="">Định mức NVL</span>, 'bom', <DollarCircleOutlined />)
    );
  }

  if (productionChildren.length > 0) {
    menuItems.push(
      getItem(
        <span className="">Sản xuất</span>,
        'production',
        <BuildOutlined />,
        productionChildren
      )
    );
  }

  // Lịch sử
  if (permissions.canAccess('Activity')) {
    menuItems.push(getItem(<span className="">Lịch Sử</span>, 'activity', <HistoryOutlined />));
  }

  return menuItems;
};

export interface HeaderV1Props {
  // collapsed: boolean;
  // setCollapsed: any;
}

export default function HeaderV1({}: HeaderV1Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userId = authStoreSelectors.use.userId() ?? '';
  const unreadNumber = notificationStoreSelectors.use.unreadNumber() ?? '';
  const name = authStoreSelectors.use.name();
  const permissions = useUserPermissions();

  const [filter, setFilter] = useState<TBuilderQuery>({
    toPaging: {
      page: 1,
      pageSize: SIZE_NOTIFY_ALL,
    },
    isAsc: false,
    orderBy: 'createdAt',
    appendQuery: [
      {
        userId: {
          value: userId,
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  // Generate menu items based on user permissions
  const menuItems = useMemo(() => generateMenuItems(permissions), [permissions]);
  console.log('menuItems', menuItems, permissions);
  const { getAllNotification, markAsRead } = useGetNotification(useBuilderQuery(filter));

  const [isOpenNotify, setIsOpenNotify] = useState<boolean>(false);
  const handleCloseDrawer = () => {
    setIsOpenNotify(!isOpenNotify);
  };
  const handleOpenNotify = () => {
    setIsOpenNotify(true);
  };

  const logout = () => {
    AuthStore.getState().logOut();
    queryClient.clear(); // Đảm bảo gọi trong hàm logout đã có hook trong component
    window.location.href = '/login';
  };
  const userItems: MenuProps['items'] = [
    getItem(
      <span className="text-base flex items-centers gap-2" onClick={() => navigate('/self')}>
        <UserOutlined className="text-sm" />
        Hồ sơ
      </span>,
      '/self'
    ),

    getLogOut(
      <>
        <span className="text-base font-[500] " onClick={logout}>
          Đăng xuất
        </span>
      </>,
      '/login',
      <LoginOutlined onClick={logout} />,
      true
    ),
  ];

  const handleNavigateNotify = (
    typeNavigate: TNotifyType,
    targetId: string
    // notifyId: string
  ) => {
    console.log('readNotification');
    // dispatch(readNotification({ NotifyId: notifyId }));
    handleCloseDrawer();
    navigate(NavigateNotifyPage(typeNavigate), { state: { targetId: targetId } });
  };

  const handleRealAllNotify = () => {
    // dispatch(makeRealAllNotify());
    if (getAllNotification.data) {
      const data = getAllNotification.data.data.map((item) => item.id);
      markAsRead.mutate(data, {
        onSuccess: () => {
          toast.success('Đánh dấu đã đọc tất cả thành công');
          handleCloseDrawer();
        },
      });
      // console.log('makeRealAllNotify');
    }
  };
  const handleMakeAsReadNotify = (id: string) => {
    const data = [id];
    markAsRead.mutate(data);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tất cả',
      children: (
        <NotificationCom
          getAllNotification={getAllNotification}
          handleMakeAsReadNotify={handleMakeAsReadNotify}
          handleNavigateNotify={handleNavigateNotify}
        />
      ),
    },
    {
      key: '2',
      label: 'Chưa đọc',
      children: (
        <NotificationCom
          getAllNotification={getAllNotification}
          handleMakeAsReadNotify={handleMakeAsReadNotify}
          handleNavigateNotify={handleNavigateNotify}
          isRead={false}
        />
      ),
    },
  ];

  const location = useLocation().pathname;
  const role = authStoreSelectors.use.role();

  // SiderBar

  return (
    <Header
      style={{
        padding: 0,
        position: 'sticky', //sticky
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
      className={`shadow-sm   sm:bg-no-repeat sm:bg-center sm:bg-cover`}
    >
      {/* <div className="h-full items-center text-lg text-white shadow-sm p-0 font-bold   transition-all">

      </div> */}
      <img
        src={logo}
        alt=""
        className="h-full w-autotext-center object-scale-down cursor-pointer px-4 py-3"
        onClick={() => navigate('/dashboard')}
      />
      <ResponsiveMenu items={menuItems} />

      <Space className="flex justify-end w-full min-w-fit mr-2 md:mx-4 gap-2 sm:gap-2">
        <div
          // className={`h-full ${unreadNumber  > 0 && 'mr-3'}`}
          className={`h-full ${'mr-3'}`}
          onClick={() => {
            handleOpenNotify();
          }}
        >
          <Badge count={unreadNumber} overflowCount={99} offset={[0, 5]}>
            <Avatar
              size={'large'}
              className="p-2 h-full align-middle rounded-full bg-primary text-textWhite  text-[20px] hover:rotate-6 hover:transition-all"
              // icon={<MdOutlineNotificationsActive className='text-xl font-medium'/>}
              src={BellNotification}
            />
          </Badge>
        </div>
        <div className="h-full ">
          <Dropdown
            menu={{
              items: userItems,
            }}
            placement="bottomRight"
            arrow
            trigger={['click']}
            // className="min-w-min"
          >
            <Button
              onClick={(e) => e.preventDefault()}
              className="py-0 px-2 align-middle "
              type="primary"
              size="large"
              shape="round"
            >
              <UserOutlined className={' text-[20px] pb-[3px]  align-middle'} />
              <span className="text-base font-[500]  hidden sm:inline-block">{name}</span>
              <DownOutlined className="align-middle" />
            </Button>
          </Dropdown>
        </div>
      </Space>

      {isOpenNotify && (
        // && unreadNumber >= 0
        <DrawerComponents
          title={`Thông báo `}
          paddingTop={true}
          openDrawer={isOpenNotify}
          handleCloseDrawer={handleCloseDrawer}
          children={
            <Tabs
              className="px-4"
              defaultActiveKey="1"
              items={items}
              tabBarExtraContent={
                <>
                  <Button
                    type="link"
                    size="middle"
                    disabled={unreadNumber === 0}
                    className={`${unreadNumber === 0 ? ' cursor-not-allowed' : ''}`}
                    onClick={() => handleRealAllNotify()}
                  >
                    Đã đọc tất cả
                  </Button>
                </>
              }
            />
          }
          width={window.innerWidth >= 1025 ? '35%' : '100%'}
        />
      )}
    </Header>
  );
}
