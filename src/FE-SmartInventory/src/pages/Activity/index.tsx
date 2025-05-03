import SearchInput from '@/Components/SearchInput';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { authStoreSelectors } from '@/Stores/userStore';
import { CheckCircleOutlined, MinusCircleOutlined, PlusCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { DatePicker, Select, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
const { RangePicker } = DatePicker;
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf('day');
};
const { Option } = Select;


import { ActivityContentTypes, arActivityContentType, genActivityContentType, genActivityEntityTypes } from '@/Constant/ActivityType';
import { TActivity } from '@/interface/TActivity';
import { RangePickerProps } from 'antd/es/date-picker';
import { useLocation, useNavigate } from 'react-router';
import { useQueryActivity } from './Hook/useQueryActivity';

export interface IActivityPageProps {}

export default function ActivityPage(props: IActivityPageProps) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const wareId = authStoreSelectors.use.warehouseId() ?? '';
  const role = authStoreSelectors.use.role() ?? '';
  const userId = authStoreSelectors.use.userId() ?? '';
  const [openDrawer, setOpenDrawer] = useState(false);

  const [filterActivity, setFilterActivity] = useState<TBuilderQuery>({
    isAsc: false,
    orderBy: 'createdAt',
    appendQuery: [
      {
        unitId: {
          value: wareId,
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
      {
        content: {
          value: '',
          queryOperator: '$fli',
          queryOperatorParent: '$and',
        },
      },
      {
        contentType: {
          value: '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
    toPaging: {
      page: 1,
      pageSize: 10,
    },
  });
  const { getAll } = useQueryActivity(useBuilderQuery(filterActivity));

  const { data: allActivityList } = getAll;

  const handleSearchValue = (valueSearch: string) => {
    setFilterActivity((pre) => {
      // Tạo appendQuery mới bằng cách map qua mảng cũ
      const newAppendQuery = pre.appendQuery?.map((item) => {
        // Nếu object có key là 'name' hoặc 'code'
        if ('content' in item) {
          return {
            content: {
              ...item.content,
              value: valueSearch, // Cập nhật giá trị search cho name
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
  };

  const columns: ColumnsType<TActivity> = [
    {
      title: `STT`,
      // fixed: 'left',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => <p className="font-semibold">{index + 1}</p>,
    },

    {
      title: `Loại lịch sử`,
      dataIndex: 'contentType',
      className: 'break-words	 truncate ',
      key: 'name',

      render: (_, record) => (
        <Tag
          icon={
            record.contentType === ActivityContentTypes.CREATED ? (
              <PlusCircleOutlined />
            ) : record.contentType === ActivityContentTypes.UPDATED ? (
              <CheckCircleOutlined />
            ) : (
              <MinusCircleOutlined />
            )
          }
          color={genActivityContentType[record.contentType].color}
          className="m-0 font-medium text-sm"
        >
          {genActivityContentType[record.contentType].name}{' '}
          {genActivityEntityTypes[record.entityType]}
        </Tag>
      ),
    },
    {
      title: `Nội dung`,
      dataIndex: 'content',
      className: 'break-words	 truncate',
      key: 'content',
      render: (text) => (
        <p className=" 	text-ellipsis  overflow-hidden w-full text-pretty">{text}</p>
      ),
    },
  ];

  const handlePageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize);
    setFilterActivity({
      ...filterActivity,
      toPaging: {
        page: page,
        pageSize: pageSize,
      },
    });
  };
  const handleSelectChange = (value: number) => {
    console.log(value);

    setFilterActivity((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('contentType' in item) {
          return {
            contentType: {
              ...item.contentType,
              value: value !== undefined ? `${value}` : '',
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
  };
  return (
    <div className=" min-h-min p-4">
      <div className={`flex items-center justify-between  flex-wrap lg:flex-nowrap gap-4 mb-4`}>
        <h2 className="min-w-fit  font-bold text-xl md:text-2xl  text-inherit text-pretty text-center uppercase text-primary">
          <UnorderedListOutlined className="text-xl" /> Lịch sử thao tác
        </h2>

        <div className="w-full flex items-center justify-end gap-3 md:gap-5 flex-wrap sm:flex-nowrap ">
          <Select
            className=" w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            onChange={handleSelectChange}
            placeholder="Chọn Loại lịch sử"
            optionFilterProp="label"
            allowClear
          >
            {arActivityContentType.map((state) => (
              <Option key={state.id} value={state.id} label={state.name}>
                <Tag
                  icon={
                    state.id === ActivityContentTypes.CREATED ? (
                      <PlusCircleOutlined />
                    ) : state.id === ActivityContentTypes.UPDATED ? (
                      <CheckCircleOutlined />
                    ) : (
                      <MinusCircleOutlined />
                    )
                  }
                  color={state.color}
                  className="m-0 font-medium text-sm"
                >
                  {state.name}
                </Tag>
              </Option>
            ))}
          </Select>

          <div className="w-full sm:w-1/2 lg:w-1/3">
            <SearchInput
              placeholder="Nhập nội dung lịch sử"
              handleSearchValue={handleSearchValue}
            />
          </div>
        </div>
      </div>

      {allActivityList?.data && (
        <Table
          columns={columns}
          dataSource={allActivityList?.data}
          tableLayout={'auto'}
          // loading
          scroll={{ x: 650 }}
          rowKey={(record) => record.id}
          pagination={{
            position: ['bottomCenter'],
            defaultCurrent: 1,
            showSizeChanger: true,
            onChange: handlePageChange,
            total: allActivityList?.totalRecords,
            current: filterActivity.toPaging?.page,
            pageSize: filterActivity.toPaging?.pageSize,
          }}
        />
      )}
    </div>
  );
}
