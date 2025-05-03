import React, { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
import debounce from 'lodash.debounce';
import { TDevice } from '@/interface/TDevice';

interface SearchResult {
  value: string; // Will store the device ID
  label: string; // Will store the display name
  latitude: number;
  longitude: number;
}

interface MapSearchProps {
  devices: TDevice[]; // Replace 'any' with your device type
  onSelect: (value: string, option: SearchResult) => void;
  placeholder: string;
}

const MapSearch: React.FC<MapSearchProps> = ({ devices, onSelect, placeholder }) => {
  const [searchOptions, setSearchOptions] = useState<SearchResult[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (devices) {
      const initialOptions = devices.map((device) => ({
        value: `${device.name} (${device.deviceType?.name})`,
        key: device.id,
        label: `${device.name} (${device.deviceType?.name})`,
        latitude: device.latitude,
        longitude: device.longitude,
      }));
      setSearchOptions(initialOptions);
    }
  }, [devices]);

  const handleSearch = debounce((searchText: string) => {
    if (!devices) return;

    const filteredDevices = devices.filter(
      (device) =>
        device.name.toLowerCase().includes(searchText.toLowerCase()) ||
        device.code.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchOptions(
      filteredDevices.map((device) => ({
        value: device.name,
        key: device.id,
        label: `${device.name} (${device.deviceType?.name})`,
        latitude: device.latitude,
        longitude: device.longitude,
      }))
    );
  }, 300);

  const handleSelect = (value: string, option: any) => {
    // console.log(value, option);
    setSearchText(option.label);
    onSelect(option.key, option);
  };

  return (
    <AutoComplete
      value={searchText}
      options={searchOptions}
      onSearch={(text) => {
        setSearchText(text);
        handleSearch(text);
      }}
      virtual={false}
      onSelect={handleSelect}
      placeholder={placeholder}
      className="w-full"
      allowClear
      onClear={() => setSearchText('')}
      notFoundContent="Không tìm thấy thiết bị"
    />
  );
};

export default MapSearch;
