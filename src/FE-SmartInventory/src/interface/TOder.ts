export type TOrder = {
  id: string;
  agencyId: string;
  code:string;
  totalAmount: number;
  isRefund: boolean;
  orderStatus: number;
  createdAt: string;
  modifiedOn?: string;
  deletedOn?: string;
};

export type TOrderDetail = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  createdAt: string;
  modifiedOn?: string;
  deletedOn?: string;
};

export type TCreateOrder = {
  agencyId: string;
  isRefund: boolean;
  vat?: number;
  discount?: number;
  orderDetails: {
    productId: string;
    quantity: number;
  }[];
};

export type TUpdateOrderStatus = {
  id: string; // cần để biết đang cập nhật order nào
  orderStatus: number;
};