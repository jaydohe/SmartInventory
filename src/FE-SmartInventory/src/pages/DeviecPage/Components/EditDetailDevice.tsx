import ViewListFile from '@/Components/ViewListFile';
import { useBuilderQuery, useUploadFile } from '@/hook';
import { useGetAllCities, useGetAllDistricts, useGetAllWards } from '@/hook/usePublicAddress';
import { TBuilderQuery } from '@/interface';
import { TDevice, TUpdateDevice } from '@/interface/TDevice';
import { normFile } from '@/utils';
import { InboxOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
const { Option } = Select;
interface EditDeviceLocationFormProps {
  device: TDevice;

  handleUpdateDevice: (data: TUpdateDevice) => void;
}

const EditDetailDevice: React.FC<EditDeviceLocationFormProps> = ({
  device,

  handleUpdateDevice,
}) => {
  console.log(device);
  const [form] = Form.useForm();
  const [mainFile, setMainSubFile] = useState<boolean>(false);
  const { uploadFile } = useUploadFile();
  const [selectedLocations, setSelectedLocations] = useState<{
    cityCode?: string | null;
    districtCode?: string | null;
    wardCode?: string | null;
  }>({
    cityCode: device.provinceId,
    districtCode: device.districtId,
    wardCode: device.wardId,
  });

  const [filterDistricts, setFilterDistricts] = useState<TBuilderQuery>({
    appendQuery: [
      {
        provinceId: {
          value: device.provinceId ? device.provinceId : '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });
  const [filterWards, setFilterWards] = useState<TBuilderQuery>({
    appendQuery: [
      {
        districtId: {
          value: device.districtId ? device.districtId : '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const { data: cityList } = useGetAllCities(useBuilderQuery({ toJoin: ['id', 'name'] }));
  const { data: districtList, refetch: refetchDistricts } = useGetAllDistricts(
    useBuilderQuery(filterDistricts)
  );
  const { data: wardList, refetch: refetchWards } = useGetAllWards(useBuilderQuery(filterWards));

  useEffect(() => {
    form.setFieldsValue({
      refGatewayId: device.refGatewayId,
      refId: device.refId,
      // imagePath: device.imagePath,

      provinceId: device.provinceId,
      districtId: device.districtId,
      wardId: device.wardId,
      address: device.address,
      name: device.name,
      description: device.description,
    });
    setSelectedLocations({
      cityCode: device.provinceId,
      districtCode: device.districtId,
      wardCode: device.wardId,
    });
  }, [device]);

  const handleCityChange = (valueId: string) => {
    form.setFieldsValue({
      districtId: undefined,
      wardId: undefined,
    });

    setSelectedLocations({
      cityCode: valueId,
      districtCode: undefined,
      wardCode: undefined,
    });

    setFilterDistricts({
      appendQuery: [
        {
          provinceId: {
            value: valueId,
            queryOperator: '$eq',
            queryOperatorParent: '$and',
          },
        },
      ],
    });
  };

  const handleDistrictChange = (valueId: string) => {
    form.setFieldsValue({
      wardId: undefined,
    });

    setSelectedLocations((prev) => ({
      ...prev,
      districtCode: valueId,
      wardCode: undefined,
    }));

    setFilterWards({
      appendQuery: [
        {
          districtId: {
            value: valueId,
            queryOperator: '$eq',
            queryOperatorParent: '$and',
          },
        },
      ],
    });
  };

  const onSubmit = async (values: any) => {
    const uploadFileMain =
      values.imagePath && values.imagePath.length < 0
        ? uploadFile.mutateAsync(values.imagePath)
        : Promise.resolve(null);

    const [fileData] = await Promise.all([uploadFileMain]);

    if (fileData) {
      values.imagePath = fileData.url;
    }

    if (typeof values.imagePath === 'object' && values.imagePath.length <= 0) {
      delete values.imagePath;
    }

    const newData = { ...values, deviceCode: device.code };
    console.log('newData', newData);
    handleUpdateDevice(newData);
  };

  return (
    <Form form={form} onFinish={onSubmit} layout="vertical">
      <Form.Item
        name="name"
        className="w-full text-base font-medium"
        label="Tên thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
      >
        <Input placeholder="Nhập tên thiết bị" />
      </Form.Item>
      <Form.Item name="description" className="w-full text-base font-medium" label="Mô tả">
        <Input placeholder="Nhập mô tả" />
      </Form.Item>
      <div className="grid grid-cols-2 gap-x-3">
        <Form.Item
          label="EOH-GatewayId"
          name="refGatewayId"
          className="w-full text-base font-medium"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="EOH-Id"
          name="refId"
          className="w-full text-base font-medium"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3">
        <Form.Item
          name="provinceId"
          label="Tỉnh/Thành phố"
          className="w-full text-base font-medium"
          // rules={[{ required: true }]}
        >
          <Select
            virtual={false}
            placeholder="Chọn Tỉnh/Thành phố"
            onChange={handleCityChange}
            showSearch
            optionFilterProp="label"
          >
            {cityList?.data?.map((city) => (
              <Option key={city.id} value={city.id} label={city.name}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="districtId"
          label="Quận/Huyện"
          className="w-full text-base font-medium"
          // rules={[{ required: true }]}
        >
          <Select
            virtual={false}
            placeholder="Chọn Quận/Huyện"
            onChange={handleDistrictChange}
            disabled={!selectedLocations.cityCode}
            showSearch
            optionFilterProp="label"
          >
            {districtList?.data?.map((district) => (
              <Option key={district.id} value={district.id} label={district.name}>
                {district.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="wardId"
          label="Phường/Xã"
          className="w-full text-base font-medium"
          // rules={[{ required: true }]}
        >
          <Select
            virtual={false}
            placeholder="Chọn Phường/Xã"
            disabled={!selectedLocations.districtCode}
            showSearch
            optionFilterProp="label"
          >
            {wardList?.data?.map((ward) => (
              <Option key={ward.id} value={ward.id} label={ward.name}>
                {ward.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        name="address"
        label="Số nhà, tên đường"
        className="w-full text-base font-medium"
        // rules={[{ required: true }]}
      >
        <Input placeholder="Nhập số nhà, tên đường" />
      </Form.Item>

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
            file.fileList.length > 0 ? setMainSubFile(true) : setMainSubFile(false)
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
          <p className="ant-upload-text">{'Nhấp hoặc kéo tệp vào khu vực này để tải ảnh lên '}</p>
          <p className="ant-upload-hint">{'File tải lên có định dạng là: JPG/PNG | Tối đa 50MB'}</p>
        </Upload.Dragger>
      </Form.Item>
      {!mainFile && device.imagePath && (
        <div className="mb-5 -mt-3 ">
          <ViewListFile
            arrayFile={[
              {
                id: device.id,
                filePath: device.imagePath,
                fileName: device.imagePath.split('/').pop() as string,
              },
            ]}
          ></ViewListFile>
        </div>
      )}
      <Button
        htmlType="submit"
        className="py-0 px-4 w-full bg-infoColor hover:bg-infoColorHover"
        size="large"
        type="primary"
        danger
        shape="round"
      >
        Cập nhật thiết bị
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

export default EditDetailDevice;
