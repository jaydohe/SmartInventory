export type TPage<T> = {
  totalRecords: number;
  totalPage: number;
  page: number;
  offSet: number;
  nextPage: null | boolean;
  previousPage: null | boolean;
  data: T[];
};

export type TResponse<T> = {
  msg: string;
  data: T;
  stCode: number;
  // resultCode: 2000; hỏi lại
};
