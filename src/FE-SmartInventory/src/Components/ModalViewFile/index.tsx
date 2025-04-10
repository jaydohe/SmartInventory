import DocViewer, { DocViewerRenderers, IDocument } from '@cyntler/react-doc-viewer';
import '@cyntler/react-doc-viewer/dist/index.css';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { memo, useEffect, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
export interface IModalViewFileProps {
  isModalOpen: boolean;
  currentFile: IDocument;
  handleCloseModal: () => void;
}

function ModalViewFile({
  isModalOpen = false,
  handleCloseModal,
  currentFile,
}: IModalViewFileProps) {
  const [viewerHeight, setViewerHeight] = useState('700px');

  useEffect(() => {
    const updateHeight = () => {
      const windowHeight = window.innerHeight;
      const modalHeight = Math.floor(windowHeight * 0.8); // 90% của chiều cao cửa sổ
      setViewerHeight(`${modalHeight}px`);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleDownload = async (url: string, filename: string) => {
    // console.log(filename);
    try {
      const response = await axios.get(url, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], {
        // type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        type: response.headers['content-type'],
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      link.style.display = 'none';
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  // console.log(currentFile.fileType);
  return (
    <Modal
      centered
      title={<h4 className="font-bold text-xl text-center px-5 ">{currentFile.fileName}</h4>}
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
      className="w-11/12  lg:w-4/5 "
    >
      {/* Don't Show width PDF File */}
      {!currentFile.fileType?.includes('pdf') && (
        <div className="flex justify-center mb-2">
          <Button
            type="primary"
            className="text-center  text-base"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(currentFile.uri, currentFile.fileName!)}
          >
            Tải xuống
          </Button>
        </div>
      )}

      <DocViewer
        style={{ height: viewerHeight }}
        pluginRenderers={DocViewerRenderers}
        documents={[currentFile]}
        className=" overflow-auto [&_#msdoc-renderer]:h-full  [&_#proxy-renderer]:h-full "
        config={{
          header: {
            disableHeader: true,
            disableFileName: false,
            retainURLParams: false,
          },
          csvDelimiter: ',', // "," as default,
          pdfZoom: {
            defaultZoom: 1, // 1 as default,
            zoomJump: 0.2, // 0.1 as default,
          },
          pdfVerticalScrollByDefault: true, // false as default
        }}
      />
    </Modal>
  );
}
export default memo(ModalViewFile);
