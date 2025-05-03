import { blue, cyan, green, orange, presetPalettes, red } from '@ant-design/colors';
import type { ColorPickerProps } from 'antd';
type Presets = Required<ColorPickerProps>['presets'][number];

const generatePresets = (colors: typeof presetPalettes) =>
  Object.entries(colors).map<Presets>(([label, values]) => ({
    label,
    colors: values,
  }));

export const presets = generatePresets({ red, cyan, green, blue, orange });
