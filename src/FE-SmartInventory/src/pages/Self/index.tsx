import { Button, Card, Form, Input, Avatar, Row, Col, Descriptions, Modal } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import { getUserInfo } from '@/hook/useAuthHRM';
import { IUpdatePasswordSelf, IUpdateUserInfo } from '../../interface/ISelf';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys, RoleEnumString } from '@/Constant';
import { authStoreSelectors } from '@/Stores/userStore';
import RoleTag from '../User/Components/RoleTag';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';

export default function SelfInfo() {
  const queryClient = useQueryClient();
  const { getInfo, updatePassWord, updateUserInfo } = getUserInfo();
  const { data: selfInfo } = getInfo;
  const [form] = Form.useForm();
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const role = authStoreSelectors.use.role();
  const handleUpdatePassWord = async (fieldsValue: IUpdatePasswordSelf) => {
    updatePassWord.mutate(fieldsValue, {
      onSuccess: () => {
        form.resetFields();
        setPasswordModalVisible(false);
      },
    });
  };

  const handleUpdateUserInfo = async (fieldsValue: IUpdateUserInfo) => {
    updateUserInfo.mutate(fieldsValue, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_INFO_USER] });
        form.resetFields();
        setInfoModalVisible(false);
      },
    });
  };

  // Password change modal
  const PasswordChangeModal = () => (
    <Form form={form} layout="vertical" onFinish={handleUpdatePassWord}>
      <Form.Item
        name="oldPassword"
        label="Mật khẩu cũ"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="newPassword"
        label="Mật khẩu mới"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Xác nhận mật khẩu mới"
        rules={[
          { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item className="mb-0 w-full">
        <Button type="primary" htmlType="submit" className="w-full rounded-2xl">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );

  // Info change modal
  const InfoChangeModal = () => (
    <Form
      layout="vertical"
      initialValues={{
        name: selfInfo?.data.name,
        loginName: selfInfo?.data.loginName,
      }}
      onFinish={handleUpdateUserInfo}
    >
      <Form.Item
        name="name"
        label="Tên người dùng"
        rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="loginName"
        label="Tên đăng nhập"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item className="mb-0 w-full">
        <Button type="primary" htmlType="submit" className="w-full rounded-2xl">
          Cập nhật
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className="p-4 mx-auto">
      <h2 className=" font-bold text-center mb-4 text-xl md:text-2xl  text-pretty  uppercase text-primary">
        Hồ sơ cá nhân
      </h2>

      {getInfo.data?.data && (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card bordered={false} className="h-full shadow-sm">
              <div className="py-auto text-center">
                <Avatar size={120} icon={<UserOutlined />} className="mb-4 bg-primary" />
                <h3 className="mb-2 text-xl font-semibold">{selfInfo?.data.name}</h3>
                <p className="font-medium text-base flex items-center justify-center gap-2">
                    {selfInfo?.data.wareName} <RoleTag role={role as RoleEnumString} />
                </p>

                <Row gutter={[16, 16]} className="mt-4">
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Button
                      type="primary"
                      icon={<FaRegEdit />}
                      onClick={() => setInfoModalVisible(true)}
                      block
                      className="rounded-2xl text-base font-medium"
                    >
                      Đổi thông tin
                    </Button>
                  </Col>
                  <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Button
                      type="primary"
                      icon={<RiLockPasswordFill  />}
                      onClick={() => setPasswordModalVisible(true)}
                      block
                      className="rounded-2xl text-base font-medium bg-colorLink hover:bg-colorLinkHover"
                    >
                      Đổi mật khẩu
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Card title="Thông tin tài khoản" bordered={false} className="shadow-sm">
              <Descriptions layout="horizontal" column={1} bordered size="small">
                <Descriptions.Item label="Tên Người Dùng">{selfInfo?.data.name}</Descriptions.Item>

                <Descriptions.Item label="Tên Đăng Nhập">{selfInfo?.data.loginName}</Descriptions.Item>
                <Descriptions.Item label="Phòng ban">
                  {selfInfo?.data.positionName === 'null'
                  ? 'Không có'
                  : selfInfo?.data.positionName}
                </Descriptions.Item>
                <Descriptions.Item label="Đơn vị kho">
                  {selfInfo?.data.wareName === 'null'
                  ? 'Không có'
                  : selfInfo?.data.wareName}
                  </Descriptions.Item>
                <Descriptions.Item label="Giới tính">
                  {selfInfo?.data.gender === 'FEMALE'
                    ? 'Nữ'
                    : selfInfo?.data.gender === 'MALE'
                    ? 'Nam'
                    : 'Khác'}
                </Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">
                  {selfInfo?.data.phoneNumber
                  ? 'Không có'
                  : selfInfo?.data.phoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {selfInfo?.data.email
                  ? 'Không có'
                  : selfInfo?.data.email}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ">
                  {selfInfo?.data.address
                  ? 'Không có'
                  : selfInfo?.data.address}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
      )}

      <Modal
        title="Đổi mật khẩu"
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
        centered
      >
        <PasswordChangeModal />
      </Modal>
      <Modal
        title="Cập nhật thông tin tài khoản"
        open={infoModalVisible}
        onCancel={() => setInfoModalVisible(false)}
        footer={null}
        centered
      >
        <InfoChangeModal />
      </Modal>
    </div>
  );
}
