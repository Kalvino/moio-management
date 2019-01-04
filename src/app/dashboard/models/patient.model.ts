import { IDevice } from './device.model';

/**
 * patient model description
 */
export interface IPatient {
  device_id?: number | null;
  firstname?: string | null;
  gender?: string | null;
  id?: number | null; // auto generated from DB
  image?: string; // url or base64 encoded image?
  lastname?: string;
  nursing_home_id?: number | null;
  phone?: string; // optional
  device?: IDevice;
  users?: number | null;
}
