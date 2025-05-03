import { ActivityContentTypes, ActivityEntityTypes } from '@/Constant/ActivityType';

export type TActivity = {
  contentType: ActivityContentTypes;
  content: string;
  targetId: string;
  unitId: string;
  entityType: ActivityEntityTypes;
  id: string;
};
