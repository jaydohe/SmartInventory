import { LeafletMouseEvent } from 'leaflet';
import { useMapEvents } from 'react-leaflet';

interface MapEventHandlerProps {
  onContextMenu: (e: LeafletMouseEvent) => void;
  onMapClick: () => void;
}

export const MapEventHandler: React.FC<MapEventHandlerProps> = ({ onContextMenu, onMapClick }) => {
  const map = useMapEvents({
    contextmenu: (e) => {
      e.originalEvent.preventDefault();
      onContextMenu(e);
    },
    click: () => {
      onMapClick();
    },
  });
  return null;
};
