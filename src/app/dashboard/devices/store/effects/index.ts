import { DeviceEffects } from './device.effects';
import { DeviceSettingsEffects } from './device-settings.effects';
import { DeviceLogsEffects } from './device-logs.effects';

export const effects: any[] = [DeviceEffects, DeviceSettingsEffects, DeviceLogsEffects];

export * from './device.effects';
export * from './device-settings.effects';
export * from './device-logs.effects';
