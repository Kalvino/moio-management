/**
 * Device report description
 */
export interface IDeviceReport {
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
    created_at: string;
    updated_at: string;
    parsed: {
        id: number;
        reportType: string;
        IpAddress: string;
        alarmCode: string;
        alarmName: string;
        positionCode: string;
        positionName: string;
        beaconStatus: string;
        latitude: string;
        longitude: string;
        sensorStatus: string;
        date: string;
        time: string;
        dayOfWeek: string;
        batteryHealth: string;
        batteryVoltage: string;
        gusimSerialNumber: string;
        xAngle: string;
        yAngle: string;
        zAngle: string;
        imuInterruptStatus: string;
        createdAt: string;
    }
}
