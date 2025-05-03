import { TDevice } from '@/interface/TDevice';
import { LatLngExpression } from 'leaflet';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import PopDetailDevice from './popDetailDevice';

export const DraggableMarker: React.FC<{
  device: TDevice;
  position: LatLngExpression;
  icon: L.Icon;
  onDragEnd: (id: string, lat: number, lng: number) => void;
  handleOpenDetailDevice: (device: TDevice) => void;
}> = ({ device, position, icon, onDragEnd, handleOpenDetailDevice }) => {
  return (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      eventHandlers={{
        dblclick: (e) => {
          console.log('marker clicked', device, e);
          handleOpenDetailDevice(device);
        },
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onDragEnd(device.id, position.lat, position.lng);
          console.log('dragend', e);
        },
      }}
    >
      <Tooltip direction="bottom" offset={[0, 10]}>
        <PopDetailDevice device={device} />
      </Tooltip>
      <Popup>
        <div className="font-medium">
          <span className="text-primary">Thiết bị {device.deviceType?.name}: </span>
          <span className="font-semibold">{device.name}</span>
        </div>
        <div className="font-medium">
          <span className="text-primary">Vị trí: </span>
          <span className="font-semibold">
            {device.latitude}, {device.longitude}
          </span>
        </div>
      </Popup>
    </Marker>
  );
};
