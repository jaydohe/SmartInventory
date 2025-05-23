import { Button, Progress, Table, TableProps, Tag, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { TProductionCommand, TProductionCommandProcess } from '@/interface/TProductionCommand';
import dayjs from 'dayjs';
import {
  ProductCommandProcessStatus,
  ProductCommandStatus,
  genProductCommandProcessStatus,
  genProductCommandStatus,
} from '@/Constant/ProductCommandStatus';

interface ProductionCommandTableProps {
  data?: TProductionCommand[];
  loading: boolean;
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange: (page: number, pageSize: number) => void;
  onEditProductionCommand: (productionCommand: TProductionCommand) => void;
  onDeleteProductionCommand: (productionCommand: TProductionCommand) => void;
  onViewDetail: (productionCommand: TProductionCommand) => void;
}

const ProductionCommandTable = ({
  data,
  loading,
  totalRecords,
  currentPage,
  pageSize,
  onPageChange,
  onEditProductionCommand,
  onDeleteProductionCommand,
  onViewDetail,
}: ProductionCommandTableProps) => {
  const columns: TableProps<TProductionCommand>['columns'] = [
    {
      title: 'Mã lệnh',
      dataIndex: 'code',
      key: 'code',
      width: '15%',
      render: (text) => <span className="font-medium text-blue-600">{text}</span>,
    },
    {
      title: 'Kế hoạch bắt đầu',
      dataIndex: 'plannedStart',
      key: 'plannedStart',
      width: '15%',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Kế hoạch kết thúc',
      dataIndex: 'plannedEnd',
      key: 'plannedEnd',
      width: '15%',
      render: (date) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Tình trạng',
      dataIndex: 'processes',
      key: 'processes',
      width: '15%',
      render: (processes: TProductionCommandProcess[]) => (
        <Tag color={genProductCommandStatus[processes[processes.length - 1].status]?.color}>
          {genProductCommandStatus[processes[processes.length - 1].status]?.label}
        </Tag>
      ),
    },
    {
      title: 'Tiến độ',
      dataIndex: 'processes',
      key: 'processes',
      width: '15%',
      render: (processes) => {
        const lastProcess =
          processes && processes.length > 0 ? processes[processes.length - 1] : null;
        return lastProcess ? (
          <Progress
            percent={lastProcess.percentage}
            size="small"
            status={lastProcess.percentage === 100 ? 'success' : 'active'}
          />
        ) : (
          <Progress percent={0} size="small" />
        );
      },
    },
    {
      title: 'Trạng thái sản xuất',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: ProductCommandProcessStatus) => (
        <Tag color={genProductCommandProcessStatus[status]?.color}>
          {genProductCommandProcessStatus[status]?.label}
        </Tag>
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
          <Tooltip title="Cập nhật tiến độ">
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => onEditProductionCommand(record)}
              disabled={record.status === ProductCommandProcessStatus.COMPLETED}
              className="text-green-600 hover:text-green-800"
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDeleteProductionCommand(record)}
              disabled={record.status !== ProductCommandProcessStatus.PREPARATION}
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
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} lệnh sản xuất`,
      }}
      scroll={{ x: 1000 }}
      // bordered
    />
  );
};

export default ProductionCommandTable;
