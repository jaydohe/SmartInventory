import logo from '@/assets/img/LocationIcon.png';
import issuesLogo from '@/assets/img/warningIcon.png';
import DrawerComponents from '@/Components/Drawer/index';
import MapSearch from '@/Components/MapSearch';
import QRScanner from '@/Components/QRScanner';
import ToolTipAnt from '@/Components/TooltipAnt';
import { MAINTENANCE, QueryKeys, TECHNICAL } from '@/Constant';
import { DEFAULT_POSITION } from '@/Constant/defaultPosition';
import { TicketStatusEnum } from '@/Constant/TicketEnumStatus';
import { useBuilderQuery } from '@/hook';
import { useLocalStorage } from '@/hook/useLocalStorage';
import { useQueryDevice } from '@/hook/useQueryDevice';
import { TPosition, useUserGeolocation } from '@/hook/useUserGeolocation';
import { TBuilderQuery } from '@/interface';
import { TCreateTicket } from '@/interface/TReportTicket';
import { authStoreSelectors } from '@/Stores/userStore';
import { genIcon } from '@/utils/genIconMap';
import { AimOutlined, EnvironmentOutlined, HomeOutlined, QrcodeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Divider } from 'antd';
import L, { LatLngExpression, Map as LeafletMap, LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { toast } from 'react-toastify';
import { useQueryReportTicket } from '../ReportTicket/Hook/useQueryReportTikcet';
import AddIssueForm from './Components/AddIssueForm';
import IssueList from './Components/IssueList';
import { MapEventHandler } from './Components/MapEventHandler';
import PopDetailDevice from './Components/popDetailDevice';
// Fix for Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: logo,
  // shadowUrl: markerIconShadow,
  iconSize: [35, 35],
});
const IssueMap: React.FC = () => {
  const { BaseLayer } = LayersControl;
  const queryClient = useQueryClient();
  const mapRef = useRef<LeafletMap | null>(null);
  const unitId = authStoreSelectors.use.unitId() ?? '';
  const role = authStoreSelectors.use.role() ?? '';
  const userId = authStoreSelectors.use.userId() ?? '';
  const [isQrModalVisible, setIsQrModalVisible] = useState(false);
  const [isAddIssueTicket, setIsAddIssueTicket] = useState(false);
  const [scannedMacAddress, setScannedMacAddress] = useState<string>('');
  const [coordinatesPopup, setCoordinatesPopup] = useState<{
    isVisible: boolean;
    position: [number, number];
  } | null>(null);

  const [detailIssueTicket, setDetailIssueTicket] = useState<boolean>(false);

  // Location states
  const [storedPosition, setStoredPosition] = useLocalStorage<TPosition>(
    'issueLocation',
    DEFAULT_POSITION
  );
  const { isLoading, position, getPosition } = useUserGeolocation(storedPosition);
  const [currentLocation, setCurrentLocation] = useState<LatLngExpression>([
    storedPosition.lat,
    storedPosition.lng,
  ]);
  const [filterDevice, setFilterDevice] = useState<TBuilderQuery>({
    toJoin: ['province.*', 'district.*', 'ward.*', 'devicetype.name'],
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

      {
        'tickets.status': {
          value: `${TicketStatusEnum.PROCESSED}`,
          queryOperator: '$neq',
          queryOperatorParent: '$and',
        },
      },
      {
        'tickets.status': {
          value: `${TicketStatusEnum.REJECTED}`,
          queryOperator: '$neq',
          queryOperatorParent: '$and',
        },
      },
      {
        'tickets.processes.userReceivedId': {
          value: role === TECHNICAL || role === MAINTENANCE ? userId : '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
      {
        'tickets.processes.state': {
          value: role === TECHNICAL || role === MAINTENANCE ? '0' : '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const { getAllDevice } = useQueryDevice(useBuilderQuery(filterDevice));
  const { data: deviceList } = getAllDevice;

  const [filterTicket, setFilterTicket] = useState<TBuilderQuery>({
    toJoin: [
      'user.name',
      'device.name',
      'device.code',
      'device.longitude',
      'device.latitude',
      // 'processes.*',
      'device.deviceType.name',
    ],
    appendQuery: [
      {
        deviceId: {
          value: '123',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },

      {
        'processes.userReceivedId': {
          value: role === TECHNICAL || role === MAINTENANCE ? userId : '',
          queryOperator: '$eq',
          queryOperatorParent: '$and',
        },
      },

      {
        status: {
          value: `${TicketStatusEnum.PROCESSED}`,
          queryOperator: '$neq',
          queryOperatorParent: '$and',
        },
      },
      {
        status: {
          value: `${TicketStatusEnum.REJECTED}`,
          queryOperator: '$neq',
          queryOperatorParent: '$and',
        },
      },
    ],
  });

  const { getAllTicket, createTicket } = useQueryReportTicket(useBuilderQuery(filterTicket));
  const { data: TicketList } = getAllTicket;
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
  // // Handle device selection from search
  const handleDeviceSelect = (deviceId: string) => {
    const selectedDevice = deviceList?.data.find((device) => device.id === deviceId);
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
    setIsAddIssueTicket(true);
  };
  const handleCloseDrawer = () => {
    setIsQrModalVisible(false);
    setIsAddIssueTicket(false);
    setScannedMacAddress('');
  };

  // Handle form submission for adding new device
  const handleAddIssue = async (newIssue: TCreateTicket) => {
    createTicket.mutate(newIssue, {
      onSuccess: (data) => {
        console.log(123, data);
        queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
        handleCloseDrawer();
      },
    });
  };

  const handleOpenDetailIssue = (deviceId: string) => {
    setDetailIssueTicket(true);
    setFilterTicket((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('deviceId' in item) {
          return {
            deviceId: {
              ...item.deviceId,
              value: deviceId,
            },
          };
        }

        return item; // Giữ nguyên các item khác
      });

      return {
        ...pre,

        appendQuery: newAppendQuery,
      };
    });
  };
  const handleCloseDetailIssue = () => {
    setDetailIssueTicket(false);
    setFilterTicket((pre) => {
      const newAppendQuery = pre.appendQuery?.map((item) => {
        if ('deviceId' in item) {
          return {
            deviceId: {
              ...item.deviceId,
              value: '123', // đưa về giá trị ngoài để query trả về []
            },
          };
        }

        return item; // Giữ nguyên các item khác
      });

      return {
        ...pre,

        appendQuery: newAppendQuery,
      };
    });
  };
  return (
    <div className="relative">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-[999] min-w-72 md:min-w-96">
        <MapSearch
          devices={deviceList?.data || []}
          onSelect={(deviceId, option) => {
            handleDeviceSelect(deviceId);
          }}
          placeholder={'Nhập tên, MAC thiết bị lỗi '}
        />
      </div>
      {/* Control Buttons */}
      <div className="absolute bg-textWhite top-4 right-3 z-[999] flex flex-col border-[1px] rounded-t-md rounded-b-md border-[#cfcfcf] bg-white">
        <ToolTipAnt text="QR báo cáo sự cố">
          <Button
            type="link"
            icon={<QrcodeOutlined />}
            onClick={() => {
              setIsQrModalVisible(true);
            }}
            className="rounded-none rounded-t-md"
          />
        </ToolTipAnt>
        <Divider className="my-0" />
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
        {deviceList &&
          deviceList.data.map((device) => (
            <Marker
              key={device.id}
              position={[device.latitude, device.longitude]}
              icon={genIcon(issuesLogo)}
              eventHandlers={{
                click: () => {
                  console.log('marker clicked', device, device.deviceId);

                  handleOpenDetailIssue(device.id);
                },
              }}
            >
              <Tooltip direction="bottom" offset={[0, 10]}>
                <PopDetailDevice device={device}></PopDetailDevice>
              </Tooltip>
              <Popup>
                <div className="font-medium ">
                  <span className="text-primary ">Thiết bị {device.deviceType?.name}: </span>
                  <span className="font-semibold">{device.name}</span>
                </div>
                <div className="font-medium ">
                  <span className="text-primary ">toạ độ: </span>
                  <span className="font-semibold">
                    {device.latitude}, {device.longitude}
                  </span>
                </div>
              </Popup>
            </Marker>
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

              <Button
                icon={<HomeOutlined className="" />}
                type="link"
                className=" justify-start  p-0 text-base"
                onClick={handleSetDefaultWindow}
              >
                Đặt cửa sổ mặc định
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

          <BaseLayer name="Bản đồ vệ tinh">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
          </BaseLayer>
        </LayersControl>
      </MapContainer>
      <QRScanner
        title="Báo cáo sự cố"
        isVisible={isQrModalVisible}
        onClose={() => setIsQrModalVisible(false)}
        onScanSuccess={handleQRScanSuccess}
      />
      {scannedMacAddress && (
        <DrawerComponents
          title={`Báo cáo sự cố`}
          openDrawer={isAddIssueTicket}
          handleCloseDrawer={() => {
            handleCloseDrawer();
          }}
          maskClosable={false}
          children={
            <AddIssueForm
              isVisible={isAddIssueTicket}
              handleAddIssue={handleAddIssue}
              initialMacAddress={scannedMacAddress}
            />
          }
          width={window.innerWidth >= 1024 ? '50%' : '100%'}
        />
      )}

      {TicketList && (
        <DrawerComponents
          paddingTop={true}
          title={`Danh sách sự cố thiết bị ${
            TicketList.data.length > 0
              ? `${TicketList.data[0].device.deviceType?.name} ${TicketList.data[0].device.name} (${TicketList.data[0].device.code}) `
              : ''
          }`}
          openDrawer={detailIssueTicket}
          handleCloseDrawer={() => {
            handleCloseDetailIssue();
          }}
          maskClosable={false}
          children={<IssueList ticketList={TicketList}></IssueList>}
          width={window.innerWidth >= 1024 ? '50%' : '100%'}
        />
      )}
    </div>
  );
};

export default IssueMap;
