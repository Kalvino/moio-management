/**
 * device description
 */
export interface IDeviceLogs {
    id?: number | null;
    device_id: number |null;
    type?: string | null;
    raw_data?: string | null;
    transmitte_address?: string | null;
    reciever_address?: string | null;
    opcode_command?: string | null;
    telegram_data?: string | null;
}
