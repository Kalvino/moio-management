/**
 * device description
 */
export interface IDevice {
    id?: number | null;
    admin_code?: string | null;
    model_no?: string | null;
    nursing_home_id?: number;
    readonly_code?: string;
    serial_no?: string;
}
