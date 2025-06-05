import { ProductCommandProcessStatus, ProductCommandStatus } from '@/Constant/ProductCommandStatus';
import { TProduct } from './TProduct';

export type TProductionCommand = {
  orderId: any;
  userId: string;
  code: string;
  totalAmount: number;
  description: any;
  status: ProductCommandProcessStatus;
  plannedStart: string;
  plannedEnd: string;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
  details: TProductionCommandDetail[];
  processes: TProductionCommandProcess[];
};

export type TProductionCommandDetail = {
  productId: string;
  quantity: number;
  price: number;
  totalPrice: number;
  product: TProduct;
};

export type TProductionCommandProcess = {
  percentage: number;
  note: any;
  status: ProductCommandStatus;
  actualStart: any;
  actualEnd: any;
};
export type TProductionCommandProcessUpdate = {
  status: ProductCommandStatus;
};

export type TProductionCommandCreate = {
  plannedStart: string;
  plannedEnd: string;
  productionCommandDetails: Pick<TProductionCommandDetail, 'productId' | 'quantity'>[];
};

export type TProductionCommandUpdate = {
  percentage: number;
  note: string;
  status: ProductCommandProcessStatus;
  actualStart: string;
  actualEnd: string;
};

export type TProductionCommandRequest = {
  orderId: string;
  wareHouseId: string;
};
