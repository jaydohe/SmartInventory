import BellNotification from '@/assets/img/BellNotification.svg';
import logo from '@/assets/img/logo1.png';
import DrawerComponents from '@/Components/Drawer/index';
import NotificationCom from '@/Components/Notification';
import { ADMIN, WAREHOUSE_STAFF, WAREHOUSE_PRODUCER, SALESMAN } from '@/Constant';
import { useBuilderQuery } from '@/hook';
import { useGetNotification } from '@/hook/useGetNotification';
import { TBuilderQuery } from '@/interface';
import AuthStore, { authStoreSelectors } from '@/Stores/userStore';
import { DownOutlined, LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Badge, Button, Dropdown, MenuProps, Space, Tabs, TabsProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { FaBox, FaChartBar, FaFileInvoiceDollar, FaHistory, FaInfoCircle, FaReceipt, FaSlidersH, FaTruck, FaTruckLoading, FaUsers, FaUserTie, FaWarehouse } from 'react-icons/fa';
import { FaBuildingUser } from "react-icons/fa6";
import { GiHandTruck } from "react-icons/gi";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { MdConveyorBelt, MdFactory, MdInventory, MdOutlineCategory, MdWarehouse, MdWork } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { NavigateNotifyPage, SIZE_NOTIFY_ALL, TNotifyType } from '../../Constant/NotificationState';
import { getItem, getLogOut } from '../../utils';
import ResponsiveMenu from './Components/ResponsiveMenu';
import NotificationStore, { notificationStoreSelectors } from '@/Stores/notificationStore';

export type MenuItem = Required<MenuProps>['items'][number];

const Admin: MenuItem[] = [
  {
    label: <span className="">Thiết lập</span>,
    key: 'dashboard',
    icon: <FaInfoCircle />,
    children: [
        {
            label: <span className="">Nhân sự</span>,
            key: 'employee',
            icon: <FaUserTie />,
        },
        {
            label: <span className="">Phòng ban</span>,
            key: 'department',
            icon: <HiMiniBuildingOffice2 />,
        },
        {
            label: <span className="">Danh mục</span>,
            key: 'category',
            icon: <MdOutlineCategory />,
        },
        {
            label: <span className="">Chức vụ</span>,
            key: 'position',
            icon: <MdWork />,
        },
        {
            label: <span className="">Đại lý</span>,
            key: 'agency',
            icon: <FaBuildingUser />,
        },
        {
            label: <span className="">Nhà cung cấp NVL</span>,
            key: 'material-supplier',
            icon: <FaTruck />,
        },
        {
            label: <span className="">Thiết lập thông số</span>,
            key: 'set-parameter',
            icon: <FaSlidersH />,
        },
        {
          label: <span className="">Thông minh</span>,
          key: 'smart-management',
          icon: <FaChartBar />
        },
    ],
  },
  {
    label: <span className="">Kho</span>,
    key: 'manage-warehouse',
    icon: <FaWarehouse  />,
    children: [
      {
        label: <span className="">Kho, bãi</span>,
        key: 'warehouse',
        icon: <MdWarehouse  />,
      },
      {
        label: <span className="">Nhập kho</span>,
        key: 'goods-receipt',
        icon: <GiHandTruck />,
      },
      {
        label: <span className="">Xuất kho</span>,
        key: 'goods-issue',
        icon: <FaTruckLoading />,
      },
      {
        label: <span className="">Tồn kho</span>,
        key: 'inventory',
        icon: <MdInventory />,
      },
    ],
  },
  {
    label: <span className="">Người dùng</span>,
    key: 'user',
    icon: <FaUsers />,
  },
  {
    label: <span className="">Sản xuất</span>,
    key: 'production',
    icon: <MdFactory />,
    children: [
      {
        label: <span className="">Hàng hóa</span>,
        key: 'product',
        icon: <FaBox />,
      },
      {
        label: <span className="">Đơn hàng</span>,
        key: 'order',
        icon: <FaReceipt />,
      },
      {
        label: <span className="">Lệnh sản xuất</span>,
        key: 'production-command',
        icon: <MdConveyorBelt />,
      },
      {
        label: <span className="">Định mức NVL</span>,
        key: 'bom',
        icon: <FaFileInvoiceDollar />,
      },
    ],
  },
  {
    label: <span className="">Lịch Sử</span>,
    key: 'activity',
    icon: <FaHistory />,
  }
];
const Warehouse_staff: MenuItem[] = [
  {
    label: <span className="">Thiết lập</span>,
    key: 'dashboard',
    icon: <FaInfoCircle />,
    children: [
        {
            label: <span className="">Nhân sự</span>,
            key: 'employee',
            icon: <FaUserTie />,
        },
        {
            label: <span className="">Phòng ban</span>,
            key: 'department',
            icon: <HiMiniBuildingOffice2 />,
        },
        {
            label: <span className="">Danh mục</span>,
            key: 'category',
            icon: <MdOutlineCategory />,
        },
        {
            label: <span className="">Đại lý</span>,
            key: 'agency',
            icon: <FaBuildingUser />,
        },
        {
            label: <span className="">Nhà cung cấp NVL</span>,
            key: 'material-supplier',
            icon: <FaTruck />,
        },
        {
          label: <span className="">Thông minh</span>,
          key: 'smart-management',
          icon: <FaChartBar />
        },
    ],
  },
  {
    label: <span className="">Kho</span>,
    key: 'manage-warehouse',
    icon: <FaWarehouse  />,
    children: [
      {
        label: <span className="">Kho, bãi</span>,
        key: 'warehouse',
        icon: <MdWarehouse  />,
      },
      {
        label: <span className="">Nhập kho</span>,
        key: 'goods-receipt',
        icon: <GiHandTruck />,
      },
      {
        label: <span className="">Xuất kho</span>,
        key: 'goods-issue',
        icon: <FaTruckLoading />,
      },
      {
        label: <span className="">Tồn kho</span>,
        key: 'inventory',
        icon: <MdInventory />,
      },
    ],
  },
  {
    label: <span className="">Sản xuất</span>,
    key: 'production',
    icon: <MdFactory />,
    children: [
      {
        label: <span className="">Hàng hóa</span>,
        key: 'product',
        icon: <FaBox />,
      },
      {
        label: <span className="">Đơn hàng</span>,
        key: 'order',
        icon: <FaReceipt />,
      },
      {
        label: <span className="">Lệnh sản xuất</span>,
        key: 'production-command',
        icon: <MdConveyorBelt />,
      },
      {
        label: <span className="">Định mức NVL</span>,
        key: 'bom',
        icon: <FaFileInvoiceDollar />,
      },
    ],
  },
  {
    label: <span className="">Lịch Sử</span>,
    key: 'activity',
    icon: <FaHistory />,
  }
];
const Warehouse_producer: MenuItem[] = [
  {
    label: <span className="">Kho</span>,
    key: 'manage-warehouse',
    icon: <FaWarehouse  />,
    children: [
      {
        label: <span className="">Tồn kho</span>,
        key: 'inventory',
        icon: <MdInventory />,
      },
    ],
  },
  {
    label: <span className="">Sản xuất</span>,
    key: 'production',
    icon: <MdFactory />,
    children: [
      {
        label: <span className="">Hàng hóa</span>,
        key: 'product',
        icon: <FaBox />,
      },
      {
        label: <span className="">Lệnh sản xuất</span>,
        key: 'production-command',
        icon: <MdConveyorBelt />,
      },
      {
        label: <span className="">Định mức NVL</span>,
        key: 'bom',
        icon: <FaFileInvoiceDollar />,
      },
    ],
  },
];
const Salesman: MenuItem[] = [
  {
    label: <span className="">Thiết lập</span>,
    key: 'dashboard',
    icon: <FaInfoCircle />,
    children: [
        {
            label: <span className="">Đại lý</span>,
            key: 'agency',
            icon: <FaBuildingUser />,
        },
    ],
  },
  {
    label: <span className="">Kho</span>,
    key: 'manage-warehouse',
    icon: <FaWarehouse  />,
    children: [
      {
        label: <span className="">Tồn kho</span>,
        key: 'inventory',
        icon: <MdInventory />,
      },
    ],
  },
  {
    label: <span className="">Sản xuất</span>,
    key: 'production',
    icon: <MdFactory />,
    children: [
      {
        label: <span className="">Hàng hóa</span>,
        key: 'product',
        icon: <FaBox />,
      },
      {
        label: <span className="">Đơn hàng</span>,
        key: 'order',
        icon: <FaReceipt />,
      },
      {
        label: <span className="">Lệnh sản xuất</span>,
        key: 'production-command',
        icon: <MdConveyorBelt />,
      },
    ],
  },
];

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

  // const { data } = useGetUnReadCount();
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
        className="h-full w-auto pb-1 text-center object-scale-down cursor-pointer"
        onClick={() => navigate('/dashboard')}
      />
      <ResponsiveMenu
        items={
          role?.toLocaleUpperCase() === WAREHOUSE_STAFF.toLocaleUpperCase()
          ? Warehouse_staff
          : role?.toLocaleUpperCase() === WAREHOUSE_PRODUCER.toLocaleUpperCase()
          ? Warehouse_producer
          : role?.toLocaleUpperCase() === SALESMAN.toLocaleUpperCase()
          ? Salesman
          : Admin
        }
      />

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
