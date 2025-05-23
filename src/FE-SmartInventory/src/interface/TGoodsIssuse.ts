import { OrderStatus } from "@/Constant";
import { TProduct } from "./TProduct";
import { GoodsStatus } from "@/Constant/GoodsStatus";

export type TGoodsIssue = {
  userId: string;
  warehouseId: string;
  agencyId: string;
  orderId: string; //id của đơn hàng liên quan
  code: string;
  totalAmount: number;
  note: string;
  status: GoodsStatus;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
  goodsIssueDetails: TGoodsIssueDetail[];
};

export type TGoodsIssueDetail = {
  productId: string;
  quantityRequested: number;
  quantityIssued: number;
  totalPrice: number;
  product: TProduct
};

export type TCreateGoodsIssue = {
  orderId: string;
  note: string;
  details: Omit<TGoodsIssueDetail, 'totalPrice' >[];
};

export type TUpdateGoodsIssueStatus = {
  status: GoodsStatus;
};
