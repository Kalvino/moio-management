/**
 * user definition
 */
export interface User {
  username?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
}

/**
 * credentials definition
 */
export interface Credentials {
  username: string;
  password: string;
}
