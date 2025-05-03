import { Avatar, List } from 'antd';
import { FileTextTwoTone, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';

import ModalViewFile from '../ModalViewFile';
// import { IDocument } from 'react-doc-viewer';
import { IDocument } from '@cyntler/react-doc-viewer';
export interface IViewListFileProps {
  arrayFile: TDocSubject[];
  isEditDocument?: boolean;
  handleDeleteSubFile?: (id: string) => void;
}
export type TDocSubject = {
  id: string;

  filePath: string;
  fileName: string;
};

export default function ViewListFile({
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

  return (
    <div>
      <List
        size="large"
        className="max-h-64 scroll-smooth overflow-auto"
        bordered
        pagination={false}
        dataSource={arrayFile}
        renderItem={(item, index) => (
          <List.Item key={item.filePath} className=" pr-0">
            <List.Item.Meta
              avatar={<FileTextTwoTone style={{ fontSize: 28 }} />}
              className="flex items-center"
              title={
                <div className="flex items-center justify-between">
                  <p
                    className="text-sm font-medium truncate cursor-pointer "
                    onClick={() => {
                      console.log(123);
                      setIsOpenFile({
                        isOpen: true,
                        currentFile: {
                          uri: item.filePath,
                          fileType: item.fileName.split('.').pop() as string,
                          fileName: item.fileName,
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
