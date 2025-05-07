export enum notifyLevel {
  warning = 'WARNING',
  notify = 'NOTIFY',
}
export enum TNotifyType {
  ORDER = 'ORDER', // Order-sender
  ORDER_OWNER = 'ORDER_OWNER', // Order-receive
  FORECAST = 'FORECAST', // Forecast
  GOODSISSUE = 'GOODSISSUE', // GoodsIssue-sender
  GOODSRECEIPT = 'GOODSRECEIPT', // GoodsReceipt-sender
  PRODUCTIONCOMMAND = 'PRODUCTIONCOMMAND', // ProductionCommand-sender
}
export enum ParentNavigate {
  ORDER = 'order', // Ticket-sender
  ORDER_OWNER = 'received-order', // Order-receive
  FORECAST = 'forecast',
  GOODSISSUE = 'goods issue',
  GOODSRECEIPT = 'goods receipt',
  PRODUCTIONCOMMAND = 'production command'
}

export const SIZE_NOTIFY_HEADER = 10;
export const SIZE_NOTIFY_ALL = 100;

export const NavigateNotifyPage = (parentNavigate: TNotifyType) => {
  switch (parentNavigate.toUpperCase()) {
    case TNotifyType.ORDER:
      return `/${ParentNavigate.ORDER_OWNER}`;
    default:
      return `/`;
  }
}
