export interface UserInfo {
  admin: boolean;
  uid: string;
  name: string;
  email: string;
  deleted: boolean;
}
export interface Series {
  name: string;
  value: number;
}
export interface UserStat {
  name: string;
  uid: string;
  deleted: boolean;
  series: Series[];
}
