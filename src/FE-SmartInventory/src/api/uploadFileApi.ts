import axiosClient from './AxiosClient';
import { UploadFile } from 'antd';
import { TResponse } from '@/interface';
import { TPreviewFile, TUploadFile, TUploadPrivateFile } from '@/interface/TUploadFile';

export const uploadFileApi = {
  uploadFile: async (data: any | UploadFile): Promise<TUploadFile> => {
    //get File Blobs from UploadFile of antd
    const newData = data[0].originFileObj;
    console.log('call :::', data, newData);
    var bodyFormData = new FormData();
    newData && bodyFormData.append(`File`, newData);
    const url = `/public-api/storage/upload/res`;
    console.table([...bodyFormData]);
    const res = await axiosClient.post(url, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  uploadPrivateFile: async (data: any | UploadFile): Promise<TUploadPrivateFile> => {
    //get File Blobs from UploadFile of antd
    const newData = data[0].originFileObj;
    var bodyFormData = new FormData();
    newData && bodyFormData.append(`file`, newData);
    const url = `/public-api/storage/upload/file`;
    // console.table([...bodyFormData]);
    const res = await axiosClient.post(url, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  previewFile: async (objectName: string | null): Promise<TPreviewFile> => {
    let url = `/public-api/storage/preview`;
    if (objectName) {
      url = `/public-api/storage/preview?objectName=${objectName}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
};
