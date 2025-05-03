import React, { useEffect, useState } from 'react';
import { Typography, Drawer, Tabs, DatePicker, Input } from 'antd';
import SchemeTable from '../Scheme/Components/SchemeTable';
import { useQueryDetailScheme, useQueryScheme } from '../Scheme/Hook/useQueryScheme';
import { authStoreSelectors } from '@/Stores/userStore';
import { TBuilderQuery } from '@/interface';
import { useBuilderQuery } from '@/hook';
import ReceivedSchemeDetail from './Components/ReceivedSchemeDetail';

import { useLocation, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/Constant';

import { SchemeStatus } from '@/Constant';
import dayjs, { Dayjs } from 'dayjs';
import moment from 'moment';
import SearchInput from '@/Components/SearchInput';
import { schemeTabs } from '../Scheme';

const { Title } = Typography;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Search } = Input;

const ReceivedScheme: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');
  const { state } = useLocation();
  const userId = authStoreSelectors.use.userId();
  const role = authStoreSelectors.use.role();
  const unitId = authStoreSelectors.use.unitId();

  const [filterReceived, setFilterReceived] = useState<TBuilderQuery>({
    appendQuery: [
      {
        'processes.userId': {
          value: userId || '',
          queryOperator: '$eq',
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
      {
        name: {
          value: '',
          queryOperator: '$fli',
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

  const { getAllScheme: getAllReceivedSchemes } = useQueryScheme(
    useBuilderQuery(filterReceived),

    {
      enabled: !!userId && !!role && !!unitId,
    }
  );

  const { data: schemeDetail } = useQueryDetailScheme(
    selectedSchemeId,
    useBuilderQuery({
      toJoin: ['processes.user.*', 'user.*', 'subFiles.*'],
    })
  );

  const { data: listReceivedSchemes } = getAllReceivedSchemes;

  const handleOpenDrawer = (schemeId: string) => {
    setSelectedSchemeId(schemeId);
    setIsDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handlePageChangeReceived = (page: number, pageSize: number) => {
    setFilterReceived({
      ...filterReceived,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };

  const handleTabChange = (key: string) => {
    const statusValue = key === 'all' ? '' : key;
    setActiveTab(statusValue);
    setFilterReceived((pre) => {
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

  const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day');
  };

  const onRangeChangeAll = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setFilterReceived((pre) => {
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
    }
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilterReceived((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('name' in item) {
          return {
            name: {
              ...item.name,
              value: value,
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

  return (
    <div className="m-4">
      <div className="flex justify-between flex-col md:flex-row pb-4">
        <div className="min-w-fit flex flex-col md:flex-row items-center gap-2">
          <Title level={3} className="uppercase mb-0">
            Kế hoạch cần thực hiện
          </Title>
        </div>
        <div className="flex gap-4 w-full justify-end flex-col lg:flex-row">
          <div className="flex items-center gap-4">
            <h2 className="font-medium min-w-fit">Thời gian:</h2>
            <RangePicker
              className="w-full"
              style={{ width: '100%' }}
              format="YYYY/M/D"
              disabledDate={disabledDate}
              defaultValue={[
                dayjs(dayjs().subtract(7, 'days'), 'YYYY/MM/DD'),
                dayjs(dayjs(), 'YYYY/MM/DD'),
              ]}
              onChange={onRangeChangeAll}
            />
          </div>

          <div className="w-full lg:w-2/5 flex gap-4 items-center">
            <SearchInput placeholder="Tìm kiếm kế hoạch" handleSearchValue={handleSearch} />
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
                  ? listReceivedSchemes?.data
                  : listReceivedSchemes?.data.filter((scheme) => scheme.status === tab.status)
              }
              pagination={{
                position: ['bottomCenter'],
                defaultCurrent: 1,
                showSizeChanger: true,
                onChange: handlePageChangeReceived,
                total: listReceivedSchemes?.totalRecords,
                current: filterReceived.toPaging?.page,
                pageSize: filterReceived.toPaging?.pageSize,
              }}
              handleOpenDrawer={handleOpenDrawer}
            />
          </TabPane>
        ))}
      </Tabs>

      <Drawer
        title={<h4 className="font-bold text-primary uppercase ">Chi tiết kế hoạch</h4>}
        placement="right"
        onClose={handleCloseDrawer}
        open={isDrawerVisible}
        size="large"
        width={900}
      >
        {schemeDetail && userId && (
          <ReceivedSchemeDetail data={schemeDetail.data} receivedUser={userId} />
        )}
      </Drawer>
    </div>
  );
};

export default ReceivedScheme;
