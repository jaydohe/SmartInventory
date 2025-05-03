import { CaretRightOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';

import BGLogin from '@/assets/img/123.jpg';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
// import { useAppDispatch, useAppSelector } from '../../apps/hooks';

import logo from '@/assets/img/logo1.png';
import element_so_2 from '@/assets/img/element so 2.png';

import { TForgotPassword, TLoginForm } from '@/interface/TAuth';
import AuthStore, { authStoreSelectors } from '@/Stores/userStore';
import { useLoginNew } from '@/hook/useAuthHRM';

const LoginNew: React.FC = () => {
  const navigate = useNavigate();
  const accessToken = authStoreSelectors.use.accessToken();
  const refreshToken = authStoreSelectors.use.refreshToken();
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const { login } = useLoginNew();
  // console.log('token', accessToken, 'token', refreshToken);
  useEffect(() => {
    if (accessToken && refreshToken) {
      navigate('/smart-management');
    }
  }, [accessToken, refreshToken]);

  const handleLogin = async (data: TLoginForm) => {
    console.log(data);
    login.mutate(data, {
      onSuccess: (data) => {
        AuthStore.getState().logIn(data.data);
        // navigate('/dashboard');
      },
    });
  };

  const handleForgotPassword = async (data: TForgotPassword) => {
    console.log(data);
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
      {/* <div className="absolute text-sm xl:text-base  bottom-3 inset-x-0 px-5 text-primary  text-center">
        <p>
          Design by{' '}
          <a
            href=""
            className="text-infoColorHover hover:text-infoColor font-semibold"
          >
            Jaydohe
          </a>
        </p>
      </div> */}
      <div className="flex justify-center items-center min-h-[100dvh]  ">
        <div className=" w-full  items-center flex  justify-center  rounded-2xl px-6 py-8 xl:gap-12">
          <div className="w-full xl:w-[55%] xl:flex xl:flex-col xl:items-center  xl:justify-center hidden ">
            {/* drop-shadow-xl */}
            <h2 className="text-3xl 2xl:text-4xl text-center text-pretty font-[900] text-primary">
              Phần Mềm Quản Lý Hàng Hóa Thông Minh
            </h2>
            <img src={element_so_2} alt="" className="object-cover text-center " />
          </div>
          <div className="w-full xl:w-[45%] md:mx-12 xl:ml-14 xl:mr-0">
            <div className=" w-full xl:flex xl:flex-col xl:items-center  xl:justify-center   ">
              <img
                src={logo}
                alt=""
                className="object-cover text-center w-2/3 sm:w-1/2 md:w-1/3 xl:w-1/3 mx-auto "
              />
              <h2 className="text-2xl sm:text-3xl  text-pretty font-[900] text-primary text-center xl:text-textWhite mt-1 mb-6">
                
              </h2>
            </div>
            <Form
              name="normal_login_SmartInventory"
              initialValues={{ remember: true }}
              onFinish={(data) => (forgotPassword ? handleForgotPassword(data) : handleLogin(data))}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="border-black login-form w-full xl:w-4/5  my-0 mx-auto "
            >
              <div className="mb-3 ">
                {!forgotPassword ? (
                  <h1 className="text-2xl font-bold uppercase xl:text-textWhite">Đăng nhập</h1>
                ) : (
                  <h1 className="text-2xl font-bold uppercase xl:text-textWhite">
                    Quên mật khẩu ?
                  </h1>
                )}
              </div>

              {!forgotPassword && (
                <>
                  <Form.Item
                    className=" text-base "
                    name="loginName"
                    rules={[
                      {
                        required: true,
                        message: `${'Vui lòng nhập tài khoản đăng nhập!'}`,
                      },
                    ]}
                  >
                    <Input
                      className=" text-base "
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder={'Tài khoản đăng nhập'}
                    />
                  </Form.Item>

                  <Form.Item
                    className=" text-base mb-3"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: `${'Vui lòng nhập mật khẩu!'}`,
                      },
                    ]}
                  >
                    <Input.Password
                      className=" text-base "
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder={'Mật khẩu'}
                    />
                  </Form.Item>
                </>
              )}
              {forgotPassword && (
                <>
                  <div className="text-base   mb-1 xl:text-textWhite">
                    {'Vui lòng cung cấp email đăng nhập để lấy lại mật khẩu.'}
                  </div>
                  <Form.Item
                    className=" text-base "
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: 'email',
                        message: `${'Email bạn nhập không hợp lệ. Vui lòng kiểm tra lại.'}`,
                      },
                    ]}
                  >
                    <Input
                      className=" text-base "
                      prefix={<MailOutlined className="site-form-item-icon" />}
                      placeholder={'Email'}
                    />
                  </Form.Item>
                </>
              )}

              {/* {!forgotPassword && (
                <div className="login-form-forgot xl:text-textWhite   mb-3">
                  Quên mật khẩu?&nbsp;
                  <Button
                    type="link"
                    className="p-0 h-auto cursor-pointer xl:text-primary xl:hover:text-colorLink"
                    onClick={() => setForgotPassword(!forgotPassword)}
                  >
                    nhấn vào đây
                  </Button>
                </div>
              )} */}

              <Form.Item className="mb-2">
                {!forgotPassword ? (
                  <Button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    className="login-form-button w-full  mt-3 flex border-none items-center justify-center text-base font-semibold bg-colorLink hover:bg-colorLinkHover"
                  >
                    <CaretRightOutlined className="site-form-item-icon" />
                    Đăng nhập
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button w-full  flex items-center justify-center text-base font-semibold "
                  >
                    <MailOutlined className="site-form-item-icon" />
                    Đặt lại mật khẩu
                  </Button>
                )}
              </Form.Item>
              {forgotPassword && (
                <div className="login-form-forgot text-base text-center  ">
                  <Button
                    type="link"
                    className="px-0 cursor-pointer xl:text-primary "
                    onClick={() => setForgotPassword(!forgotPassword)}
                  >
                    Trở về đăng nhập
                  </Button>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginNew;
