import { IDevice } from './device.model';
import { User } from './user.model';
import { NursingHome } from './nursing-home.model';

/**
 * patient model description
 */
export interface IPatient {
  id?: number | null; // auto generated from DB
  firstname?: string | null;
  lastname?: string;
  gender?: string | null;
  image?: string; // url or base64 encoded image?
  phone?: string; // optional
  device_id?: number | null;
  nursing_home_id?: number | null;
  nursing_home_name?: string | null;
  device?: IDevice;
  nursing_home?: NursingHome;
  users?: User[];
  
  users_count?: number | null;
}
