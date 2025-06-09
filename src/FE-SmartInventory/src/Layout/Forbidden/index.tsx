import ForbiddenStore from '@/Stores/forbiddenStore';
import AuthStore from '@/Stores/userStore';
import { Button, Select } from 'antd';
import { Navigate, useNavigate } from 'react-router';
import img403 from '../../assets/img/error.png';

export default function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className=" bg-colorBgContainer h-dvh">
      <div className="w-full h-full m-auto container max-w-screen-sm mx-auto  flex justify-center flex-col ">
        <img src={img403} alt="" className="object-center" />
        <div className="text-center font-[700] tracking-wider text-primary-focus sm:text-lg lg:text-xl my-5">
          <h1 className="text-primary sm:text-xl lg:text-2xl">BẠN KHÔNG CÓ QUYỀN TRUY CẬP</h1>
          <p>Nếu có lỗi phát sinh, vui lòng liên hệ bộ phận kỹ thuật!</p>
        </div>
        <div className="text-center my-5 flex gap-5 mx-5 md:mx-0 flex-wrap md:flex-nowrap ">
          <Button
            onClick={() => {
              ForbiddenStore.getState().setForbidden(false);
              navigate('/self');
            }}
            type="primary"
            size="large"
            className=" w-full bg-successColor rounded-lg hover:bg-successColorHover font-semibold text-base "
          >
            VỀ TRANG CHỦ
          </Button>

          <Button
            size="large"
            type="primary"
            danger
            className="w-full font-semibold text-base  "
            onClick={() => {
              AuthStore.getState().logOut();
              navigate('/login');
            }}
          >
            ĐĂNG XUẤT
          </Button>
        </div>
      </div>
    </div>
  );
}
