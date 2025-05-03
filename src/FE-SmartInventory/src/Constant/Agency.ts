export interface TAgency {
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
  }
  