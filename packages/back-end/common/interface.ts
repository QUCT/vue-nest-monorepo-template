export interface Isever {
  port: number;
  host: string;
}

export interface Ijwt {
  secret: string;
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

enum RoleCode {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

enum RuleCode {
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  ALL = 'ALL',
}
