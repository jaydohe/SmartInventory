    export interface OrderDetail {
    productId: string;
    quantity: number;
    unitPrice: number;
    orderId: string;
    createdAt: string;
    modifiedOn?: string;
    deletedOn?: string;
    product?: Product;
  }
  
  export interface Product {
    productId: string;
    name: string;
    description?: string;
    // Thêm các field khác nếu có
  }
  
  export interface Agency {
    agencyId: string;
    name: string;
    // Thêm các field khác nếu có
  }
  
  export interface Order {
    orderId: string;
    agencyId: string;
    code: string;
    totalAmount: number;
    isRefund: boolean;
    orderStatus: OrderStatus;
    createdAt: string;
  }