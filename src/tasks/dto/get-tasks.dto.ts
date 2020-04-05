import { TaskStatus } from '../tasks.model';

export class GetTaskFillterDto {
  status: TaskStatus;
  search: string;
}
