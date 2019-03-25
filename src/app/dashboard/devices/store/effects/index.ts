import { DeviceEffects } from './device.effects';
import { DeviceSettingsEffects } from './device-settings.effects';
import { DeviceLogsEffects } from './device-logs.effects';
// import { DeviceReportsEffects } from './device-reports.effects';
import { DeviceSocketEffects } from './device-socket.effects';

export const effects: any[] = [DeviceEffects, DeviceSettingsEffects, DeviceLogsEffects, DeviceSocketEffects];

export * from './device.effects';
export * from './device-settings.effects';
export * from './device-logs.effects';
export * from './device-socket.effects';
// export * from './device-reports.effects';
