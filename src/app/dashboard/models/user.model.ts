/**
 * user defintion
 */
export interface User {
  email?: string;
  firstname?: string;
  lastname?: string;
  gender?: string;
  id?: number | null;
  image?: string; // url base64 encoded image?
  password?: string;
  phone?: string;
  nursingHome?: string;
  nursing_home_id?: number;
  username?: string;
}
