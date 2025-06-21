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
import { usePermissions } from '@/hook/usePermissions';

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
  const permissions = usePermissions('ProductionCommandPage');

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
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status: ProductCommandStatus) => (
        <Tag color={genProductCommandStatus[status]?.color}>
          {genProductCommandStatus[status]?.label}
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
      dataIndex: 'processes',
      key: 'processStatus',
      width: '15%',
      render: (processes: TProductionCommandProcess[]) => {
        if (!processes || processes.length === 0) {
          return <Tag color="default">Chưa có trạng thái</Tag>;
        }

        const lastProcess = processes[processes.length - 1];
        return (
          <Tag color={genProductCommandProcessStatus[lastProcess.status]?.color || 'default'}>
            {genProductCommandProcessStatus[lastProcess.status]?.label || 'Không xác định'}
          </Tag>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 250,
      align: 'center',
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          {permissions.canRead() && (
            <Tooltip title="Xem chi tiết lệnh sản xuất">
              <Button
                color="cyan"
                variant="solid"
                shape="round"
                icon={<EyeOutlined />}
                onClick={() => onViewDetail(record)}
                className={'font-medium'}
              ></Button>
            </Tooltip>
          )}
          {permissions.canUpdate() && (
            <Tooltip title="Cập nhật tiến độ">
              <Button
                color="gold"
                variant="solid"
                shape="round"
                icon={<EditOutlined />}
                onClick={() => onEditProductionCommand(record)}
                disabled={record.status === ProductCommandStatus.COMPLETED}
                className={'font-medium'}
              ></Button>
            </Tooltip>
          )}
          {permissions.canDelete() && (
            <Tooltip title="Xoá lệnh sản xuất">
              <Button
                color="red"
                variant="solid"
                shape="round"
                icon={<DeleteOutlined />}
                onClick={() => onDeleteProductionCommand(record)}
                disabled={record.status !== ProductCommandStatus.CREATED}
                className={'font-medium'}
              ></Button>
            </Tooltip>
          )}
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
