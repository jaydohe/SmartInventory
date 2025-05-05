import { CaretRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import BGLogin from '@/assets/img/Login_Background_2.png';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';

import logo from '@/assets/img/Login_Logo.png';
import introLogo from '@/assets/img/Login_Img.png';

import { TLoginForm } from '@/interface';
import AuthStore, { authStoreSelectors } from '@/Stores/userStore';
import { useLoginNew } from '@/hook/useAuthHRM';

const LoginNew: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = authStoreSelectors.use.accessToken();
  const refreshToken = authStoreSelectors.use.refreshToken();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const { login } = useLoginNew();

  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate('/agency');
    }
  }, [accessToken, refreshToken]);

  const handleLogin = async (data: TLoginForm) => {
    console.log(data);
    login.mutate(data, {
      onSuccess: (data) => {
        AuthStore.getState().logIn(data.data);
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOpenRegister = () => {
    setIsRegister(true);
  };
  const handleCloseRegister = () => {
    setIsRegister(false);
  };

  return (
    <div
      className="w-full min-h-[100dvh] bg-left-top xl:bg-center"
      style={{
        backgroundImage: `url(${BGLogin})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="flex justify-center items-center min-h-[100dvh]">
        <div className="w-full items-center flex justify-center rounded-2xl px-6 py-8 xl:gap-12">
          <div className="w-full xl:w-[55%] xl:flex xl:flex-col xl:items-center xl:justify-center hidden">
            <h2 className="text-3xl 2xl:text-4xl text-center text-pretty font-[900] text-primary">
              Quản Lý Hàng Hóa Thông Minh
            </h2>
            <img src={introLogo} alt="" className="object-cover text-center" />
          </div>
          <div className="w-full xl:w-[45%] md:mx-12 xl:ml-14 xl:mr-0">
            <div className="w-full xl:flex xl:flex-col xl:items-center xl:justify-center">
              <img
                src={logo}
                alt=""
                className="object-cover text-center w-2/3 sm:w-1/2 md:w-1/3 xl:w-1/3 mx-auto"
              />
              <h2 className="text-2xl sm:text-3xl text-pretty font-[900] text-primary text-center xl:text-textWhite mt-1 mb-6">
                SMART INVENTORY
              </h2>
            </div>
            <Form
              name="normal_login_ZLight"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="border-black login-form w-full xl:w-4/5 my-0 mx-auto"
            >
              <div className="mb-3">
                <h1 className="text-2xl font-bold uppercase xl:text-textWhite">Đăng nhập</h1>
              </div>

              <Form.Item
                className="text-base"
                name="loginName"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tài khoản đăng nhập!',
                  },
                ]}
              >
                <Input
                  className="text-base"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Tài khoản đăng nhập"
                />
              </Form.Item>

              <Form.Item
                className="text-base mb-3"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!',
                  },
                ]}
              >
                <Input.Password
                  className="text-base"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>

              <Form.Item className="mb-2">
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  className="login-form-button w-full mt-3 flex border-none items-center justify-center text-base font-semibold bg-colorLink hover:bg-colorLinkHover"
                >
                  <CaretRightOutlined className="site-form-item-icon" />
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNew;
