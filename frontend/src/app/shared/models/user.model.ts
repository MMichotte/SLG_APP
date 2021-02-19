
export enum EUserRoles {
  DEV = 'dev',
  ADMIN = 'admin',
  USER = 'user',
  ACCOUNTING = 'accounting'
}

export interface IUser {
  username: string
}

export interface ILoginUser {
  username: string,
  password: string
}
