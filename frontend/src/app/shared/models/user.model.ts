
export enum EUserRoles {
  DEV = 'dev',
  ADMIN = 'admin',
  USER = 'user',
  ACCOUNTING = 'accounting'
}

export interface IUser {
  firstName: string,
  lastName: string,
  email: string,
  password?: string,
}

export interface ILoginUser {
  email: string,
  password: string
}
