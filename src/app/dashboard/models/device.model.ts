/**
 * device description
 */
export interface IDevice {
    admin_code?: string | null;
    id?: number | null;
    model_no?: string | null;
    nursing_home_id?: number;
    readonly_code?: string;
    serial_no?: string;
  }
  