import { FC, useState, useRef, useEffect } from 'react';
import { Modal, Button, Space } from 'antd';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { CameraOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

interface QRScannerProps {
  isVisible: boolean;
  onClose: () => void;
  onScanSuccess: (macAddress: string) => void;
  title: string;
}

const QRScanner: FC<QRScannerProps> = ({ isVisible, onClose, onScanSuccess, title }) => {
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const scannerRef = useRef<HTMLDivElement>(null);

  const cleanupScanner = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    // Clean up any remaining elements
    const qrReader = document.getElementById('qr-reader');
    if (qrReader) {
      qrReader.innerHTML = '';
    }
    setIsScanning(true);
  };

  const initializeScanner = () => {
    if (!scannerRef.current) return;

    // Ensure clean state before initialization
    cleanupScanner();

    try {
      const scannerId = `qr-scanner-${Date.now()}`; // Generate unique ID
      scannerRef.current.id = scannerId;

      const qrScanner = new Html5QrcodeScanner(
        scannerId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
        },
        false
      );

      qrScanner.render(
        (decodedText) => {
          onScanSuccess(decodedText);
          setIsScanning(false);
          cleanupScanner();
          onClose();
        },
        (error) => {
          console.warn(`QR Code scanning error: ${error}`);
        }
      );

      setScanner(qrScanner);

      // Apply custom styles after render
      setTimeout(() => {
        const scanRegion = document.getElementById('qr-reader__scan_region');
        const dashboard = document.getElementById('qr-reader__dashboard');
        const status = document.getElementById('qr-reader__status');

        if (scanRegion) {
          scanRegion.className = 'bg-[#ccccc] min-h-[300px] relative';
        }
        if (dashboard) {
          dashboard.className = 'bg-textWhite p-2';
        }
        if (status) {
          status.className = 'text-[#cccc] text-sm';
        }

        // Remove Info icon
        const infoIcon = document.querySelector('img[alt="Info icon"]');
        if (infoIcon) {
          infoIcon.remove();
        }

        // Adjust Camera based scan icon
        const cameraIcon = document.querySelector('img[alt="Camera based scan"]') as HTMLElement;
        const cameraIcon1 = document.querySelector('img[alt="Fule based scan"]') as HTMLElement;

        if (cameraIcon) {
          cameraIcon.style.opacity = '1'; // Increase opacity
          cameraIcon.style.width = '80px'; // Make icon bigger
          cameraIcon.style.display = 'block';
          cameraIcon.style.margin = '0 auto'; // Center the icon
        }

        // Style the native select element
        const selects = document.querySelectorAll('#qr-reader__dashboard select');
        selects.forEach((select) => {
          select.className =
            'mt-2 block w-full rounded-md border-[#cccc] shadow-sm focus:border-primary focus:ring-primary sm:text-sm';
        });

        // Style the native button element
        const buttons = document.querySelectorAll('#qr-reader__dashboard button');
        buttons.forEach((button) => {
          button.className =
            'mt-2 inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';
        });
      }, 100);
    } catch (error) {
      console.error('Error initializing QR scanner:', error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      const timeoutId = setTimeout(initializeScanner, 100);
      return () => {
        clearTimeout(timeoutId);
        cleanupScanner();
      };
    }
    return () => cleanupScanner();
  }, [isVisible]);

  const handleRetry = () => {
    cleanupScanner();
    const timeoutId = setTimeout(initializeScanner, 100);
    return () => clearTimeout(timeoutId);
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-1 font-bold">
          <CameraOutlined className="text-primary text-3xl" size={35} />
          <span className=" text-xl uppercase">{title}</span>
        </div>
      }
      open={isVisible}
      onCancel={() => {
        cleanupScanner();
        onClose();
      }}
      footer={null}
      destroyOnClose
      centered
      // width={400}
      maskClosable={false}
      className="rounded-lg overflow-hidden"
    >
      <div className="mt-4 text-center">
        <p className="text-lg text-primary font-semibold mb-2">
          Đặt mã QR vào khung để quét mã của thiết bị
        </p>
      </div>
      <div className="qr-scanner-container">
        <div
          ref={scannerRef}
          className="w-full rounded-lg overflow-hidden shadow-md relative "
        ></div>
      </div>
    </Modal>
  );
};

export default QRScanner;
