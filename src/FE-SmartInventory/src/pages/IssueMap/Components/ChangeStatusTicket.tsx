import { genTicketEnum, TicketStatus, TicketStatusEnum } from '@/Constant/TicketEnumStatus';
import {
  ArrowRightOutlined,
  CheckCircleOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Form, Modal, Select, Tag } from 'antd';
import { useState } from 'react';
const { Option } = Select;
const ChangeStatusTicket = ({
  isModalProcessOpen,
  currentState,
  handleCloseModal,
  handleChangeStatusTicket,
}: {
  isModalProcessOpen: boolean;
  currentState: TicketStatusEnum;
  handleChangeStatusTicket: (newStatus: number) => void;
  handleCloseModal: () => void;
}) => {
  const [form] = Form.useForm();

  const [processState, setProcessState] = useState<TicketStatusEnum>(currentState);

  const handleSelectChange = (value: any) => {
    console.log(value);
    setProcessState(value);
  };
  console.log('processState', processState);
  return (
    <Modal
      centered
      title={
        <h4 className="font-bold text-2xl px-5 mb-3 text-primary text-center uppercase">
          Cập nhật trạng thái sự cố
        </h4>
      }
      open={isModalProcessOpen}
      onCancel={handleCloseModal}
      footer={null}
      className="w-11/12 md:w-1/2 xl:w-1/3 "
    >
      <div className=" flex justify-around items-center gap-4 flex-wrap sm:flex-nowrap">
        <div className="bg-colorBgLayout w-full h-20 rounded-xl flex items-center justify-center flex-col gap-1 text-[#6c6c6c]">
          <p className="text-base font-semibold uppercase">Hiện tại</p>
          <p className="text-base font-medium">
            <Tag
              className="m-0 font-medium"
              color={genTicketEnum(currentState).color}
              icon={
                currentState === TicketStatusEnum.NEW ? (
                  <PlusCircleOutlined />
                ) : currentState === TicketStatusEnum.PROCESSED ? (
                  <CheckCircleOutlined />
                ) : currentState === TicketStatusEnum.RECEVIED ? (
                  <SyncOutlined spin />
                ) : (
                  <MinusCircleOutlined />
                )
              }
              key={'status'}
            >
              {genTicketEnum(currentState).Title}
            </Tag>
          </p>
        </div>

        <ArrowRightOutlined className="text-2xl font-semibold text-primary" />
        <div className="bg-primaryColorHover w-full h-20 rounded-xl flex items-center justify-center flex-col gap-1 text-textWhite">
          <p className="text-base font-semibold uppercase">Trạng thái mới </p>
          <Select variant="borderless" onChange={handleSelectChange} defaultValue={currentState}>
            {TicketStatus.filter((item) => item.id !== TicketStatusEnum.REJECTED).map((status) => (
              <Option key={status.id} value={status.id} label={status.name}>
                <Tag
                  className="m-0 font-medium"
                  color={genTicketEnum(status.id).color}
                  icon={
                    status.id === TicketStatusEnum.NEW ? (
                      <PlusCircleOutlined />
                    ) : status.id === TicketStatusEnum.PROCESSED ? (
                      <CheckCircleOutlined />
                    ) : status.id === TicketStatusEnum.RECEVIED ? (
                      <SyncOutlined spin />
                    ) : (
                      <MinusCircleOutlined />
                    )
                  }
                  key={'status'}
                >
                  {genTicketEnum(status.id).Title}
                </Tag>
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <Button
        className="mt-5 py-0 px-4  w-full  bg-successColor1 hover:bg-successColorHover1  "
        size="large"
        type="primary"
        shape="round"
        icon={<EditOutlined />}
        onClick={() => handleChangeStatusTicket(processState)}
      >
        Cập nhật
      </Button>
    </Modal>
  );
};

export default ChangeStatusTicket;
