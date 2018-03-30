import { WorkInfo } from './work-info';

export interface CourseInfo {

  title: string;
  id: string;
  content: string;
  finished: boolean;
  studyInfoList: WorkInfo[];
}
