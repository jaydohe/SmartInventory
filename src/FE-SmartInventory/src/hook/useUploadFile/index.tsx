import { QueryKeys } from '@/Constant';
import { uploadFileApi } from '@/api/uploadFileApi';
import { TPage } from '@/interface';
import { TUploadPrivateFile } from '@/interface/TUploadFile';
import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  const uploadFile = useMutation({
    mutationFn: uploadFileApi.uploadFile,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: [QueryKeys.UPLOAD_FILE] });
      // toast.success(data.message);
    },
  });

  const uploadPrivateFile = useMutation({
    mutationFn: uploadFileApi.uploadPrivateFile,
    onSuccess: (data) => {},
  });



  const previewFile = useMutation({
    mutationFn: (objectName: string) => uploadFileApi.previewFile(objectName),
    onSuccess: (data) => {},
  });


  return { uploadFile, uploadPrivateFile, previewFile };
};
