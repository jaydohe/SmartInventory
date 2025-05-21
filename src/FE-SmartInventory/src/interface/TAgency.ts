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

  createdAt: string;
  modifiedOn?: string;
  deletedOn?: string;
};

export type TCreateAgency = {
  name: string;
  representative: string;
  taxCode?: string;
  phoneNumber: string;
  email: string;
  address: string;
  currentDebt?: number; // công nợ phải thu, >= 0
  note?: string;
};
