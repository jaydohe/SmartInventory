import { RoleEnumString } from '@/Constant/Role';
import { useBuilderQuery } from '@/hook';
import { TBuilderQuery } from '@/interface';
import { TAssignTicket } from '@/interface/TReportTicket';
import RoleTag from '@/pages/User/Components/RoleTag';
import { useQueryUser } from '@/pages/User/Hook/useQueryUser';
import { authStoreSelectors } from '@/Stores/userStore';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { FaUserCog } from 'react-icons/fa';
import { MdAssignmentAdd } from 'react-icons/md';
const { Option } = Select;

const AssignTicket = ({
  isModalProcessOpen,
  handleCloseModal,
  handleAssignTicket,
}: {
  isModalProcessOpen: boolean;
  handleAssignTicket: (data: TAssignTicket) => void;
  handleCloseModal: () => void;
}) => {
  const [form] = Form.useForm();
  const unitId = authStoreSelectors.use.unitId() ?? '';

  const [filterUserAssign] = useState<TBuilderQuery>({
    appendQuery: [
      // {
      //   unitId: {
      //     value: unitId,
      //     queryOperator: '$eq',
      //     queryOperatorParent: '$and',
      //   },
      // },

      {
        role: {
          value: RoleEnumString.TECHNICAL,
          queryOperator: '$eq',
          queryOperatorParent: '$or',
        },
      },
      {
        role: {
          value: RoleEnumString.MAINTENANCE,
          queryOperator: '$eq',
          queryOperatorParent: '$or',
        },
      },
    ],
  });

  const { getAllUser } = useQueryUser(useBuilderQuery(filterUserAssign));
  const { data: userList } = getAllUser;

  const handleSubmit = async (fieldsValue: any) => {
    const values = {
      ...fieldsValue,

      expireAt: dayjs(fieldsValue.expireAt),
    };
    handleAssignTicket(values);
    // await handleAddIssue(newData);
    // form.resetFields();
    // onClose();
  };

  return (
    <Modal
      centered
      title={
        <h4 className="font-bold text-2xl px-5 mb-3 text-primary text-center uppercase">
          Phân công xử lý
        </h4>
      }
      open={isModalProcessOpen}
      onCancel={handleCloseModal}
      footer={null}
      className="w-11/12 md:w-1/2 xl:w-1/3 "
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="userId"
          label="Phân công người xử lý sự cố"
          rules={[{ required: true, message: 'Vui lòng chọn người xử lý sự cố' }]}
        >
          <Select
            mode="multiple"
            placeholder="Chọn người xử lý sự cố"
            // optionFilterProp="children"
            maxTagCount={'responsive'}
            showSearch
            virtual={false}
            allowClear
            filterOption={(input, option) => {
              if (!option || !option.label) return false;
              // Extract text from the JSX label
              const labelText =
                typeof option.label === 'string'
                  ? option.label
                  : (option.label as React.ReactElement).props.children;

              return labelText.toLowerCase().includes(input.toLowerCase());
            }}
          >
            {userList?.data?.map((user) => (
              <Option key={user.id} value={user.id} label={user.name}>
                <RoleTag role={user.role} userName={user.name} />
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="message"
          className="w-full text-base font-medium"
          label="Chỉ thị xử lý sự cố"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập chỉ thị xử lý sự cố" />
        </Form.Item>

        <Form.Item
          className="w-full"
          label={'Hạn xử lý:'}
          name="expireAt"
          rules={[{ required: true }]}
          initialValue={dayjs()}
        >
          <DatePicker
            minDate={dayjs()}
            className="w-full"
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            defaultValue={dayjs()}
            disabledDate={(current) => {
              return current && current < dayjs().startOf('day');
            }}
            disabledTime={(current) => {
              if (current && current.isSame(dayjs(), 'day')) {
                return {
                  disabledHours: () => {
                    const hours = [];
                    for (let i = 0; i < dayjs().hour(); i++) {
                      hours.push(i);
                    }
                    return hours;
                  },
                  disabledMinutes: (selectedHour) => {
                    if (selectedHour === dayjs().hour()) {
                      const minutes = [];
                      for (let i = 0; i < dayjs().minute(); i++) {
                        minutes.push(i);
                      }
                      return minutes;
                    }
                    return [];
                  },
                };
              }
              return {};
            }}
          />
        </Form.Item>

        <Button
          className="py-0 w-full font-medium "
          size="large"
          type="primary"
          shape="round"
          icon={<FaUserCog size={20} className=" font-semibold " />}
          htmlType="submit"
        >
          Phân công xử lý sự cố
        </Button>
        {/* <Form.Item noStyle shouldUpdate>
          {() => (
            <Typography>
              <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
            </Typography>
          )}
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default AssignTicket;
