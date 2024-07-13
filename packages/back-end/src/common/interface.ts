export interface Isever {
  port: number;
  host: string;
}

export interface Iredis {
  host: string;
  port: number;
  password: string;
  username: string;
}

export interface Ijwt {
  secret: string;
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum RoleCode {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export enum RuleCode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  ALL = 'ALL',
}
