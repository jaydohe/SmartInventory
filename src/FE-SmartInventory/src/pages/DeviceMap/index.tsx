import logo from '@/assets/img/LocationIcon.png';
import DrawerComponents from '@/Components/Drawer/index';
import MapSearch from '@/Components/MapSearch';
import { DEFAULT_POSITION } from '@/Constant/defaultPosition';
import { useBuilderQuery } from '@/hook';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { useQueryDevice } from '@/hook/useQueryDevice';
import { TPosition, useUserGeolocation } from '@/hook/useUserGeolocation';
import { TBuilderQuery } from '@/interface';
import { TCreateDevice, TDevice, TUpdateDevice } from '@/interface/TDevice';
import { authStoreSelectors } from '@/Stores/userStore';
import { genIcon } from '@/utils/genIconMap';
import {
  AimOutlined,
  AppstoreAddOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  QrcodeOutlined
} from '@ant-design/icons';
import { Button, Divider } from 'antd';
import L, { LatLngExpression, Map as LeafletMap, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer
} from 'react-leaflet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DraggableMarker } from './Components/DraggableMarker';
import { MapEventHandler } from './Components/MapEventHandler';

import QRScanner from '@/Components/QRScanner';
import ToolTipAnt from '@/Components/TooltipAnt';
import DetailDevice from '../DeviecPage/Components/DetailDevice';
import AddDeviceForm from './Components/AddDeviceForm';
import EditDeviceLocationForm from './Components/EditDeviceLocationForm';
// Fix for Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: logo,
  // shadowUrl: markerIconShadow,
  iconSize: [35, 35],
});
const DeviceMap: React.FC = () => {
  const { BaseLayer } = LayersControl;
  const mapRef = useRef<LeafletMap | null>(null);
  const unitId = authStoreSelectors.use.unitId() ?? '';
  const [isQrModalVisible, setIsQrModalVisible] = useState<boolean>(false);
  const [addDeviceInMap, setAddDeviceInMap] = useState<boolean>(false);
  const [isAddDeviceModalVisible, setIsAddDeviceModalVisible] = useState<boolean>(false);
  const [scannedMacAddress, setScannedMacAddress] = useState<string>('');
  const [isEditLocationDrawerVisible, setIsEditLocationDrawerVisible] = useState<boolean>(false);
  const [isOpenDevice, setIsOpenDevice] = useState<{
    isOpen: boolean;
    detailDevice?: TDevice;
  }>({
    isOpen: false,
  });

  const [coordinatesPopup, setCoordinatesPopup] = useState<{
    isVisible: boolean;
    position: [number, number];
  } | null>(null);

  const [selectedDevice, setSelectedDevice] = useState<TDevice | null>(null);
  const [newLocation, setNewLocation] = useState<{ lat: number; lng: number } | null>(null);
  // Location states
  const [storedPosition, setStoredPosition] = useLocalStorage<TPosition>(
    'userLocation',
    DEFAULT_POSITION
  );
  const { isLoading, position, getPosition } = useUserGeolocation(storedPosition);
  const [currentLocation, setCurrentLocation] = useState<LatLngExpression>([
    storedPosition.lat,
    storedPosition.lng,
  ]);

  const [filterDevice, setFilterDevice] = useState<TBuilderQuery>({
    toJoin: ['province.*', 'district.*', 'ward.*', 'devicetype.*'],
    appendQuery: [
      // {
      //   search: { value: '', queryOperator: '$fli' },
      // },
      {
        unitId: {
          value: unitId,
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const { getAllDevice, createDevice, updateDevice } = useQueryDevice(
    useBuilderQuery(filterDevice)
  );
  const { data: devices } = getAllDevice;
  // Context menu state with selectedCoordinates
  const [contextMenuData, setContextMenuData] = useState<
    | {
        isVisible: boolean;
        position: [number, number];
      }
    | undefined
  >(undefined);

  // Initial load effect - runs once when component mounts
  useEffect(() => {
    const initializeLocation = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        if (result.state === 'granted' || result.state === 'prompt') {
          getPosition();
        }
      } catch (error) {
        console.error('Error getting location permission:', error);
      }
    };

    initializeLocation();
  }, []);

  // Update current location when position changes
  useEffect(() => {
    if (position) {
      setCurrentLocation([position.lat, position.lng]);
      setStoredPosition(position);

      // Center map on initial load
      if (mapRef.current) {
        mapRef.current.flyTo([position.lat, position.lng], 18);
        mapRef.current.openPopup(`Vị trí của tôi: ${position.lat}, ${position.lng}`, [
          position.lat,
          position.lng,
        ]);
      }
    }
  }, [position]);

  // Event Handlers
  const handleContextMenu = (e: LeafletMouseEvent) => {
    e.originalEvent.preventDefault();
    // console.log('handleContextMenu', [e.latlng.lat, e.latlng.lng]);
    setContextMenuData({
      isVisible: true,
      position: [e.latlng.lat, e.latlng.lng],
    });
  };

  const handleMapClick = () => {
    setContextMenuData(undefined);
  };

  const handleShowCoordinates = () => {
    if (contextMenuData) {
      const { position } = contextMenuData;
      // Thay vì dùng mapRef.current.openPopup, tạo một state mới để control popup coordinates
      setCoordinatesPopup({
        isVisible: true,
        position: position,
      });
    }
  };

  const handleSetDefaultWindow = () => {
    if (contextMenuData && mapRef.current) {
      mapRef.current.setView(contextMenuData.position, mapRef.current.getZoom());
      toast.success('Đặt cửa sổ mặc định thành công');
      setContextMenuData(undefined); // Close context menu after setting
    }
  };

  const handleLocationButtonClick = () => {
    getPosition();
    if (position && mapRef.current) {
      mapRef.current.flyTo([position.lat, position.lng], 18);
    }
  };
  // Handle device selection from search
  const handleDeviceSelect = (deviceId: string) => {
    const selectedDevice = devices?.data.find((device) => device.id === deviceId);
    if (selectedDevice && mapRef.current) {
      console.log(mapRef.current);

      mapRef.current.setView([selectedDevice.latitude, selectedDevice.longitude], 18);
      mapRef.current.openPopup(
        `Thiết bị: ${selectedDevice.name} -
       Vị trí: ${selectedDevice.latitude}, ${selectedDevice.longitude}`,
        [selectedDevice.latitude, selectedDevice.longitude]
      );
    }
  };

  // Handle QR code scan success
  const handleQRScanSuccess = (macAddress: string) => {
    setScannedMacAddress(macAddress);
    setIsAddDeviceModalVisible(true);
  };
  const handleCloseDrawer = () => {
    setIsQrModalVisible(false);
    setIsAddDeviceModalVisible(false);
    setScannedMacAddress('');
  };

  // Handle form submission for adding new device
  const handleAddDevice = async (newDevice: TCreateDevice) => {
    createDevice.mutate(newDevice, {
      onSuccess: (data) => {
        handleCloseDrawer();
      },
    });
  };
  const handleUpdateDevice = async (data: TUpdateDevice) => {
    updateDevice.mutate(data, {
      onSuccess: (data) => {
        // handleCloseDrawer();
        setIsEditLocationDrawerVisible(false);
      },
    });
  };

  const handleDeviceDragEnd = (deviceId: string, lat: number, lng: number) => {
    const device = devices?.data.find((d) => d.id === deviceId);
    if (device) {
      setSelectedDevice(device);
      setNewLocation({ lat, lng });
      setIsEditLocationDrawerVisible(true);
    }
  };

  const handleOpenDetailDevice = (device: TDevice) => {
    setIsOpenDevice({ isOpen: true, detailDevice: device });
  };
  const handleClose = () => {
    setIsOpenDevice({ isOpen: false });
  };

  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-[999] min-w-72 md:min-w-96">
        <MapSearch
          devices={devices?.data || []}
          onSelect={(deviceId, option) => {
            handleDeviceSelect(deviceId);
          }}
          placeholder={'Nhập tên, MAC để tìm thiết bị '}
        />
      </div>
      {/* Control Buttons */}
      <div className="absolute bg-textWhite top-4 right-3 z-[999] flex flex-col border-[1px] rounded-t-md rounded-b-md border-[#cfcfcf] bg-white">
        <ToolTipAnt text="QR Thêm thiết bị">
          <Button
            type="link"
            icon={<QrcodeOutlined />}
            onClick={() => {
              handleLocationButtonClick(), setIsQrModalVisible(true), setAddDeviceInMap(false);
            }}
            className="rounded-none rounded-t-md"
          />
        </ToolTipAnt>
        <Divider className="my-0" />
        {/* <Button
          type="link"
          icon={<GlobalOutlined />}
          onClick={() => message.info('Chọn lớp bản đồ')}
          className="rounded-none"
        />
        <Divider className="my-0" /> */}
        <Button
          type="link"
          icon={<AimOutlined />}
          onClick={handleLocationButtonClick}
          loading={isLoading}
          className="rounded-none rounded-b-md"
        />
      </div>

      {/* Map Container */}
      <MapContainer
        center={currentLocation}
        zoom={18}
        className="w-full h-[calc(100vh-64px)]"
        zoomControl={false}
        attributionControl={false}
        ref={mapRef}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Map Event Handlers */}
        <MapEventHandler onContextMenu={handleContextMenu} onMapClick={handleMapClick} />

        {/* Current Location Marker */}
        <Marker position={currentLocation} icon={DefaultIcon}>
          <Popup>
            {position ? (
              <>
                Vị trí của tôi: <br />
                {position.lat}, {position.lng}
              </>
            ) : (
              'Vị trí mặc định'
            )}
          </Popup>
        </Marker>

        {/* Device Markers */}
        {devices &&
          devices.data.map((device) => (
            <DraggableMarker
              key={device.code}
              device={device}
              position={[device.latitude, device.longitude]}
              icon={genIcon(device.iconPath)}
              onDragEnd={handleDeviceDragEnd}
              handleOpenDetailDevice={handleOpenDetailDevice}
            />
          ))}
        {/* Context Menu Popup */}
        {contextMenuData && contextMenuData.isVisible && (
          <Popup
            position={contextMenuData.position}
            eventHandlers={{
              remove: () => setContextMenuData(undefined),
              popupclose: () => setContextMenuData(undefined),
            }}
          >
            <div className="flex flex-col">
              <Button
                type="link"
                className=" justify-start  p-0 text-base"
                icon={<EnvironmentOutlined className="" />}
                onClick={handleShowCoordinates}
              >
                Xem toạ độ
              </Button>
              {/* <Divider className="my-0" /> */}
              <Button
                icon={<HomeOutlined className="" />}
                type="link"
                className=" justify-start  p-0 text-base"
                onClick={handleSetDefaultWindow}
              >
                Đặt cửa sổ mặc định
              </Button>
              <Divider className="my-0 mt-1" />
              <Button
                icon={<AppstoreAddOutlined className="font-medium" />}
                type="link"
                className=" justify-start  p-0 text-base"
                onClick={() => {
                  setIsQrModalVisible(true);
                  setAddDeviceInMap(true);
                }}
              >
                Thêm thiết bị
              </Button>
            </div>
          </Popup>
        )}
        {coordinatesPopup && coordinatesPopup.isVisible && (
          <Popup
            className="w-fit"
            position={coordinatesPopup.position}
            eventHandlers={{
              remove: () => setCoordinatesPopup(null),
              popupclose: () => setCoordinatesPopup(null),
            }}
          >
            {`${coordinatesPopup.position[0]}, ${coordinatesPopup.position[1]}`}
          </Popup>
        )}
        {/* Layer Controls */}
        <LayersControl position="bottomleft">
          <BaseLayer checked name="Bản đồ đường">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          <BaseLayer name="Bản đồ sáng">
            <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
          </BaseLayer>
          <BaseLayer name="Bản đồ vệ tinh">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
          </BaseLayer>
        </LayersControl>
      </MapContainer>

      <QRScanner
        title="Quét QR thêm thiết bị"
        isVisible={isQrModalVisible}
        onClose={() => setIsQrModalVisible(false)}
        onScanSuccess={handleQRScanSuccess}
      />

      <DrawerComponents
        title="Cập nhật vị trí thiết bị"
        openDrawer={isEditLocationDrawerVisible}
        handleCloseDrawer={() => setIsEditLocationDrawerVisible(false)}
        maskClosable={false}
        width={window.innerWidth >= 1024 ? '50%' : '100%'}
      >
        {selectedDevice && newLocation && (
          <EditDeviceLocationForm
            device={selectedDevice}
            newLocation={newLocation}
            handleUpdateDevice={handleUpdateDevice}
          />
        )}
      </DrawerComponents>
      {scannedMacAddress && (
        <DrawerComponents
          title={`Thêm thiết bị`}
          openDrawer={isAddDeviceModalVisible}
          handleCloseDrawer={() => {
            handleCloseDrawer();
          }}
          maskClosable={false}
          children={
            <AddDeviceForm
              isVisible={isAddDeviceModalVisible}
              handleAddDevice={handleAddDevice}
              position={
                addDeviceInMap && contextMenuData?.position
                  ? {
                      lat: contextMenuData?.position[0],
                      lng: contextMenuData?.position[1],
                    }
                  : position
              }
              initialMacAddress={scannedMacAddress}
            />
          }
          width={window.innerWidth >= 1024 ? '50%' : '100%'}
        />
      )}

      <DrawerComponents
        // paddingTop={true}
        title={` Chi tiết thiết bị`}
        openDrawer={isOpenDevice.isOpen}
        handleCloseDrawer={() => {
          handleClose();
        }}
        // maskClosable={false}
        children={
          <>
            {isOpenDevice.detailDevice && (
              <DetailDevice
                key={isOpenDevice.detailDevice.code}
                detailDevice={isOpenDevice.detailDevice}
              ></DetailDevice>
            )}
          </>
        }
        width={window.innerWidth >= 1024 ? '70%' : '100%'}
      />
    </div>
  );
};

export default DeviceMap;
