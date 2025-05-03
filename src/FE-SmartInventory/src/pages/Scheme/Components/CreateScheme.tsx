import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Upload,
  Select,
  Typography,
  Row,
  Col,
  Space,
  Drawer,
  Divider,
  Card,
  Alert,
} from 'antd';
import {
  InboxOutlined,
  CalendarOutlined,
  TeamOutlined,
  FileTextOutlined,
  PaperClipOutlined,
  FormOutlined,
  LockFilled,
} from '@ant-design/icons';
import { uploadFileApi } from '@/api/uploadFileApi';
import { useQueryUser } from '@/pages/User/Hook/useQueryUser';
import { getAdapter } from 'axios';
import { useBuilderQuery, useUploadFile } from '@/hook';
import { TUser } from '@/interface/TUser';
import { normFile } from '@/utils';
import { TUploadFile } from '@/interface/TUploadFile';
import { current } from 'immer';
import moment from 'moment';
import RoleTag from '@/pages/User/Components/RoleTag';
import dayjs from 'dayjs';

const { Dragger } = Upload;
const { Option } = Select;
const { Text, Title } = Typography;

interface CreateSchemeProps {
  handleCreateScheme: (values: any) => void;
  listUser: TUser[] | [];
}

const CreateScheme: React.FC<CreateSchemeProps> = ({ handleCreateScheme, listUser }) => {
  const [form] = Form.useForm();
  const { uploadPrivateFile } = useUploadFile();

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
      values.mainFilePath = uploadedFileMain.objectName;
    }
    if (uploadedSubFile) {
      values.subFilePath = [
        {
          filePath: uploadedSubFile.objectName,
          fileName: uploadedSubFile.objectName,
        },
      ];
    }

    values.expireAt ? (values.expireAt = dayjs(values.expireAt)) : delete values.expireAt;

    // console.log('values: ', values);
    handleCreateScheme(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} className="px-2">
      {/* Thông tin cơ bản */}

      <Form.Item
        name="name"
        label="Tên kế hoạch"
        rules={[{ required: true, message: 'Vui lòng nhập tên kế hoạch' }]}
      >
        <Input placeholder="Nhập tên kế hoạch" prefix={<FormOutlined />} />
      </Form.Item>

      <Form.Item name="expireAt" label="Ngày hết hạn">
        <DatePicker
          placeholder="Chọn ngày"
          format="DD/MM/YYYY HH:mm"
          prefix={<CalendarOutlined />}
          className="w-full"
          showTime
          disabledDate={(current) => current && current < moment().startOf('day')}
        />
      </Form.Item>

      <Form.Item name="userIds" label="Phân công người thực hiện">
        <Select
          mode="multiple"
          placeholder="Chọn người dùng thực hiện kế hoạch này"
          optionFilterProp="children"
          showSearch
          suffixIcon={<TeamOutlined />}
          maxTagCount={5}
          virtual={false}
        >
          {listUser?.map((user) => (
            <Option key={user.id} value={user.id}>
              {/* <Text className="text-base mr-2 font-semibold">{user.name}</Text> */}
              <RoleTag role={user.role} userName={user.name} />
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="mainFilePath"
        label="Tài liệu chính"
        valuePropName="file"
        getValueFromEvent={normFile}
        rules={[
          { required: true, message: 'Vui lòng tải lên tài liệu chính cho kế hoạch' },
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

      <Button type="primary" htmlType="submit" className="w-full font-semibold">
        Tạo kế hoạch
      </Button>
    </Form>
  );
};

export default CreateScheme;
