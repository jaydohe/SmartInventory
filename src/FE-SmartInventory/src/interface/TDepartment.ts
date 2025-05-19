export type TDepartment = {
  code: string;
  name: string;
  createdAt: string;
  modifiedOn: any;
  deletedOn: any;
  id: string;
};

export type TCreateDepartment = Pick<TDepartment, 'name'>;
