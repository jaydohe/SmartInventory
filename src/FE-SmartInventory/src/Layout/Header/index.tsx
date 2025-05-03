import BellNotification from '@/assets/img/BellNotification.svg';
import logo from '@/assets/img/Login_Logo.png';
import EOH from '@/assets/img/Eoh-Image.png';
import DrawerComponents from '@/Components/Drawer/index';
import NotificationCom from '@/Components/Notification';
import { ADMIN, MAINTENANCE, OPERATION, SUPERVISION, TECHNICAL } from '@/Constant';
import { useBuilderQuery } from '@/hook';
import { useGetNotification } from '@/hook/useGetNotification';
import { TBuilderQuery } from '@/interface';
import AuthStore, { authStoreSelectors } from '@/Stores/userStore';
import {
  ControlOutlined,
  DownOutlined,
  LoginOutlined,
  ProjectOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Badge, Button, Dropdown, MenuProps, Space, Tabs, TabsProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import { FiAirplay, FiAlertTriangle } from 'react-icons/fi';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { RiRoadMapLine } from 'react-icons/ri';
import { VscRunErrors } from 'react-icons/vsc';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { NavigateNotifyPage, SIZE_NOTIFY_ALL, TNotifyType } from '../../Constant/NotificationState';
import { getItem, getLogOut } from '../../utils';
import ResponsiveMenu from './Components/ResponsiveMenu';
import NotificationStore, { notificationStoreSelectors } from '@/Stores/notificationStore';

export type MenuItem = Required<MenuProps>['items'][number];
// Admin
const Admin: MenuItem[] = [
  {
    label: <span className="">Quản lý đại lý - nhà cung cấp</span>,
    key: 'dashboard',
    icon: <FiAirplay />,
    children: [
      {
        label: <span className=""> Đại lý </span>,
        key: 'user',
        icon: <UserOutlined />,
      },
      {
        label: <span className=""> Nhà cung cấp</span>,
        key: 'user',
        icon: <ControlOutlined />,
      },
    ],
  },

  {
    label: <span className="">Xuất nhập - tồn kho</span>,
    key: 'issue',
    icon: <FiAlertTriangle />,
    children: [
      {
        label: <span className="">Kho bãi</span>,
        key: 'map-issue',
        icon: <RiRoadMapLine />,
      },
      {
        label: <span className="">Nhập kho </span>,
        key: 'ticket-issue',
        icon: <ControlOutlined />,
      },
      {
        label: <span className="">Xuất kho</span>,
        key: 'my-report',
        icon: <MdFormatListBulletedAdd />,
      },

      {
        label: <span className="">Tồn kho</span>,
        key: 'report-issue',
        icon: <VscRunErrors />,
      },
    ],
  },
  {
    label: <span className="">Quản lý hàng hóa</span>,
    key: 'scheme1',
    icon: <ProjectOutlined />,
    children: [
      {
        label: <span className="">Mặt hàng</span>,
        key: 'scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Đơn Hàng</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Lệnh sản xuất</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Định mức nguyên vật liệu</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Quản lí thông minh</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
    ],
  },
  {
    label: <span className="">Nhân sự</span>,
    key: 'user1',
    icon: <UserOutlined />,
    children: [
      {
        label: <span className="">Phòng Ban</span>,
        key: 'state',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Nhân viên</span>,
        key: 'user',
        icon: <UserOutlined />,
      },
    ]
  },
  {
    label: <span className="">Lịch Sử</span>,
    key: 'activity',
    icon: <BsClockHistory />,
  },
];
// WAREHOUSE_STAFF
const Supervision: MenuItem[] = [
  {
    label: <span className="">Quản lý đại lý - nhà cung cấp</span>,
    key: 'dashboard',
    icon: <FiAirplay />,
    children: [
      {
        label: <span className="">Đại Lý</span>,
        key: 'device-map',
        icon: <ControlOutlined />,
      },
      {
        label: <span className="">Nhà cung cấp</span>,
        key: 'device-type',
        icon: <ControlOutlined />,
      },
    ],
  },

  {
    label: <span className="">Xuất nhập - tồn kho</span>,
    key: 'issue',
    icon: <FiAlertTriangle />,
    children: [
      {
        label: <span className="">Kho bãi</span>,
        key: 'map-issue',
        icon: <RiRoadMapLine />,
      },
      {
        label: <span className="">Nhập kho </span>,
        key: 'ticket-issue',
        icon: <ControlOutlined />,
      },
      {
        label: <span className="">Xuất kho</span>,
        key: 'my-report',
        icon: <MdFormatListBulletedAdd />,
      },

      {
        label: <span className="">Tồn kho</span>,
        key: 'report-issue',
        icon: <VscRunErrors />,
      },
    ],
  },
  {
    label: <span className="">Quản lý hàng hóa</span>,
    key: 'scheme1',
    icon: <ProjectOutlined />,
    children: [
      {
        label: <span className="">Mặt hàng</span>,
        key: 'scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Đơn Hàng</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Lệnh sản xuất</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Định mức nguyên vật liệu</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Quản lí thông minh</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
    ],
  },
  {
    label: <span className="">Nhân sự</span>,
    key: 'user1',
    icon: <UserOutlined />,
    children: [
      {
        label: <span className="">Phòng Ban</span>,
        key: 'state',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Nhân viên</span>,
        key: 'user',
        icon: <UserOutlined />,
      },
    ]
  },
  {
    label: <span className="">Lịch Sử</span>,
    key: 'activity',
    icon: <BsClockHistory />,
  },
];


//WAREHOUSE_PRODUCER, SALESMAN

const User: MenuItem[] = [
  {
    label: <span className="">Quản lý đại lý - nhà cung cấp</span>,
    key: 'dashboard',
    icon: <FiAirplay />,
    children: [
      {
        label: <span className="">Đại Lý</span>,
        key: 'device-map',
        icon: <ControlOutlined />,
      },
      {
        label: <span className="">Nhà cung cấp</span>,
        key: 'device-type',
        icon: <ControlOutlined />,
      },
    ],
  },

  {
    label: <span className="">Xuất nhập - tồn kho</span>,
    key: 'issue',
    icon: <FiAlertTriangle />,
    children: [
      {
        label: <span className="">Kho bãi</span>,
        key: 'map-issue',
        icon: <RiRoadMapLine />,
      },
      {
        label: <span className="">Nhập kho </span>,
        key: 'ticket-issue',
        icon: <ControlOutlined />,
      },
      {
        label: <span className="">Xuất kho</span>,
        key: 'my-report',
        icon: <MdFormatListBulletedAdd />,
      },

      {
        label: <span className="">Tồn kho</span>,
        key: 'report-issue',
        icon: <VscRunErrors />,
      },
    ],
  },
  {
    label: <span className="">Quản lý hàng hóa</span>,
    key: 'scheme1',
    icon: <ProjectOutlined />,
    children: [
      {
        label: <span className="">Mặt hàng</span>,
        key: 'scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Đơn Hàng</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Lệnh sản xuất</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Định mức nguyên vật liệu</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Quản lí thông minh</span>,
        key: 'received-scheme',
        icon: <ProjectOutlined />,
      },
    ],
  },
  {
    label: <span className="">Nhân sự</span>,
    key: 'user1',
    icon: <UserOutlined />,
    children: [
      {
        label: <span className="">Phòng Ban</span>,
        key: 'state',
        icon: <ProjectOutlined />,
      },
      {
        label: <span className="">Nhân viên</span>,
        key: 'user',
        icon: <UserOutlined />,
      },
    ]
  },
  {
    label: <span className="">Lịch Sử</span>,
    key: 'activity',
    icon: <BsClockHistory />,
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

  // SiderBar Văn Thư

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
        onClick={() => navigate('/device-map')}
      />
      <ResponsiveMenu
        items={
          role?.toLocaleUpperCase() === MAINTENANCE.toLocaleUpperCase() ||
          role?.toLocaleUpperCase() === TECHNICAL.toLocaleUpperCase()
            ? User
            : role?.toLocaleUpperCase() === SUPERVISION.toLocaleUpperCase()
            ? Supervision
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
