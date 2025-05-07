export interface TAgency {
    wardId: string;
    districtId: string;
    provinceId: string;
    name: string;
    representative: string;
    taxCode: string;
    phoneNumber: string;
    email: string;
    address: string;
    currentDebt?: number;
    note?: string;
  }
  