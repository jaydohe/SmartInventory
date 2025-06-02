export type TMaterialSupplier = {
  code: string;
  name: string; //tên của nhà cung cấp NVL
  representative: string; //người đại diện
  taxCode: string; // mã số thuế
  phoneNumber: string;
  businessItem: string; //mặt hàng kinh doanh
  email: string;
  address: string;
  currentDebt: number; /// công nợ phải trả
  note: any;
  createdAt: string;
  modifiedOn: any;
  deletedOn: any;
  id: string;
};

export type TMaterialSupplierCreate = {
  name: string;
  representative: string;
  taxCode?: string;
  phoneNumber: string;
  businessItem: string;
  email: string;
  address: string;
  currentDebt?: number;
  note: string;
};
export type TMaterialSupplierUpdate = Omit<TMaterialSupplierCreate, 'taxCode'>;
