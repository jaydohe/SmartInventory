import { Button } from 'antd';
import { useNavigate } from 'react-router';
import img404 from '../../assets/img/404.png';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className=" bg-white h-dvh ">
      <div className="h-full w-full container max-w-screen-lg  flex justify-center flex-col m-auto">
        <img src={img404} alt="" className="object-center" />
        <div className="text-center font-[900] tracking-wider text-primary-focus sm:text-lg lg:text-xl">
          <h1 className="text-primary sm:text-xl lg:text-2xl">KHÔNG TÌM THẤY TRANG</h1>
          <p>Xin lỗi, trang bạn đang truy cập không thể tìm thấy</p>
        </div>

        <div className="text-center my-5  " onClick={() => navigate('/device-map')}>
          <Button
            type="primary"
            size="large"
            className="btn w-3/6 bg-green-500 rounded-lg hover:bg-green-500 glass  text-bold "
          >
            VỀ TRANG CHỦ
          </Button>
        </div>
      </div>
    </div>
  );
}
