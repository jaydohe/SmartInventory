import { OrderStatus } from '@/Constant';
import { TProduct } from './TProduct';
import { GoodsStatus } from '@/Constant/GoodsStatus';

export type TGoodsReceipt = {
  goodsReceiptDetail: TGoodsReceiptDetail[];
  productionCommandId: string;
  orderId: string; //id của đơn hàng liên quan
  userId: string;
  warehouseId: string;
  code: string;
  shipperName: string;
  totalAmount: number;
  note: string;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
  status: GoodsStatus;
  materialSupplierId: string;
};

export type TGoodsReceiptDetail = {
  productId: string; // id của hàng hóa
  quantityOrdered: number; // số lượng đã đặt hàng
  totalPrice: number; // giá trị đơn hàng
  quantityReceived: number; // số lượng nhận được
  product: TProduct; // thông tin hàng hóa
};
//Thêm phiếu nhập hàng từ nhà cung cấp NVL
export type TGoodsReceiptCreateMaterial = {
  materialSupplierId: string; // id của nhà cung cấp NVL
  shipperName: string; // tên của shipper đã giao hàng tới
  note: string; // ghi chú
  details: Pick<TGoodsReceiptDetail, 'productId' | 'quantityOrdered' | 'quantityReceived'>[];
};

//Thêm phiếu nhập hàng từ đơn hàng
export type TGoodsReceiptCreateOrder = {
  orderId: string; // id của đơn hàng liên quan
  shipperName: string; // tên của shipper đã giao hàng tới
  details: Pick<TGoodsReceiptDetail, 'quantityReceived' | 'productId' |'quantityOrdered'>[];
};
//Thêm phiếu nhập hàng từ lệnh sản xuất
export type TGoodsReceiptCreateProductionCommand = {
  productionCommandId: string; // id của lệnh sản xuất liên quan
  shipperName: string; // tên của shipper đã giao hàng tới
  details: Pick<TGoodsReceiptDetail, 'quantityReceived' | 'productId' |'quantityOrdered'>[];
};


//Cập nhật phiếu nhập hàng
export type TGoodsReceiptUpdate = {
  status: GoodsStatus;
  note: string;
};

