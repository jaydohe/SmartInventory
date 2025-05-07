export type TAgency = {
  id: string;
  code: string;
  name: string;
  representative: string;
  taxCode?: string;
  phoneNumber: string;
  email: string;
  address: string;
  currentDebt?: number;
  note?: string;
  wardId: string | null;
  ward?: {
    id: string;
    name: string;
    districtId: string;
  };
  districtId: string | null;
  district?: {
    id: string;
    name: string;
    provinceId: string;
  };
  provinceId: string | null;
  province?: {
    id: string;
    name: string;
  };  
  createdAt: string;
  modifiedOn?: string;
  deletedOn?: string;
};

export type TCreateAgency = {
  wardId: string;
  districtId: string;
  provinceId: string;
  name: string;
  representative: string;
  taxCode?: string;
  phoneNumber: string;
  email: string;
  address: string;
  currentDebt?: number;
  note?: string;
};

export type TUpdateAgency = {
  id: string; // cần để biết đang cập nhật agency nào
  wardId?: string;
  districtId?: string;
  provinceId?: string;
  name?: string;
  representative?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  currentDebt?: number;
  note?: string;
};