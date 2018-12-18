/**
 * user defintion
 */

import { IPatient } from './patient.model';

export interface User {
  id?: number | null;
  name?: string;
  nursing_home?: string;
  registered_on?: string;
  last_login?: string;
  patient_profiles?: number;
  password?: string;
  confirm_password?: string;
  nursing_home_key?: string;
}
