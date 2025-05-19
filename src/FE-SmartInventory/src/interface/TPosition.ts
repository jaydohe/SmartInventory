export type TPosition = {
  name: string;
  createdAt: string;
  modifiedOn: string;
  deletedOn: null;
  id: string;
};

export type TCreatePosition = Pick<TPosition, 'name'>;
