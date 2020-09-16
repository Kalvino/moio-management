/**
 * Device command description
 */
export interface IDeviceCommand {
    id: 1;
    model_id: number;
    code: string;
    short_name: string;
    description: string;
    used_in_management_tool: number;
    created_at: string;
    updated_at: string;
}
