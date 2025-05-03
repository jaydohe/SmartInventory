import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Upload, Select, Button, Typography } from 'antd';
import {
  InboxOutlined,
  CalendarOutlined,
  FormOutlined,
  PaperClipOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { useUploadFile } from '@/hook';
import dayjs from 'dayjs';
import { TUser } from '@/interface/TUser';
import StatusTag from './StatusTag';
import { normFile } from '@/utils';
import { TScheme } from '@/interface/TScheme';
import ViewListFile from '@/Components/ViewListFile';
import ViewListPrivateFile from '@/Components/ViewListPrivateFile';

const { Dragger } = Upload;
const { Option } = Select;
const { Text } = Typography;

interface EditSchemeProps {
  handleEditScheme: (values: any) => void;
  schemeData: TScheme;
}

const EditScheme: React.FC<EditSchemeProps> = ({ handleEditScheme, schemeData }) => {
  const [form] = Form.useForm();
  const [mainFile, setMainFile] = useState<boolean>(false);
  const [subFile, setSubFile] = useState<boolean>(false);
  const { uploadPrivateFile } = useUploadFile();
  console.log(mainFile, subFile, schemeData);
  useEffect(() => {
    if (schemeData) {
      form.setFieldsValue({
        name: schemeData.name,
        expireAt: schemeData.expireAt ? dayjs(schemeData.expireAt) : null,
      });
    }
  }, [schemeData]);

  const onFinish = async (values: any) => {
    // Upload main file and get object name
    const mainFileUpload = values.mainFilePath
      ? uploadPrivateFile.mutateAsync(values.mainFilePath)
      : Promise.resolve(null);

    const subFileUpload = values.subFilePath
      ? uploadPrivateFile.mutateAsync(values.subFilePath)
      : Promise.resolve(null);

    const [uploadedSubFile, uploadedFileMain] = await Promise.all([subFileUpload, mainFileUpload]);

    if (uploadedFileMain) {
      values.filePath = uploadedFileMain.objectName;
    }
    if (uploadedSubFile) {
      values.subFiles = [
        {
          filePath: uploadedSubFile.objectName,
          fileName: uploadedSubFile.objectName,
        },
      ];
    }

    values.expireAt ? (values.expireAt = dayjs(values.expireAt)) : delete values.expireAt;

    handleEditScheme(values);
    form.resetFields();
    setMainFile(false);
    setSubFile(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {/* Thông tin cơ bản */}
      <Form.Item
        name="name"
        label="Tên kế hoạch"
        rules={[{ required: true, message: 'Vui lòng nhập tên kế hoạch' }]}
        className="w-full font-medium"
      >
        <Input placeholder="Nhập tên kế hoạch" prefix={<FormOutlined />} variant="outlined" />
      </Form.Item>

      <Form.Item name="expireAt" label="Ngày hết hạn" className="font-medium">
        <DatePicker
          placeholder="Chọn ngày"
          format="DD/MM/YYYY HH:mm"
          prefix={<CalendarOutlined />}
          className="w-full"
          showTime
          disabledDate={(current) => current && current < moment().startOf('day')}
        />
      </Form.Item>

      <Form.Item
        name="mainFilePath"
        label="Tài liệu chính"
        valuePropName="file"
        getValueFromEvent={normFile}
        rules={[
          // { required: true, message: 'Vui lòng tải lên tài liệu chính cho kế hoạch' },
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
          onChange={(file) => (file.fileList.length > 0 ? setMainFile(true) : setMainFile(false))}
          name="File"
          action={`${import.meta.env.VITE_BASE_URL_}/uploads/`}
          multiple
          accept=".pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          maxCount={1}
          listType="picture"
          beforeUpload={(file) => {
            return false;
          }}
        >
          <p className="ant-upload-drag-icon mb-0">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{'Nhấp hoặc kéo tệp vào khu vực này để tải tệp lên '}</p>
          <p className="ant-upload-hint">
            {'File tải lên có định dạng là:EXCEL,  WORD, PDF | Tối đa 50MB'}
          </p>
        </Upload.Dragger>
      </Form.Item>
      {!mainFile && schemeData.filePath && (
        <div className="mb-5 -mt-3 ">
          <ViewListPrivateFile
            arrayFile={[
              {
                id: schemeData.filePath,
                url: schemeData.filePath,
                fileName: schemeData.filePath,
              },
            ]}
          ></ViewListPrivateFile>
        </div>
      )}
      <Form.Item
        name="subFilePath"
        label="Tài liệu đính kèm"
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
          name="subFile"
          action={`${import.meta.env.VITE_BASE_URL_}/uploads/`}
          multiple
          accept=".pdf,.doc,.docx,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          maxCount={1}
          listType="picture"
          beforeUpload={(file) => {
            return false;
          }}
        >
          <p className="ant-upload-drag-icon mb-0">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">{'Nhấp hoặc kéo tệp vào khu vực này để tải tệp lên '}</p>
          <p className="ant-upload-hint">
            {'File tải lên có định dạng là:EXCEL,  WORD, PDF | Tối đa 50MB'}
          </p>
        </Upload.Dragger>
      </Form.Item>
      {!subFile && schemeData.subFiles && schemeData.subFiles.length > 0 && (
        <div className="mb-5 -mt-3 ">
          <ViewListPrivateFile
            arrayFile={[
              {
                id: schemeData.subFiles[0].id,
                url: schemeData.subFiles[0].filePath,
                fileName: schemeData.subFiles[0].fileName,
              },
            ]}
          ></ViewListPrivateFile>
        </div>
      )}
      <Button type="primary" htmlType="submit" className="w-full font-semibold">
        Lưu thay đổi
      </Button>
    </Form>
  );
};

export default EditScheme;
