import { useBuilderQuery } from '@/hook';
import { useGetAllCities, useGetAllDistricts, useGetAllWards } from '@/hook/usePublicAddress';
import { TBuilderQuery } from '@/interface';
import { TDevice, TUpdateDevice } from '@/interface/TDevice';
import { Button, Form, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const { Option } = Select;
interface EditDeviceLocationFormProps {
  device: TDevice;
  newLocation: {
    lat: number;
    lng: number;
  };
  handleUpdateDevice: (data: TUpdateDevice) => void;
}

const EditDeviceLocationForm: React.FC<EditDeviceLocationFormProps> = ({
  device,
  newLocation,
  handleUpdateDevice,
}) => {
  console.log(device);
  const [form] = Form.useForm();
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
      latitude: newLocation.lat,
      longitude: newLocation.lng,
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
  }, [device, newLocation]);

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

  const onSubmit = (values: any) => {
    const newData = { ...values, deviceCode: device.code };

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
          label="Vĩ độ"
          name="latitude"
          className="w-full text-base font-medium"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kinh độ"
          name="longitude"
          className="w-full text-base font-medium"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </div>

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

      <Form.Item
        name="address"
        label="Số nhà, tên đường"
        className="w-full text-base font-medium"
        // rules={[{ required: true }]}
      >
        <Input placeholder="Nhập số nhà, tên đường" />
      </Form.Item>

      <Button
        htmlType="submit"
        className="py-0 px-4 w-full bg-infoColor hover:bg-infoColorHover"
        size="large"
        type="primary"
        danger
        shape="round"
      >
        Cập nhật vị trí
      </Button>
    </Form>
  );
};

export default EditDeviceLocationForm;
