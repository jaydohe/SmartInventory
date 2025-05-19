import { CategoryEntityTypes } from '@/Constant/CategoryTypes';

export type TCategory = {
  code: string;
  name: string;
  categoryEntityType: CategoryEntityTypes;
  createdAt: string;
  modifiedOn: any;
  deletedOn: any;
  id: string;
};

export type TCreateCategory = Pick<TCategory, 'name'>;
