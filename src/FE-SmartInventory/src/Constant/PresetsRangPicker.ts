import { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';

export const rangePresets: TimeRangePickerProps['presets'] = [
  {
    label: `Hôm nay`,
    value: [dayjs().add(0, 'd'), dayjs()],
  },
  { label: '7 ngày trước', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '14 ngày trước', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '30 ngày trước', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '90 ngày trước', value: [dayjs().add(-90, 'd'), dayjs()] },
];
