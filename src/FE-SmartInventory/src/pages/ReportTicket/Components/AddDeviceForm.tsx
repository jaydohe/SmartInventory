import { FC, useEffect, useState } from 'react';
import { CheckOutlined, InboxOutlined, LoginOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Select, Button, Upload, Avatar, Typography } from 'antd';
import { TPosition } from '@/hook/useUserGeolocation';
import { TBuilderQuery } from '@/interface';
import { useGetAllCities, useGetAllDistricts, useGetAllWards } from '@/hook/usePublicAddress';
import { useBuilderQuery, useUploadFile } from '@/hook';
import { normFile } from '@/utils';
import { useQueryDeviceType } from '@/hook/useQueryDeviceType';
import { authStoreSelectors } from '@/Stores/userStore';
import { useQueryDevice } from '@/hook/useQueryDevice';
import { TCreateDevice } from '@/interface/TDevice';
const { Option } = Select;
interface AddReportTicketFormProps {
  isEdit: boolean;

  handleAddDevice: (values: TCreateDevice) => void;
  position?: TPosition | null;
}

const AddReportTicketForm: FC<AddReportTicketFormProps> = ({
  isEdit = false,
  handleAddDevice,
  position,
}) => {
  const [form] = Form.useForm();
  const [isGateWay, setIsGateWay] = useState<boolean>(false);

  const { uploadFile } = useUploadFile();

  const unitId = authStoreSelectors.use.unitId() ?? '';
  const [filterDevice, setFilterDevice] = useState<TBuilderQuery>({
    appendQuery: [
      // {
      //   search: { value: '', queryOperator: '$fli' },
      // },
      {
        unitId: {
          value: unitId,
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
      {
        refGatewayId: {
          value: 'null',
          queryOperator: '$neq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  // console.log('ADDRESS', cityList, districtList, wardList);

  const handleSubmit = async (values: any) => {
    const uploadFileMain = values.imagePath
      ? uploadFile.mutateAsync(values.imagePath)
      : Promise.resolve(null);

    const [fileData] = await Promise.all([uploadFileMain]);

    if (fileData) {
      console.log(`file chính`, fileData);
      values.imagePath = fileData.url;
    }

    const newData = { ...values, isGateWay: isGateWay };

    await handleAddDevice(newData);
    // form.resetFields();
    // onClose();
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="name"
        className="w-full text-base font-medium"
        label="Tên thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" className="w-full text-base font-medium" label="Mô tả">
        <Input placeholder="Nhập mô tả" />
      </Form.Item>

      <Form.Item
        name="imagePath"
        label="Ảnh thiết bị"
        valuePropName="file"
        getValueFromEvent={normFile}
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
        name="imagePath"
        label="Ảnh thiết bị"
        valuePropName="file"
        getValueFromEvent={normFile}
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
      <Button
        htmlType="submit"
        className="py-0 px-4 w-full bg-infoColor hover:bg-infoColorHover"
        size="large"
        type="primary"
        danger
        shape="round"
        // icon={<CheckOutlined />}
      >
        Tạo Thiết Bị
      </Button>
      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddReportTicketForm;
