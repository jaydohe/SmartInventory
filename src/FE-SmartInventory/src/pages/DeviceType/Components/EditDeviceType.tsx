import ViewListFile from '@/Components/ViewListFile';
import { useUploadFile } from '@/hook/useUploadFile';
import { TCreateDeviceType, TDeviceType } from '@/interface/TDeviceType';
import { normFile } from '@/utils';
import { EditOutlined, InboxOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Tag,
  Typography,
  Upload,
} from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { useEffect, useState } from 'react';

const { Text } = Typography;

interface EditDeviceTypeProps {
  handleUpdateDeviceType: (id: string, data: TCreateDeviceType) => void;
  deviceType: TDeviceType;
}

const EditDeviceType: React.FC<EditDeviceTypeProps> = ({ handleUpdateDeviceType, deviceType }) => {
  const [form] = Form.useForm();
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [mainFile, setMainFile] = useState<boolean>(false);
  const { uploadFile } = useUploadFile();

  useEffect(() => {
    if (deviceType) {
      form.setFieldsValue({
        name: deviceType.name,
      });
    }
  }, [deviceType, form]);

  const onFinish = async (values: TCreateDeviceType) => {
    const uploadImagePath = values.iconPath
      ? uploadFile.mutateAsync(values.iconPath)
      : Promise.resolve(null);
    const [iconPath] = await Promise.all([uploadImagePath]);

    if (iconPath) {
      values.iconPath = iconPath.url;
    }
    handleUpdateDeviceType(deviceType.id, values);
    form.resetFields();
    setMainFile(false);
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Tên loại thiết bị"
          className="font-medium"
          rules={[{ required: true, message: 'Vui lòng nhập tên loại thiết bị' }]}
        >
          <Input placeholder="Nhập tên loại thiết bị" className="w-full" />
        </Form.Item>
        <Form.Item
          className="w-full text-base font-semibold "
          name="iconPath"
          label="Icon Loại Thiết bị"
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
            onChange={(file) => (file.fileList.length > 0 ? setMainFile(true) : setMainFile(false))}
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
        {!mainFile && deviceType.iconPath && (
          <div className="mb-5 -mt-3 ">
            <ViewListFile
              arrayFile={[
                {
                  id: deviceType.id,
                  filePath: deviceType.iconPath,
                  fileName: deviceType.iconPath.split('/').pop() as string,
                },
              ]}
            ></ViewListFile>
          </div>
        )}

        {/* Submit Button */}

        <Button type="primary" htmlType="submit" className="w-full font-semibold text-base">
          Cập nhật loại thiết bị
        </Button>
      </Form>
    </>
  );
};

export default EditDeviceType;
