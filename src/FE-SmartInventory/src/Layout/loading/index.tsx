import { Spin } from 'antd';
import { useState } from 'react';
import './loading.scss';
import loadingImg from '@/assets/img/Loading-Loader.svg';

export default function Loading() {
  return (
    <div className="h-full flex items-center justify-center fixed overscroll-y-none  bg-[rgba(17,17,17,0.78)] z-[100000000] inset-0   ">
      {/* <Spin
        size="large"
        className="loading  w-full opacity-100 my-auto  "
        tip="Loading..."
        // fullscreen
      ></Spin> */}
      <img
        className="w-20 h-20  lg:w-30 lg:h-30 animate-spin"
        src={loadingImg}
        alt="Loading icon"
      ></img>
    </div>
  );
}
