import { GENDER } from "@/Constant/EmployeeTypes";
import { useBuilderQuery } from "@/hook";
import { useQueryWarehouse } from "@/hook/useQueryWarehouse";
import { TBuilderQuery } from "@/interface";
import { TCreateEmployee } from "@/interface/TEmployee";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useState } from "react";
import { TiUserAdd } from "react-icons/ti";
import GenderTag from "./GenderTag";
import { useGetAllCities, useGetAllDistricts, useGetAllWards } from "@/hook/usePublicAddress";
import CreateUser from "@/pages/User/Components/CreateUser";
import { CalendarOutlined } from '@ant-design/icons';
import moment from "moment";

const { Option } = Select;

const CreateEmployee = ({ handleCreateEmployee }: { handleCreateEmployee: (data: TCreateEmployee) => void }) => {
    const [form] = Form.useForm();
    const [filter, setFilter] =useState<TBuilderQuery>( {
      toJoin: ['users.*'],
      isAsc: true,
      orderBy: 'name',
      toPaging: {
        page: 1,
        pageSize: 10,
      },
    });
    const { getAllWarehouse } = useQueryWarehouse(useBuilderQuery(filter));
    // const { getAllDepartment } = useQueryDepartment(useBuilderQuery(filter));
    // const { getAllPosition } = useQueryPosition(useBuilderQuery(filter));

    const [selectedLocations, setSelectedLocations] = useState<{
      cityCode?: string;
      districtCode?: string;
      wardCode?: string;
    }>({});
    
    const [filterDistricts, setFilterDistricts] = useState<TBuilderQuery>({});
    const [filterWards, setFilterWards] = useState<TBuilderQuery>({});
    
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
  
    const onFinish = (data: TCreateEmployee) => {
      console.log('data:', data);
  
      handleCreateEmployee(data);
      form.resetFields();
    };
  
    return (
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="code"
          label="Mã nhân viên"
          rules={[{ required: true, message: 'Vui lòng nhập mã nhân viên' }]}
        >
          <Input placeholder="Nhập mã nhân viên" />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên nhân viên"
          rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên' }]}
        >
          <Input placeholder="Nhập tên nhân viên" />
        </Form.Item>
        <Form.Item 
          name="gender" 
          label="Giới tính"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
        >
          <Select placeholder="Chọn giới tính">
            {GENDER.map((gender) => (
              <Select.Option key={gender.id} value={gender.name}>
                <GenderTag gender={gender.name} />
              </Select.Option>
            ))}
          </Select>
        </Form.Item>   
        <Form.Item
          name="phone"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}  
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email' }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          name="wardId"
          label="Phường/xã"
          className="w-full text-base font-medium"
          rules={[{ required: true, message: 'Vui lòng chọn Phường/Xã' }]}
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
        <Form.Item
          name="districtId"
          label="Quận/huyện"
          className="w-full text-base font-medium"
          rules={[{ required: true, message: 'Vui lòng chọn Quận/Huyện' }]}
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
          name="cityId"
          label="Tỉnh/thành phố"
          className="w-full text-base font-medium"
          rules={[{ required: true, message: 'Vui lòng chọn Tỉnh/Thành phố' }]}
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
          name="address"
          label="Số nhà, tên đường"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input placeholder="Nhập Số nhà, tên đường" />
        </Form.Item>
        <Form.Item
          name="dateHired"
          label="Ngày vào làm"
        >
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
          name="warehouseId"
          label="Kho"
          rules={[{ required: true, message: 'Vui lòng chọn kho' }]}
        >
          <Select placeholder="Chọn kho" virtual={false}>
          {getAllWarehouse.data?.data.filter((warehouse) => warehouse.employees.length < 10).map((warehouse) => (
              <Select.Option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item
          name="departmentId"
          label="Phòng ban"
          rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]}
        >
          <Select placeholder="Chọn phòng ban" virtual={false}>
            {getAllDepartment.data?.data.filter((department) => department.employees.length < 10).map((warehouse) => (
              <Select.Option key={department.id} value={department.id}>
                {department.name}
              </Select.Option>
            ))}
        </Select>
        </Form.Item> */}
        {/* <Form.Item
          name="positionId"
          label="Chức vụ"
          rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
        >
          <Select placeholder="Chọn chức vụ" allowClear onChange={(value) => setFilter({ ...filter, positionId: value })}>
            {getAllPosition.data?.data.filter((position) => position.employees.length < 10).map((warehouse) => (
              <Select.Option key={position.id} value={position.id}>
                {position.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item> */}
        <Form.Item
          name="isManager"
          label="Quản lý"
          valuePropName="checked"
          rules={[{ required: true, message: 'Vui lòng chọn quản lý' }]}
        >
          <Select placeholder="Chọn quản lý" virtual={false}>
            <Select.Option value={true}>Có</Select.Option>
            <Select.Option value={false}>Không</Select.Option>
          </Select>
        </Form.Item>
        <Button
          type="primary"
          // variant="solid"
          htmlType="submit"
          className="w-full font-semibold "
          icon={<TiUserAdd />}
        >
          Thêm người dùng
        </Button>
      </Form>
    );
  };
  
  export default CreateUser;
  