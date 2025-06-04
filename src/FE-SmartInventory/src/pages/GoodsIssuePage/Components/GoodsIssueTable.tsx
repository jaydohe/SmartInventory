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
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
      width: '15%',
    },
    {
      title: 'Kho xuất',
      dataIndex: 'warehouseId',
      key: 'warehouseId',
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
      width: '15%',
      render: (_, record) => (
        <div className="flex gap-2">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => onViewDetail(record)}
              className="text-blue-600 hover:text-blue-800"
            />
          </Tooltip>
          <Tooltip title="Sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEditGoodsIssue(record)}
              disabled={
                record.status === GoodsStatus.SUCCESS || record.status === GoodsStatus.CANCELLED
              }
              className="text-green-600 hover:text-green-800"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteGoodsIssue(record)}
              disabled={record.status === GoodsStatus.SUCCESS}
              className="text-red-600 hover:text-red-800"
            />
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
      scroll={{ x: 900 }}
      bordered
    />
  );
};

export default GoodsIssueTable;
