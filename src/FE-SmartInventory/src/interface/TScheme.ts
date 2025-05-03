import { TUser } from './TUser';
import { TUploadFile } from './TUploadFile';
import { User } from './TReportTicket';

export interface Process {
  userId: string;
  completedPercent: number;
  modifiedOn: string;
  user: User;
}

export type TSubFile = {
  fileName: string;
  filePath: string;
  schemeId: string;
  id: string;
};

export interface TScheme {
  name: string;
  userId: string;
  filePath: string;
  status: number;
  expireAt: string | null;
  createdAt: string;
  modifiedOn: string | null;
  id: string;
  processes: Process[];
  subFiles: TSubFile[];
  user: User;
  completedPercent: number;
}
