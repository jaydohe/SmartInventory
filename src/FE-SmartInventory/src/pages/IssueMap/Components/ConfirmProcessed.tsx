import {
  genProcessesStateEnum,
  ProcessesState,
  ProcessesStateEnum,
} from '@/Constant/TicketEnumStatus';
import { useUploadFile } from '@/hook';
import { TProcessedTicket, TTicketProcesses } from '@/interface/TReportTicket';
import { normFile } from '@/utils';
import {
  CheckCircleOutlined,
  EditOutlined,
  FileDoneOutlined,
  InboxOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Modal, Select, Tag, Upload } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
const { Option } = Select;
const ConfirmProcessed = ({
  isModalProcessOpen,
  handleCloseModal,
  handleConfirmProcessed,
}: {
  isModalProcessOpen: boolean;
  handleConfirmProcessed: (data: TProcessedTicket) => void;
  handleCloseModal: () => void;
}) => {
  const [form] = Form.useForm();
  const { uploadFile } = useUploadFile();
  const handleSubmit = async (values: any) => {
    const uploadFileMain = values.imagePath
      ? uploadFile.mutateAsync(values.imagePath)
      : Promise.resolve(null);

    const [fileData] = await Promise.all([uploadFileMain]);

    if (fileData) {
      values.imagePath = fileData.url;
    }

    await handleConfirmProcessed(values);
  };
  return (
    <Modal
      centered
      title={
        <h4 className="font-bold text-2xl px-5 mb-3 text-primary text-center uppercase">
          Xác nhận hoàn thành
        </h4>
      }
      open={isModalProcessOpen}
      onCancel={handleCloseModal}
      footer={null}
      className="w-11/12 md:w-1/2  "
    >
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          className="font-medium text-lg"
          name="imagePath"
          label="Ảnh xác nhận hoàn thành "
          valuePropName="file"
          getValueFromEvent={normFile}
          rules={[
            { required: true },
            {
              validator: async (_, file) => {
                if (file && file[0]) {
                  const isLt50M = file[0].size / 1024 / 1024 < 50;
                  if (!isLt50M) {
                    throw new Error('Dung lượng tải lên không được vượt quá 50MB');
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload.Dragger
            name="File"
            action={`${import.meta.env.VITE_BASE_URL_}/uploads/`}
            multiple
            accept="image/*"
            maxCount={1}
            listType="picture"
            beforeUpload={(file) => {
              // console.log({ file });
              return false;
            }}
          >
            <p className="ant-upload-drag-icon mb-0">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">{'Nhấp hoặc kéo tệp vào khu vực này để tải ảnh lên '}</p>
            <p className="ant-upload-hint">
              {'File tải lên có định dạng là: JPG/PNG | Tối đa 50MB'}
            </p>
          </Upload.Dragger>
        </Form.Item>
        <Button
          className="py-0 w-full font-medium "
          size="large"
          type="primary"
          shape="round"
          icon={<FileDoneOutlined size={20} className=" font-semibold " />}
          htmlType="submit"
        >
          Xác nhận hoàn thành
        </Button>
      </Form>
    </Modal>
  );
};

export default ConfirmProcessed;
