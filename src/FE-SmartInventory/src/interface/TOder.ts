import { OrderStatus } from '@/Constant/OderStatus';
import { TProduct } from './TProduct';

export type TOrder = {
  warehouseId: string; // id của kho,
  agencyId: string; // id của đại lý,
  code: string; //mã số của đơn hàng
  userId: string; // id của người tạo đơn hàng,
  vat: number; // thuế giá trị gia tăng (%),
  discount: number; // phần trăm giảm giá,
  totalAmount: number; // Tổng hóa đơn đã bao gồm VAT và giảm giá,
  isRefund: boolean; // có phải thu hồi hàng từ đại lý không,
  orderStatus: OrderStatus; // enum
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
  orderDetails: TOrderDetail[];
};

export type TOrderDetail = {
  orderId: string; //id của đơn hàng
  productId: string; //id của hàng hóa
  quantity: number; //số lượng
  unitPrice: number; //giá tiền của mỗi hàng hóa
  createdAt: string;
  product: TProduct;
};

export type TCreateOrder = {
  warehouseId: string; //id của kho
  agencyId: string; //id của đại lý
  isRefund: boolean; //có phải thu hồi hàng từ đại lý không
  vat?: number; //thuế giá trị gia tăng
  discount?: number; //phần trăm giảm giá
  orderDetails: {
    productId: string; //id của hàng hóa
    quantity: number; //số lượng
  }[];
};

export type TUpdateOrderStatus = {
  orderStatus: OrderStatus;
};
