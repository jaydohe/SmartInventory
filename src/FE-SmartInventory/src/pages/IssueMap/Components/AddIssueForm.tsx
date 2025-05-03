import { useUploadFile } from '@/hook';
import { TPosition } from '@/hook/useUserGeolocation';
import { TCreateTicket } from '@/interface/TReportTicket';
import { authStoreSelectors } from '@/Stores/userStore';
import { normFile } from '@/utils';
import { CheckOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Upload } from 'antd';
import { FC, useEffect, useState } from 'react';
const { Option } = Select;
interface AddIssueFormProps {
  isVisible: boolean;

  handleAddIssue: (values: TCreateTicket) => void;

  initialMacAddress?: string;
}

const AddIssueForm: FC<AddIssueFormProps> = ({
  isVisible,
  handleAddIssue,
  initialMacAddress = '',
}) => {
  const [form] = Form.useForm();

  const { uploadFile } = useUploadFile();

  // Reset form when modal opens with initial MAC address
  useEffect(() => {
    if (isVisible && initialMacAddress) {
      form.setFieldsValue({
        deviceCode: initialMacAddress,
      });
    }
  }, [isVisible, initialMacAddress]);

  const handleSubmit = async (values: any) => {
    const uploadFilePath = values.filePath
      ? uploadFile.mutateAsync(values.filePath)
      : Promise.resolve(null);

    const uploadImagePath = values.imagePath
      ? uploadFile.mutateAsync(values.imagePath)
      : Promise.resolve(null);
    const [filePath, imagePath] = await Promise.all([uploadFilePath, uploadImagePath]);

    if (imagePath) {
      values.imagePath = imagePath.url;
    }
    if (filePath) {
      values.filePath = filePath.url;
    }

    const newData = { ...values };

    await handleAddIssue(newData);
    // form.resetFields();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="deviceCode"
        label="Địa chỉ MAC thiết bị"
        className="w-full text-base font-medium"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ MAC thiết bị' }]}
      >
        <Input disabled={!!initialMacAddress} />
      </Form.Item>
      <Form.Item
        name="name"
        className="w-full text-base font-medium"
        label="Tên sự cố"
        rules={[{ required: true }]}
      >
        <Input placeholder="Nhập tên sự cố" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true }]}
        className="w-full text-base font-medium"
        label="Mô tả sự cố"
      >
        <Input.TextArea rows={4} placeholder="Nhập mô tả sự cố" />
      </Form.Item>

      <Form.Item
        name="imagePath"
        label="Ảnh thiết bị"
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
          <p className="ant-upload-hint">{'File tải lên có định dạng là: JPG/PNG'}</p>
        </Upload.Dragger>
      </Form.Item>
      <Form.Item
        name="filePath"
        label="Tệp đính kèm"
        valuePropName="file"
        getValueFromEvent={normFile}
        rules={[
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
          accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
          <p className="ant-upload-text">{'Nhấp hoặc kéo tệp vào khu vực này để tải tệp lên '}</p>
          <p className="ant-upload-hint">
            {'File tải lên có định dạng là:  WORD, PDF | Tối đa 50MB'}
          </p>
        </Upload.Dragger>
      </Form.Item>
      <Button
        htmlType="submit"
        className="py-0 px-4 w-full bg-infoColor hover:bg-infoColorHover font-medium"
        size="large"
        type="primary"
        // shape="round"
        icon={<CheckOutlined />}
      >
        Gửi báo cáo sự cố
      </Button>
      {/* <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item> */}
    </Form>
  );
};

export default AddIssueForm;
