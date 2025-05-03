import SearchInput from '@/Components/SearchInput';
import { ADMIN, QueryKeys, SchemeStatus } from '@/Constant';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { TScheme } from '@/interface/TScheme';
import { authStoreSelectors } from '@/Stores/userStore';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  QuestionCircleFilled,
  SyncOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, DatePicker, Drawer, Input, Modal, Select, Tabs, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useQueryUser } from '../User/Hook/useQueryUser';
import CreateScheme from './Components/CreateScheme';
import SchemeDetail from './Components/SchemeDetail';
import SchemeTable from './Components/SchemeTable';
import { useQueryDetailScheme, useQueryScheme } from './Hook/useQueryScheme';

import { RangePickerProps } from 'antd/es/date-picker';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

export const schemeTabs = [
  { key: 'all', title: 'Tất cả', icon: '', status: '' },
  {
    key: SchemeStatus.CREATED,
    title: 'Thêm mới',
    icon: <PlusCircleOutlined />,
    status: SchemeStatus.CREATED,
  },
  {
    key: SchemeStatus.PROCESSING,
    title: 'Đang xử lý',
    icon: <SyncOutlined />,
    status: SchemeStatus.PROCESSING,
  },
  {
    key: SchemeStatus.COMPLETED,
    title: 'Hoàn thành',
    icon: <CheckCircleOutlined />,
    status: SchemeStatus.COMPLETED,
  },
  {
    key: SchemeStatus.CANCLED,
    title: 'Đã hủy',
    icon: <CloseCircleOutlined />,
    status: SchemeStatus.CANCLED,
  },
];

const Scheme: React.FC = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isOpenDelete, setIsOpenDelete] = useState<{
    isOpen: boolean;
    scheme?: TScheme;
  }>({ isOpen: false });

  const userId = authStoreSelectors.use.userId();
  const role = authStoreSelectors.use.role();
  const unitId = authStoreSelectors.use.unitId();

  const [filter, setFilter] = useState<TBuilderQuery>({
    appendQuery: [
      {
        userId: {
          value: role == ADMIN ? '' : userId ?? '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
      {
        'user.unitId': {
          value: role === ADMIN ? unitId ?? '' : '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
      {
        name: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$and',
        },
      },
      {
        createdAt: {
          value: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
          queryOperator: '$lte',
          queryOperatorParent: '$and',
        },
      },
      {
        createdAt: {
          value: moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          queryOperator: '$gte',
          queryOperatorParent: '$and',
        },
      },
      {
        status: {
          value: '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
    orderBy: 'createdAt',
    isAsc: false,
    toPaging: {
      page: 1,
      pageSize: 10,
    },
    toJoin: ['processes.user.name', 'user.name'],
  });

  const { getAllUser } = useQueryUser(
    useBuilderQuery({
      isAsc: false,
      toPaging: {
        page: 1,
        pageSize: 10,
      },
      toJoin: ['unit.*'],
    })
  );

  const { getAllScheme, createScheme, deleteScheme } = useQueryScheme(useBuilderQuery(filter), {
    enabled: !!userId && !!role && !!unitId,
  });

  const { data: schemeDetail } = useQueryDetailScheme(
    selectedSchemeId,
    useBuilderQuery({
      toJoin: ['processes.user.*', 'user.*', 'subFiles.*'],
    })
  );

  const { data: listScheme } = getAllScheme;
  const { data: listUser } = getAllUser;

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

  const handleCreateScheme = (data: TScheme) => {
    createScheme.mutate(data, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenDrawer = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleTabChange = (key: string) => {
    const statusValue = key === 'all' ? '' : key;
    setActiveTab(statusValue);
    setFilter((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('status' in item) {
          return {
            status: {
              ...item.status,
              value: statusValue,
            },
          };
        }
        return item;
      });
      return {
        ...pre,
        toPaging: {
          ...pre.toPaging,
          page: 1,
          pageSize: pre.toPaging?.pageSize || 10,
        },
        appendQuery: newAppendQuery,
      };
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setFilter({
      ...filter,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleSearchValue = (valueSearch: string) => {
    setFilter((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('name' in item) {
          return {
            name: {
              ...item.name,
              value: valueSearch,
            },
          };
        }
        return item;
      });

      return {
        ...pre,
        toPaging: {
          ...pre.toPaging,
          page: 1,
          pageSize: pre.toPaging?.pageSize || 10,
        },
        appendQuery: newAppendQuery,
      };
    });
  };

  const onRangeChangeAll = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setFilter((pre) => {
        // Tạo appendQuery mới bằng cách map qua mảng cũ
        const newAppendQuery = pre.appendQuery?.map((item) => {
          if ('createdAt' in item && item['createdAt'].queryOperator === '$lte') {
            return {
              createdAt: {
                ...item.createdAt,
                value: moment(dateStrings[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
              },
            };
          }
          if ('createdAt' in item && item['createdAt'].queryOperator === '$gte') {
            return {
              createdAt: {
                ...item.createdAt,
                value: moment(dateStrings[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
              },
            };
          }
          return item; // Giữ nguyên các item khác
        });

        return {
          ...pre,
          toPaging: {
            ...pre.toPaging,
            page: 1,
            pageSize: pre.toPaging?.pageSize || 10,
          },
          appendQuery: newAppendQuery,
        };
      });
    }
  };

  // const handleStatusChange = (values: string[]) => {
  //   setStatusFilter(values);
  //   setFilter((pre) => {
  //     const statusQueries : TQueryCondition[] = values.map((value) => ({
  //       status: {
  //         value: value,
  //         queryOperator: '$eq',
  //         queryOperatorParent: '$and',
  //       },
  //     }));

  //     const newAppendQuery = [
  //       ...(pre.appendQuery ?? []).filter((item) => !('status' in item)),
  //       ...statusQueries,
  //     ];

  //     console.log('newAppendQuery', newAppendQuery);

  //     return {
  //       ...pre,
  //       toPaging: {
  //         ...pre.toPaging,
  //         page: 1,
  //         pageSize: pre.toPaging?.pageSize || 10,
  //       },
  //       appendQuery: newAppendQuery,
  //     };
  //   });
  // };

  useEffect(() => {
    if (state && state.targetId) {
      console.log(state);
      setIsDrawerVisible(true);
      setSelectedSchemeId(state.targetId);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DETAIL_SCHEME, state.targetId],
      });
    }
  }, [state]);
  useEffect(() => {
    // Nếu có state, cập nhật URL để xóa state
    if (state) {
      // Thay thế URL hiện tại bằng URL không có state
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const handleDeleteScheme = () => {
    if (isOpenDelete.scheme) {
      deleteScheme.mutate(isOpenDelete.scheme.id, {
        onSuccess: (data) => {
          setIsOpenDelete({ isOpen: false });
        },
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between flex-col lg:flex-row pb-4">
        <div className="min-w-fit flex flex-col sm:flex-row items-center  gap-2">
          <Title level={3} className="uppercase mb-0">
            QUẢN LÍ KẾ HOẠCH
          </Title>
          <Button
            className="rounded-2xl w-full sm:w-fit"
            variant="solid"
            color="primary"
            icon={<PlusOutlined />}
            onClick={handleOpenModal}
          >
            <span className="text-base font-semibold">Thêm kế hoạch</span>
          </Button>
        </div>
        <div className="flex gap-4 w-full lg:justify-end flex-col md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex flex-row justify-end items-center">
              <h2 className="font-medium min-w-fit">Thời gian:</h2>
              <RangePicker
                className="w-full"
                // size="large"
                style={{ width: '100%' }}
                popupClassName={' invisible w-1/2 lg:visible lg:w-fit'}
                // popupStyle={{ width: '80vw' }}
                format="YYYY/M/D"
                disabledDate={disabledDate}
                defaultValue={[
                  dayjs(dayjs().add(-7, 'd'), 'YYYY/MM/DD'),
                  // dayjs(dayjs(), 'YYYY/MM/DD'),
                  dayjs(dayjs(), 'YYYY/MM/DD'),
                ]}
                onChange={onRangeChangeAll}
              />
            </div>
          </div>
          <div className="w-full md:w-1/3 flex gap-4 items-center">
            <SearchInput placeholder="Tìm kiếm kế hoạch" handleSearchValue={handleSearchValue} />
          </div>
        </div>
      </div>

      <Tabs defaultActiveKey="all" onChange={handleTabChange}>
        {schemeTabs.map((tab) => (
          <TabPane
            tab={
              <div className="uppercase text-sm font-medium flex flex-row items-center gap-1">
                {tab.icon}
                {tab.title}
              </div>
            }
            key={tab.key}
          >
            <SchemeTable
              data={
                tab.key === 'all'
                  ? listScheme?.data
                  : listScheme?.data.filter((scheme) => scheme.status === tab.status)
              }
              pagination={{
                position: ['bottomCenter'],
                defaultCurrent: 1,
                showSizeChanger: true,
                onChange: handlePageChange,
                total: listScheme?.totalRecords,
                current: filter.toPaging?.page,
                pageSize: filter.toPaging?.pageSize,
              }}
              handleOpenDrawer={handleOpenDrawer}
              handleOpenDelete={(scheme) => setIsOpenDelete({ isOpen: true, scheme: scheme })}
            />
          </TabPane>
        ))}
      </Tabs>

      <Drawer
        title={<h4 className="font-bold text-primary ">TẠO KẾ HOẠCH MỚI</h4>}
        open={isOpenModal}
        onClose={handleCloseModal}
        footer={null}
        size="large"
        maskClosable={false}
      >
        {listUser && (
          <CreateScheme listUser={listUser?.data} handleCreateScheme={handleCreateScheme} />
        )}
      </Drawer>

      <Drawer
        title={<h4 className="font-bold text-primary uppercase ">Chi tiết kế hoạch</h4>}
        placement="right"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
        size="large"
        width={1024}
      >
        {schemeDetail && <SchemeDetail data={schemeDetail.data} />}
      </Drawer>

      <Modal
        title={
          <div className="text-xl font-semibold text-errorColor">
            <QuestionCircleFilled size={20} className=" font-semibold mr-1" />
            <span className="uppercase ">Xoá kế hoạch</span>
          </div>
        }
        open={isOpenDelete.isOpen}
        onOk={handleDeleteScheme}
        onCancel={() => {
          setIsOpenDelete({ isOpen: false });
        }}
        okText="Xác nhận xoá"
        cancelText="Huỷ"
        okType="danger"
        cancelButtonProps={{ type: 'default' }}
        className="w-11/12 md:w-1/2 xl:w-1/3 "
        // centered
      >
        {isOpenDelete.scheme && (
          <p>
            Hành động này sẽ xoá kết hoạch{' '}
            <span className="font-semibold cursor-pointer  ">{isOpenDelete.scheme.name}</span>. Vui
            lòng xác nhận để xoá.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default Scheme;
