export type TCities = {
  id: string;
  name: string;
  districts: TDistrict[] | null;
};

export type TDistrict = {
  id: string;
  name: string;
  wards: TWards[];
};

export type TWards = {
  id: string;
  name: string;
};
