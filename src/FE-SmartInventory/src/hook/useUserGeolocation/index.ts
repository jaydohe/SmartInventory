import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type TPosition = {
  lat: number;
  lng: number;
};

export function useUserGeolocation(defaultPosition: TPosition | null = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      const msg = 'Trình duyệt không hỗ trợ định vị';
      toast.error(msg);
      return;
    }

    setIsLoading(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        setIsLoading(false);
        let errorMessage = 'Không thể lấy vị trí';

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Quyền truy cập vị trí bị từ chối. Cần cho phép để mở lại quyền truy cập';
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Không thể xác định vị trí. Vui lòng kiểm tra GPS/Location Service';
            break;
          case err.TIMEOUT:
            errorMessage = 'Hết thời gian yêu cầu vị trí. Vui lòng thử lại';
            break;
        }

        setError(errorMessage);
        toast.error(errorMessage);
      },
      options
    );
  }

  return { isLoading, position, error, getPosition };
}
