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
import { DeviceStatusEnum } from '@/Constant/DeviceEnum';
const { Option } = Select;
interface AddDeviceFormProps {
  isVisible: boolean;

  handleAddDevice: (values: TCreateDevice) => void;
  position: TPosition | null;
  initialMacAddress?: string;
}

const AddDeviceForm: FC<AddDeviceFormProps> = ({
  isVisible,

  handleAddDevice,
  position,
  initialMacAddress = '',
}) => {
  const [form] = Form.useForm();
  const [isGateWay, setIsGateWay] = useState<boolean>(false);
  const [selectedLocations, setSelectedLocations] = useState<{
    cityCode?: string;
    districtCode?: string;
    wardCode?: string;
  }>({});
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

  const { getAllDevice } = useQueryDevice(useBuilderQuery(filterDevice));
  const { data: devices } = getAllDevice;
  const [filterDistricts, setFilterDistricts] = useState<TBuilderQuery>({});
  const [filterWards, setFilterWards] = useState<TBuilderQuery>({});
  const { getAllDeviceType } = useQueryDeviceType(
    useBuilderQuery({ toJoin: ['id', 'name', 'isGateway', 'iconPath'] })
  );
  const { data: deviceTypeList, isLoading: deviceTypeLoading } = getAllDeviceType;
  const { data: cityList, isLoading: cityLoading } = useGetAllCities(
    useBuilderQuery({ toJoin: ['id', 'name'] })
  );
  const {
    data: districtList,
    isLoading: districtLoading,
    refetch: refetchDistricts,
  } = useGetAllDistricts(useBuilderQuery(filterDistricts));
  const {
    data: wardList,
    isLoading: wardLoading,
    refetch: refetchWards,
  } = useGetAllWards(useBuilderQuery(filterWards));

  // console.log('ADDRESS', cityList, districtList, wardList);

  const handleCityChange = async (valueId: string) => {
    try {
      // Reset everything first
      form.setFieldsValue({
        districtCode: undefined,
        wardCode: undefined,
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
              value: `${valueId}`,
              queryOperator: '$eq',
              queryOperatorParent: '$and',
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error updating city:', error);
    }
  };

  const handleDistrictChange = async (valueId: string) => {
    try {
      // Reset ward field
      form.setFieldsValue({
        wardCode: undefined,
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
              value: `${valueId}`,
              queryOperator: '$eq',
              queryOperatorParent: '$and',
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error updating district:', error);
    }
  };

  const handleWardChange = (valueId: string) => {
    setSelectedLocations((prev) => ({
      ...prev,
      wardCode: valueId,
    }));
  };

  // Reset form when modal opens with initial MAC address
  useEffect(() => {
    if (isVisible && initialMacAddress && position) {
      form.setFieldsValue({
        deviceCode: initialMacAddress,
        longitude: position.lng,
        latitude: position.lat,
      });
    }
  }, [isVisible, initialMacAddress, position]);

  const handleSubmit = async (values: any) => {
    const uploadFileMain = values.imagePath
      ? uploadFile.mutateAsync(values.imagePath)
      : Promise.resolve(null);

    const [fileData] = await Promise.all([uploadFileMain]);

    if (fileData) {
      values.imagePath = fileData.url;
    }

    const newData = { ...values, isGateWay: isGateWay };

    await handleAddDevice(newData);
    // form.resetFields();
    // onClose();
  };

  const handleDeviceTypeChange = (value: string) => {
    const selectedDeviceType = deviceTypeList?.data?.find((deviceType) => deviceType.id === value);
    setIsGateWay(selectedDeviceType?.isGateway ?? false);
  };

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="deviceCode"
        label="Địa chỉ MAC"
        className="w-full text-base font-medium"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ MAC' }]}
      >
        <Input disabled={!!initialMacAddress} />
      </Form.Item>
      <Form.Item
        name="name"
        className="w-full text-base font-medium"
        label="Tên thiết bị"
        rules={[{ required: true, message: 'Vui lòng nhập tên thiết bị' }]}
      >
        <Input placeholder="Nhập tên thiết bị" />
      </Form.Item>

      <div className={`grid ${isGateWay ? 'sm:grid-cols-1' : ' sm:grid-cols-2'} gap-x-3`}>
        <Form.Item
          name="deviceTypeId"
          label="Loại thết bị:"
          className="w-full text-base font-medium"
          rules={[{ required: true, message: 'Vui lòng chọn loại thiết bị' }]}
        >
          <Select
            virtual={false}
            placeholder="Chọn loại thiết bị"
            onChange={handleDeviceTypeChange}
            showSearch
            optionFilterProp="label"
          >
            {deviceTypeList &&
              deviceTypeList?.data?.map((deviceType) => (
                <Option key={deviceType.id} value={deviceType.id} label={deviceType.name}>
                  <Avatar size={'small'} src={deviceType.iconPath}></Avatar>
                  {deviceType.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        {!isGateWay && (
          <Form.Item
            name="deviceMasterId"
            label="Loại Gateway/Master:"
            className="w-full text-base font-medium"
            rules={[{ required: true, message: 'Vui lòng chọn loại Loại Gateway/Master' }]}
          >
            <Select
              virtual={false}
              placeholder="Chọn loại Loại Gateway/Master"
              // onChange={handleDistrictChange}
              showSearch
              optionFilterProp="label"
            >
              {devices &&
                devices?.data?.map((device) => (
                  <Option key={device.id} value={device.id} label={device.name}>
                    <Avatar size={'small'} src={device.iconPath}></Avatar>
                    {device.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        )}
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-3">
        <Form.Item name="description" className="w-full text-base font-medium" label="Mô tả">
          <Input placeholder="Nhập mô tả" />
        </Form.Item>
        <Form.Item
          label="Vĩ độ"
          name={'latitude'}
          className="w-full text-base font-medium"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kinh độ"
          name={'longitude'}
          className="w-full text-base font-medium"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="provinceId"
          label="Tỉnh/Thành phố:"
          className="w-full text-base font-medium"
          // rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành phố' }]}
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
          label="Quận/Huyện:"
          className="w-full text-base font-medium"
          // rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện' }]}
        >
          <Select
            virtual={false}
            placeholder="Chọn Quận/Huyện"
            onChange={handleDistrictChange}
            disabled={!selectedLocations.cityCode}
            showSearch
            optionFilterProp="label"
          >
            {selectedLocations.cityCode &&
              districtList?.data?.map((district) => (
                <Option key={district.id} value={district.id} label={district.name}>
                  {district.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="wardId"
          label="Phường/Xã:"
          className="w-full text-base font-medium"
          // rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã' }]}
        >
          <Select
            virtual={false}
            placeholder="Chọn Phường/Xã"
            onChange={handleWardChange}
            disabled={!selectedLocations.districtCode}
            showSearch
            optionFilterProp="label"
          >
            {selectedLocations.districtCode &&
              wardList?.data?.map((ward) => (
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
      <Button
        htmlType="submit"
        className="py-0 px-4 w-full bg-infoColor hover:bg-infoColorHover"
        size="large"
        type="primary"
        danger
        shape="round"
        icon={<CheckOutlined />}
      >
        Tạo Thiết Bị
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

export default AddDeviceForm;
