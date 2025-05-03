import { Avatar, List } from 'antd';
import { FileTextTwoTone, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import ModalViewFile from '../ModalViewFile';
// import { IDocument } from 'react-doc-viewer';
import { IDocument } from '@cyntler/react-doc-viewer';
import { useUploadFile } from '@/hook';
import { TUploadFile } from '@/interface/TUploadFile';

export type TDocSubject = {
  id: string;
  url: string;
  fileName: string;
};
export interface IViewListFileProps {
  arrayFile: TDocSubject[];
  isEditDocument?: boolean;
  handleDeleteSubFile?: (id: string) => void;
}

export default function ViewListPrivateFile({
  arrayFile,
  isEditDocument = false,
  handleDeleteSubFile,
}: IViewListFileProps) {
  const [isOpenFile, setIsOpenFile] = useState<{
    isOpen: boolean;
    currentFile?: IDocument;
  }>();

  const handleCloseModal = () => {
    setIsOpenFile({
      isOpen: false,
    });
  };

  const { previewFile } = useUploadFile();

  return (
    <div>
      <List
        size="large"
        className="max-h-64 scroll-smooth overflow-auto"
        bordered
        pagination={false}
        dataSource={arrayFile}
        renderItem={(item, index) => (
          <List.Item key={item.url} className=" pr-0">
            <List.Item.Meta
              avatar={<FileTextTwoTone style={{ fontSize: 28 }} />}
              className="flex items-center"
              title={
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-medium truncate cursor-pointer "
                    onClick={() => {
                      previewFile.mutate(item.fileName, {
                        onSuccess: (data) => {
                          setIsOpenFile({
                            isOpen: true,
                            currentFile: {
                              uri: data?.url,
                              fileType: item.fileName.split('.').pop() as string,
                              fileName: item.fileName,
                            },
                          });
                        },
                      });
                    }}
                  >
                    {item.fileName}
                  </p>
                  {isEditDocument && (
                    <p
                      className="text-[#9a9a9a] cursor-pointer hover:bg-[#97979721] px-[5px] mr-2 rounded"
                      onClick={() => handleDeleteSubFile && handleDeleteSubFile(item.id)}
                    >
                      <DeleteOutlined />
                    </p>
                  )}
                </div>
              }
            />
          </List.Item>
        )}
      />
      {isOpenFile?.isOpen && isOpenFile?.currentFile && (
        <ModalViewFile
          isModalOpen={isOpenFile.isOpen}
          handleCloseModal={handleCloseModal}
          currentFile={isOpenFile.currentFile}
          key={isOpenFile.currentFile?.uri}
        ></ModalViewFile>
      )}
    </div>
  );
}
