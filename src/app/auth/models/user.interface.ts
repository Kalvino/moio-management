/**
 * user definition
 */
export interface IUser {
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
}

/**
 * credentials definition
 */
export interface ICredentials {
  username: string;
  password: string;
}
