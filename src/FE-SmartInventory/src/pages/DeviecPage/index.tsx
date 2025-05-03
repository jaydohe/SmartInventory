import { MenuItem } from '@/Layout/Header';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Avatar, Col, Layout, Menu, MenuProps, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { LiaCcMastercard } from 'react-icons/lia';
import { GiStreetLight } from 'react-icons/gi';
import { useQueryDeviceType } from '@/hook/useQueryDeviceType';
import { useBuilderQuery } from '@/hook';
import { getItem } from '@/utils';
import { icon } from 'leaflet';
import ComDeviceType from './Components/ComDeviceType';
import { TDeviceType } from '@/interface/TDeviceType';

const { Header, Sider, Content } = Layout;
export interface IDevicePageProps {}

export default function DevicePage(props: IDevicePageProps) {
  const [currentDeviceType, setCurrentDeviceType] = useState<TDeviceType>({
    name: '',
    iconPath: '',
    isGateway: false, // True là Z-Master, False là Z-Inlamp
    id: '123-null',
  });

  const [itemMenu, setItemMenu] = useState<MenuItem[]>([]);
  const [treeData, setTreeData] = useState<any>([]);

  const { getAllDeviceType } = useQueryDeviceType(
    useBuilderQuery({ toJoin: ['id', 'name', 'isGateway', 'iconPath'] })
  );
  const { data: deviceTypeList } = getAllDeviceType;

  useEffect(() => {
    if (deviceTypeList?.data) {
      const ZMaster = deviceTypeList.data.filter((item) => item.isGateway);
      const ZInlamp = deviceTypeList.data.filter((item) => !item.isGateway);

      // For Menu
      const newMenu = [
        getItem(
          <span className="font-medium">Bộ điều khiển (Z-Master)</span>,
          'z-master',
          <LiaCcMastercard className="text-xl font-semibold" />,
          ZMaster.map((item) =>
            getItem(
              `${item.name}`,
              `${item.id}`,
              <Avatar size={'small'} src={item.iconPath}></Avatar>
            )
          )
        ),
        getItem(
          <span className="font-medium">Đèn (Z-Inlamp)</span>,
          'z-inlamp',
          <GiStreetLight className="text-xl font-semibold" />,
          ZInlamp.map((item) =>
            getItem(
              `${item.name}`,
              `${item.id}`,
              <Avatar size={'small'} src={item.iconPath}></Avatar>
            )
          )
        ),
      ];

      // For TreeSelect
      const newTreeData = [
        {
          icon: <LiaCcMastercard className="text-xl font-semibold" />,
          title: <span className="font-medium">Bộ điều khiển (Z-Master)</span>,
          value: 'z-master',
          selectable: false,
          children: ZMaster.map((item) => ({
            title: item.name,
            value: item.id,
            icon: <Avatar size={'small'} src={item.iconPath} />,
          })),
        },
        {
          icon: <GiStreetLight className="text-xl font-semibold" />,
          title: <span className="font-medium">Đèn (Z-Inlamp)</span>,
          value: 'z-inlamp',
          selectable: false,
          children: ZInlamp.map((item) => ({
            title: item.name,
            value: item.id,
            icon: <Avatar size={'small'} src={item.iconPath} />,
          })),
        },
      ];

      setItemMenu(newMenu);
      setTreeData(newTreeData);
    }
  }, [deviceTypeList?.data]);

  const [value, setValue] = useState<string>();

  const onChange = (item: string) => {
    console.log(item);
    const currentDeviceType = deviceTypeList?.data.find((deviceType) => deviceType.id === item);
    if (currentDeviceType) {
      setCurrentDeviceType(currentDeviceType);
    }
  };
  const handleClick: MenuProps['onClick'] = (item) => {
    console.log(item);
    const currentDeviceType = deviceTypeList?.data.find((deviceType) => deviceType.id === item.key);
    if (currentDeviceType) {
      setCurrentDeviceType(currentDeviceType);
    }
  };
  return (
    <Layout className=" h-[calc(100dvh-64px)]">
      <h2 className="z-[500] font-bold text-xl md:text-2xl drop-shadow-sm text-inherit text-pretty px-4 py-2 bg-textWhite uppercase text-primary">
        <UnorderedListOutlined className="text-xl" /> Quản lý thiết bị
      </h2>
      <Header
        style={{ display: 'flex', alignItems: 'center' }}
        className="block lg:hidden px-2 z-[400] drop-shadow-sm"
      >
        <TreeSelect
          // treeLine={true}
          treeIcon={true}
          allowClear
          virtual={false}
          style={{ width: '100%' }}
          className="w-full"
          size="large"
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={treeData}
          placeholder="Duyệt danh mục"
          treeDefaultExpandAll
          onChange={onChange}
        />
      </Header>
      <Layout>
        <Sider
          trigger={null}
          theme="light"
          className=" hidden lg:block overflow-auto"
          width={300}
        >
          <h2 className="font-bold    text-inherit text-pretty pt-4 px-4 uppercase ">
            Danh mục thiết bị
          </h2>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={itemMenu}
            className="border-none"
            onClick={handleClick}
          />
        </Sider>

        <Content className=" border-l-[2px] border-colorBgLayout overflow-auto">
          <ComDeviceType
            key={currentDeviceType?.id}
            currentDeviceType={currentDeviceType}
          ></ComDeviceType>
        </Content>
      </Layout>
    </Layout>
  );
}
