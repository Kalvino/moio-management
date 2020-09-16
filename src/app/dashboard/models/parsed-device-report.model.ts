/**
 * Parsed Device report description
 */
export interface IParsedDeviceReport {

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
