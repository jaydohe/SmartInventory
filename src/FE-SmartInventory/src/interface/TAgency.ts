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
    wardId: string;
    districtId: string;
    provinceId: string;
    createdAt: string;
    modifiedOn?: string;
    deletedOn?: string;
  
    // Optional: Nếu bạn cần map thêm dữ liệu ward, district, province
    wardName?: string;
    districtName?: string;
    provinceName?: string;
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
  
  