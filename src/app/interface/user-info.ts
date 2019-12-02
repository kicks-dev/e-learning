import { OrganizationInfo } from './organization-info';

export interface UserInfo {
  admin: boolean;
  uid: string;
  name: string;
  email: string;
  deleted: boolean;
  system_admin: boolean;
  organization_id: any;
  organization: OrganizationInfo;
}
export interface Series {
  name: string;
  value: number;
}
export interface UserStat {
  name: string;
  uid: string;
  deleted: boolean;
  organization_id: any;
  series: Series[];
}
export interface UserInfoForList {
  admin: boolean;
  uid: string;
  name: string;
  email: string;
  deleted: boolean;
}

