/**
 * report defintion
 */

export interface Report {
    id: number;
    reportType: string;
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
    batteryHealth: number
}
