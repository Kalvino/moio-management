/**
 * device description
 */
export interface IDevice {
    id?: number | null;
    serial_no?: string;
    readonly_code?: string;
    admin_code?: string | null;
    model_id?: string | null;
    nursing_home_id?: number;
    ip_address?: string | null;
}
