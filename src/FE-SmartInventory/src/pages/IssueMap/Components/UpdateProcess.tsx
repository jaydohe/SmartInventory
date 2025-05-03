import {
  genProcessesStateEnum,
  ProcessesState,
  ProcessesStateEnum,
} from '@/Constant/TicketEnumStatus';
import { TTicketProcesses, TUpdateProcessTicket } from '@/interface/TReportTicket';
import { CheckCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select, Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
const { Option } = Select;
const UpdateProcess = ({
  isModalProcessOpen,
  currentProcess,
  handleCloseModal,
  handleUpdateProcess,
}: {
  isModalProcessOpen: boolean;
  currentProcess: TTicketProcesses;
  handleUpdateProcess: (data: TUpdateProcessTicket) => void;
  handleCloseModal: () => void;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentProcess) {
      form.setFieldsValue({
        expireAt: dayjs(currentProcess.expireAt),
        state: currentProcess.state,
        message: currentProcess.message,
      });
    }
  }, [currentProcess.id]);

  const handleSubmit = async (fieldsValue: any) => {
    const values = {
      ...fieldsValue,
      expireAt: dayjs(fieldsValue.expireAt),
    };
    handleUpdateProcess(values);
    // await handleAddIssue(newData);
    // form.resetFields();
    // onClose();
  };
  return (
    <Modal
      centered
      title={
        <h4 className="font-bold text-2xl px-5 mb-3 text-primary text-center uppercase">
          Cập nhật chỉ thị
        </h4>
      }
      open={isModalProcessOpen}
      onCancel={handleCloseModal}
      footer={null}
      className="w-11/12 md:w-1/2 xl:w-1/3 "
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="message"
          className="w-full text-base font-medium"
          label="Chỉ thị xử lý lỗi "
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập chỉ thị xử lý sự cố" />
        </Form.Item>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Form.Item
            className="w-full"
            label={'Hạn xử lý:'}
            name="expireAt"
            rules={[{ required: true }]}
            initialValue={dayjs(dayjs().add(+1, 'd'), 'YYYY/MM/DD ')}
          >
            <DatePicker
              minDate={dayjs()}
              className="w-full"
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              defaultValue={dayjs(dayjs().add(+1, 'd'), 'YYYY/MM/DD')}
            />
          </Form.Item>
          <Form.Item
            name="state"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng trại thái' }]}
          >
            <Select variant="borderless" virtual={false}>
              {ProcessesState.map((item) => (
                <Option key={item.id} value={item.id} label={item.name}>
                  <Tag
                    className=" font-medium"
                    color={genProcessesStateEnum(item.id).color}
                    icon={
                      item.id === ProcessesStateEnum.PROCESSED ? (
                        <CheckCircleOutlined />
                      ) : (
                        <SyncOutlined spin />
                      )
                    }
                    key={'status'}
                  >
                    {genProcessesStateEnum(item.id).Title}
                  </Tag>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Button
          className="py-0 w-full font-medium "
          size="large"
          type="primary"
          shape="round"
          icon={<EditOutlined size={20} className=" font-medium " />}
          htmlType="submit"
        >
          Cập nhật chỉ thị
        </Button>
      </Form>
    </Modal>
  );
};

export default UpdateProcess;
