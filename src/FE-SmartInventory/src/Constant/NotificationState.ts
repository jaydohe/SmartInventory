export enum notifyLevel {
  warning = 'WARNING',
  notify = 'NOTIFY',
}
export enum TNotifyType {
  TICKET = 'TICKET', // Ticket-sender
  TICKET_OWNER = 'TICKET_OWNER', // Ticket-receive
  SCHEME = 'SCHEME', // scheme-sender
  SCHEME_OWNER = 'SCHEME_OWNER', // scheme-receive
  SCHEME_UNDO = 'SCHEME_UNDO',
  TICKET_UNDO = 'TICKET_UNDO',
}
export enum ParentNavigate {
  TICKET = 'ticket-issue', // Ticket-sender
  TICKET_OWNER = 'ticket-issue', // Ticket-receive
  SCHEME = 'scheme', // scheme-sender
  SCHEME_OWNER = 'received-scheme', // scheme-receive
}

export const SIZE_NOTIFY_HEADER = 10;
export const SIZE_NOTIFY_ALL = 100;

export const NavigateNotifyPage = (parentNavigate: TNotifyType) => {
  switch (parentNavigate.toUpperCase()) {
    case TNotifyType.TICKET:
      return `/${ParentNavigate.TICKET}`;
    case TNotifyType.TICKET_OWNER:
      return `/${ParentNavigate.TICKET_OWNER}`;
    case TNotifyType.SCHEME:
      return `/${ParentNavigate.SCHEME}`;
    case TNotifyType.SCHEME_OWNER:
      return `/${ParentNavigate.SCHEME_OWNER}`;
    default:
      return `/`;
  }
};
