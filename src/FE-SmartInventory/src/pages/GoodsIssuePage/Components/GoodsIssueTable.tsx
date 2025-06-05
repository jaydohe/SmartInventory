import { Button, Table, TableProps, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { TGoodsIssue } from '@/interface/TGoodsIssuse';
import dayjs from 'dayjs';
import { GoodsStatus, genGoodsStatus } from '@/Constant/GoodsStatus';

interface GoodsIssueTableProps {
  data?: TGoodsIssue[];
  loading: boolean;
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (page: number, pageSize: number) => void;
  onEditGoodsIssue: (goodsIssue: TGoodsIssue) => void;
  onDeleteGoodsIssue: (goodsIssue: TGoodsIssue) => void;
  onViewDetail: (goodsIssue: TGoodsIssue) => void;
}

const GoodsIssueTable = ({
  data,
  loading,
  totalRecords,
  currentPage,
  pageSize,
  onPageChange,
  onEditGoodsIssue,
  onDeleteGoodsIssue,
  onViewDetail,
}: GoodsIssueTableProps) => {
  const columns: TableProps<TGoodsIssue>['columns'] = [
    {
      title: 'Mã phiếu',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
      render: (text) => <span className="font-medium text-blue-600">{text}</span>,
    },
    {
      title: 'Đại lý/Khách hàng',
      dataIndex: 'receiverName',
      key: 'receiverName',
      width: '15%',
    },
    {
      title: 'Giá trị',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '15%',
      render: (value) => value?.toLocaleString('vi-VN') + ' đ',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '15%',
      render: (date) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: GoodsStatus) => (
        <Tag color={genGoodsStatus[status]?.color}>{genGoodsStatus[status]?.label}</Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 250,
      align: 'center',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Tooltip title="Xem chi tiết phiếu xuất">
            <Button
              color="cyan"
              variant="solid"
              shape="round"
              icon={<EyeOutlined />}
              onClick={() => onViewDetail(record)}
              className={'font-medium'}
            ></Button>
          </Tooltip>
          <Tooltip title="Cập nhật phiếu xuất">
            <Button
              color="gold"
              variant="solid"
              shape="round"
              icon={<EditOutlined />}
              onClick={() => onEditGoodsIssue(record)}
              disabled={
                record.status === GoodsStatus.SUCCESS || record.status === GoodsStatus.CANCELLED
              }
              className={'font-medium'}
            ></Button>
          </Tooltip>
          <Tooltip title="Xoá phiếu xuất">
            <Button
              color="red"
              variant="solid"
              shape="round"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteGoodsIssue(record)}
              disabled={record.status === GoodsStatus.SUCCESS}
              className={'font-medium'}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data?.map((item) => ({ ...item, key: item.id }))}
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalRecords,
        onChange: onPageChange,
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} phiếu xuất`,
      }}
      scroll={{ x: 800 }}
      bordered
    />
  );
};

export default GoodsIssueTable;
