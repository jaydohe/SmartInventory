import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Tabs,
  TabsProps,
  Tag,
} from 'antd';
import {
  TProductionCommand,
  TProductionCommandProcessUpdate,
  TProductionCommandStatusUpdate,
} from '@/interface/TProductionCommand';
import {
  ProductCommandProcessStatus,
  ProductCommandStatus,
  genProductCommandProcessStatus,
  genProductCommandStatus,
} from '@/Constant/ProductCommandStatus';
import dayjs from 'dayjs';
import { useState } from 'react';

interface UpdateProductionCommandProcessProps {
  productionCommand: TProductionCommand;
  handleUpdateProcess: (id: string, data: TProductionCommandProcessUpdate) => void;
  handleUpdateProductionCommandStatus: (id: string, data: TProductionCommandStatusUpdate) => void;
}

const UpdateProductionCommandProcess = ({
  productionCommand,
  handleUpdateProcess,
  handleUpdateProductionCommandStatus,
}: UpdateProductionCommandProcessProps) => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState<string>('process');

  const onFinishProcess = (values: any) => {
    const formattedData: TProductionCommandProcessUpdate = {
      status: values.status as ProductCommandProcessStatus,
      percentage: values.percentage,
      note: values.note || '',
      actualStart: values.actualStart
        ? values.actualStart.format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
      actualEnd: values.actualEnd
        ? values.actualEnd.format('YYYY-MM-DD')
        : dayjs().format('YYYY-MM-DD'),
    };

    handleUpdateProcess(productionCommand.id, formattedData);
  };

  const onFinishStatus = (values: any) => {
    const formattedData: TProductionCommandStatusUpdate = {
      status: values.commandStatus as ProductCommandStatus,
    };
    handleUpdateProductionCommandStatus(productionCommand.id, formattedData);
    form.resetFields();
  };

  // Lấy tiến độ hiện tại từ lệnh sản xuất
  const currentPercentage =
    productionCommand.processes && productionCommand.processes.length > 0
      ? productionCommand.processes[productionCommand.processes.length - 1].percentage
      : 0;

  const currentStatus = productionCommand.status;

  // Lấy trạng thái hiện tại của quy trình
  const currentProcessStatus =
    productionCommand.processes && productionCommand.processes.length > 0
      ? productionCommand.processes[productionCommand.processes.length - 1].status
      : ProductCommandProcessStatus.PREPARATION;

  // Lọc ra các trạng thái lệnh có thể chuyển đến
  const getAvailableProcessStatuses = () => {
    const allStatuses = Object.values(ProductCommandProcessStatus).filter(
      (value) => typeof value === 'number' && value >= 0
    ) as ProductCommandProcessStatus[];

    // Nếu trạng thái hiện tại là COMPLETED, không cho phép thay đổi
    if (currentProcessStatus === ProductCommandProcessStatus.COMPLETED) {
      return [ProductCommandProcessStatus.COMPLETED];
    }

    return allStatuses.filter(
      (status) =>
        status === currentProcessStatus ||
        status === currentProcessStatus + 1 ||
        status === ProductCommandProcessStatus.COMPLETED
    );
  };

  const processStatusOptions = getAvailableProcessStatuses().map((status) => ({
    label: genProductCommandProcessStatus[status]?.label,
    value: status,
  }));

  const items: TabsProps['items'] = [
    {
      key: 'process',
      label: 'Cập nhật tiến độ',
      children: (
        <Form
          form={form}
          name="update_production_command_process"
          layout="vertical"
          onFinish={onFinishProcess}
          initialValues={{
            status: currentProcessStatus,
            percentage: currentPercentage,
            note: '',
            actualStart: null,
            actualEnd: null,
          }}
        >
          <Form.Item
            name="status"
            label="Trạng thái quy trình"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
          >
            <Select
              options={Object.values(genProductCommandProcessStatus).map((status) => ({
                label: (
                  <Tag key={status.value} color={status.color}>
                    {status.label}
                  </Tag>
                ),
                value: status.value,
              }))}
              // disabled={currentProcessStatus === ProductCommandProcessStatus.COMPLETED}
            />
          </Form.Item>

          <Form.Item
            name="percentage"
            label="Tiến độ hoàn thành (%)"
            rules={[
              { required: true, message: 'Vui lòng nhập tiến độ' },
              {
                type: 'number',
                min: currentPercentage,
                message: `Tiến độ phải lớn hơn hoặc bằng ${currentPercentage}%`,
              },
              { type: 'number', max: 100, message: 'Tiến độ không được vượt quá 100%' },
            ]}
          >
            <InputNumber
              min={currentPercentage}
              max={100}
              placeholder="Nhập tiến độ hoàn thành"
              className="w-full"
              disabled={currentProcessStatus === ProductCommandProcessStatus.COMPLETED}
            />
          </Form.Item>

          <div className="w-full flex gap-2">
            <Form.Item name="actualStart" label="Thời gian bắt đầu thực tế" className="w-full">
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Chọn thời gian bắt đầu"
                className="w-full"
              />
            </Form.Item>

            <Form.Item name="actualEnd" label="Thời gian kết thúc thực tế" className="w-full">
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="Chọn thời gian kết thúc"
                className="w-full"
              />
            </Form.Item>
          </div>

          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={3} placeholder="Nhập ghi chú nếu có" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={currentProcessStatus === ProductCommandProcessStatus.COMPLETED}
            >
              Cập nhật tiến độ
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'status',
      label: 'Cập nhật tình trạng',
      children: (
        <Form
          name="update_production_command_status"
          layout="vertical"
          onFinish={onFinishStatus}
          initialValues={{
            commandStatus: currentStatus,
          }}
        >
          <Form.Item
            name="commandStatus"
            label="Tình trạng lệnh sản xuất"
            rules={[{ required: true, message: 'Vui lòng chọn tình trạng lệnh' }]}
          >
            <Select
              options={Object.values(genProductCommandStatus).map((status) => ({
                label: (
                  <Tag key={status.value} color={status.color}>
                    {status.label}
                  </Tag>
                ),
                value: status.value,
              }))}
              disabled={
                currentStatus === ProductCommandStatus.COMPLETED ||
                currentStatus === ProductCommandStatus.CANCELLED
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              disabled={
                currentStatus === ProductCommandStatus.COMPLETED ||
                currentStatus === ProductCommandStatus.CANCELLED
              }
            >
              Cập nhật trạng thái lệnh
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return <Tabs activeKey={activeTab} items={items} onChange={(key) => setActiveTab(key)} />;
};

export default UpdateProductionCommandProcess;
