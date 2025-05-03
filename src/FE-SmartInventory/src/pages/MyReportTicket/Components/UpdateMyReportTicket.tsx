import ViewListFile from '@/Components/ViewListFile';
import { useUploadFile } from '@/hook';
import { TCreateTicket, TReportTicket } from '@/interface/TReportTicket';
import { authStoreSelectors } from '@/Stores/userStore';
import { normFile } from '@/utils';
import { CheckOutlined, InboxOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
const { Option } = Select;
export interface IUpdateMyReportTicketProps {
  detailTicket: TReportTicket;
  handleUpdateTicket: (id: string, data: TCreateTicket) => void;
}

export default function UpdateMyReportTicket({
  detailTicket,
  handleUpdateTicket,
}: IUpdateMyReportTicketProps) {
  const [form] = Form.useForm();
  const [mainFile, setMainFile] = useState<boolean>(false);
  const [subFile, setSubFile] = useState<boolean>(false);

  const { uploadFile } = useUploadFile();
  const navigate = useNavigate();

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
    handleUpdateTicket(detailTicket.id, newData);
    setMainFile(false);
    setSubFile(false);
    form.resetFields();
  };

  useEffect(() => {
    if (detailTicket) {
      form.setFieldsValue({
        name: detailTicket.name,
        description: detailTicket.description,
      });
    }
  }, [detailTicket]);

  return (
    <div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="name"
          className="w-full text-base font-semibold"
          label="Tên sự cố"
          rules={[{ required: true }]}
        >
          <Input placeholder="Nhập tên sự cố" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[{ required: true }]}
          className="w-full text-base font-semibold "
          label="Mô tả sự cố"
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả sự cố" />
        </Form.Item>
        <div className="grid grid-cols-1  gap-x-4">
          <Form.Item
            className="w-full text-base font-semibold "
            name="imagePath"
            label="Ảnh thiết bị"
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
              onChange={(file) =>
                file.fileList.length > 0 ? setMainFile(true) : setMainFile(false)
              }
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
              <p className="ant-upload-text">
                {'Nhấp hoặc kéo tệp vào khu vực này để tải ảnh lên '}
              </p>
              <p className="ant-upload-hint">
                {'File tải lên có định dạng là: JPG/PNG | Tối đa 50MB'}
              </p>
            </Upload.Dragger>
          </Form.Item>
          {!mainFile && detailTicket.imagePath && (
            <div className="mb-5 -mt-3 ">
              <ViewListFile
                arrayFile={[
                  {
                    id: detailTicket.id,
                    filePath: detailTicket.imagePath,
                    fileName: detailTicket.imagePath.split('/').pop() as string,
                  },
                ]}
              ></ViewListFile>
            </div>
          )}
          <Form.Item
            className="w-full text-base font-semibold "
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
              onChange={(file) => (file.fileList.length > 0 ? setSubFile(true) : setSubFile(false))}
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
              <p className="ant-upload-text">
                {'Nhấp hoặc kéo tệp vào khu vực này để tải tệp lên '}
              </p>
              <p className="ant-upload-hint">
                {'File tải lên có định dạng là:  WORD, PDF | Tối đa 50MB'}
              </p>
            </Upload.Dragger>
          </Form.Item>
          {!subFile && detailTicket.filePath && (
            <div className="mb-5 -mt-3 ">
              <ViewListFile
                arrayFile={[
                  {
                    id: detailTicket.id,
                    filePath: detailTicket.filePath,
                    fileName: detailTicket.filePath.split('/').pop() as string,
                  },
                ]}
              ></ViewListFile>
            </div>
          )}
        </div>
        <Button
          htmlType="submit"
          className="py-4 mt-2 px-4 w-full bg-infoColor hover:bg-infoColorHover font-medium"
          size="large"
          type="primary"
          // shape="round"
          icon={<CheckOutlined />}
        >
          Cập nhật báo cáo sự cố
        </Button>
      </Form>
    </div>
  );
}
