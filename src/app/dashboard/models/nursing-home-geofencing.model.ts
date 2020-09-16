import { NursingHome } from './nursing-home.model';

/**
 * geofencing model
 */
export interface Geofencing {
    id?: number | null;
    name?: string | null;
    nursing_home_id?: number | null;
    polygon?: string | null;
    nursing_home?: NursingHome;
}
