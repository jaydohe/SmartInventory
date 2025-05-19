import { Button, Card, Col, Divider, Form, Input, Modal, Row, Space, Tag, Typography } from 'antd';
import { QueryKeys, RoleEnumString, UserOptionEnum } from '@/Constant';
import { TUpdatePassword, TUpdateUser } from '@/interface/TUser';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  KeyOutlined,
  LockOutlined,
  UnlockOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQueryDetailUser, useQueryUser } from '../Hook/useQueryUser';
import ChangeRole from './ChangeRole';
import ChangeStatus from './DeleteAccount';
import RoleTag from './RoleTag';
import UpdatePassword from './UpdatePassword';
import UpdateUser from './UpdateUser';
import DeleteAccount from './DeleteAccount';
import { toast } from 'react-toastify';

export default function UserInfo({
  handleCloseDrawer,
  userId,
}: {
  handleCloseDrawer: () => void;
  userId: string;
}) {
  const [form] = Form.useForm();
  const [action, setAction] = useState<UserOptionEnum | null>(null);
  const queryClient = useQueryClient();

  const { data: getInfo } = useQueryDetailUser(userId);
  const { updateUser, updateRole, updatePassword, deleteUser } = useQueryUser('');

  useEffect(() => {
    if (getInfo?.data) {
      form.setFieldsValue({
        id: getInfo.data.id,
        name: getInfo.data.name,
        loginName: getInfo.data.loginName,
        role: getInfo.data.role,
        employee: getInfo.data.employeeId,
        isLogin: getInfo.data.isLogin,
      });
    }
  }, [getInfo]);

  const handleUpdateUser = (value: TUpdateUser) => {
    updateUser.mutate(
      { id: userId, data: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_USER, userId] });
          setAction(null);
        },
      }
    );
  };

  const handleChangeRole = (newRole: RoleEnumString) => {
    updateRole.mutate(
      { id: userId, role: newRole },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_USER, userId] });
          setAction(null);
        },
      }
    );
  };

  const handleUpdatePassword = (data: TUpdatePassword) => {
    updatePassword.mutate(
      { id: userId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_USER, userId] });
          setAction(null);
        },
      }
    );
  };

  const handleDeleteUser = () => {
    deleteUser.mutate(userId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.DETAIL_USER, userId] });
        setAction(null);
        handleCloseDrawer();
      },
      onError: () => {},
    });
  };

  const renderLockStatusTag = (isLogin: boolean) => {
    return isLogin ? (
      <Tag icon={<CheckCircleOutlined />} color="green" className="text-sm   px-2 ">
        Hoạt động
      </Tag>
    ) : (
      <Tag icon={<CloseCircleOutlined />} color="red" className="text-sm   px-2 ">
        Bị khóa
      </Tag>
    );
  };

  return (
    <div className="">
      {getInfo?.data && (
        <Form form={form} className="" layout="horizontal">
          <Card className="" bordered style={{ backgroundColor: '#fff' }}>
            <Space direction="vertical" className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center md:flex-row flex-col">
                  <div className="w-16 h-16 md:flex items-center justify-center rounded-full bg-primary text-textWhite text-2xl font-bold mr-4 hidden">
                    {getInfo.data.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <Form.Item name="name" className="m-0">
                      <Input variant="borderless" size="large" className="p-0 font-bold" readOnly />
                    </Form.Item>
                    <Form.Item name="id" className="m-0">
                      <Input
                        variant="borderless"
                        size="small"
                        className="p-0 font-thin overflow-auto"
                        readOnly
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>

              <Divider className="my-2" />
              <div className="grid grid-cols-2 gap-4 ">
                <Form.Item label="Tên người dùng" name="name" className="mb-0">
                  <Input variant="borderless" size="large" className="p-0" readOnly />
                </Form.Item>
                <Form.Item label="Tên đăng nhập:" name="loginName" className="mb-0">
                  <Input variant="borderless" size="large" className="p-0" readOnly />
                </Form.Item>
                <Form.Item label="Quyền:" name="role" className="mb-0">
                  <RoleTag role={getInfo.data.role as RoleEnumString} />
                </Form.Item>
                <Form.Item label="Trạng thái:" name="isLogin" className="mb-0">
                  {renderLockStatusTag(getInfo.data.isLogin)}
                </Form.Item>
                <Form.Item label="Ngày tạo:" name="createdAt" className="mb-0">
                  {moment(getInfo.data.createdAt).format('DD/MM/YYYY HH:mm:ss')}
                </Form.Item>
                <Form.Item label="Lần sửa đổi cuối:" name="modifiedOn" className="mb-0">
                  {getInfo.data.modifiedOn
                    ? moment(getInfo.data.modifiedOn).format('DD/MM/YYYY HH:mm:ss')
                    : 'Chưa cập nhật'}
                </Form.Item>
              </div>
            </Space>
          </Card>
          <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setAction(UserOptionEnum.UPDATE_ACCOUNT)}
              className="flex items-center transition-colors font-medium"
              block
            >
              Cập nhật thông tin
            </Button>

            <Button
              type="primary"
              icon={<UserSwitchOutlined />}
              onClick={() => setAction(UserOptionEnum.CHANGE_ROLE)}
              className="flex items-center transition-colors font-medium"
              style={{ backgroundColor: '#722ed1', borderColor: '#722ed1' }}
              block
            >
              Đổi quyền
            </Button>

            <Button
              type="primary"
              icon={<KeyOutlined />}
              onClick={() => setAction(UserOptionEnum.CHANGE_PASSWORD)}
              className="flex items-center transition-colors font-medium"
              style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              block
            >
              Cài lại mật khẩu
            </Button>

            <Button
              danger={true}
              type="primary"
              icon={<DeleteOutlined />}
              onClick={() => setAction(UserOptionEnum.DELETE_ACCOUNT)}
              className={`flex items-center transition-colors font-medium ${'hover:border-red-400 hover:text-red-400'}`}
              style={{
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
              }}
              block
            >
              Xoá tài khoản
            </Button>
          </div>
        </Form>
      )}

      <Modal
        centered
        title={
          <h4 className="font-bold text-xl text-center mb-5 uppercase">
            Cập nhật thông tin người dùng
          </h4>
        }
        open={action === UserOptionEnum.UPDATE_ACCOUNT}
        footer={null}
        onCancel={() => setAction(null)}
      >
        <UpdateUser
          initialValues={{
            name: getInfo?.data?.name || '',
            loginName: getInfo?.data?.loginName || '',
          }}
          handleUpdateUser={handleUpdateUser}
          handleCancel={() => setAction(null)}
        />
      </Modal>

      <Modal
        centered
        title={<h4 className="font-bold text-xl text-center mb-5 uppercase">Cập nhật quyền</h4>}
        open={action === UserOptionEnum.CHANGE_ROLE}
        footer={null}
        onCancel={() => setAction(null)}
      >
        {getInfo?.data.role && (
          <ChangeRole
            currentRole={getInfo?.data.role}
            handleChangeRole={handleChangeRole}
            handleCancel={() => setAction(null)}
          />
        )}
      </Modal>

      <Modal
        centered
        title={<h4 className="font-bold text-xl text-center mb-5 uppercase">Cập nhật mật khẩu</h4>}
        open={action === UserOptionEnum.CHANGE_PASSWORD}
        footer={null}
        onCancel={() => setAction(null)}
      >
        <UpdatePassword
          handleUpdatePassword={handleUpdatePassword}
          handleCancel={() => setAction(null)}
        />
      </Modal>

      <Modal
        centered
        title={
          <Typography.Title level={4} className="uppercase" type="danger">
            Xoá tài khoản
          </Typography.Title>
        }
        open={action === UserOptionEnum.DELETE_ACCOUNT}
        footer={null}
        onCancel={() => setAction(null)}
      >
        <DeleteAccount
          isLogin={getInfo?.data.isLogin}
          handleDeleteAccount={handleDeleteUser}
          handleCancel={() => setAction(null)}
        />
      </Modal>
    </div>
  );
}
