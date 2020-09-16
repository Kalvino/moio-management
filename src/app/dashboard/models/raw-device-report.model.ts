/**
 * Raw Device report description
 */
export interface IRawDeviceReport {
    id: number;
    device_id: number;
    raw_data: string;
    tx_address: string;
    tx_ip_address: string;
    rx_address: string;
    rx_ip_address: string;
    command_code: string;
    telegram_data: string;
    lrc: string;
    telegram_status: number;
    comments: string;
    remote_ip_address: string;
    remote_port: string;
    receipt_date: string;
    sent_date: string;
    direction: string;
}