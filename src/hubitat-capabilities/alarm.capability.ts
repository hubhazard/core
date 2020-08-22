/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

type AlarmSetting = 'both' | 'off' | 'siren' | 'strobe';

/**
 Returns alarm setting value.
 */
export function getAlarmSetting(device: HubitatDevice, defaultValue: AlarmSetting): AlarmSetting;

/**
 Returns alarm setting value.
 */
export function getAlarmSetting(deviceId: number, defaultValue: AlarmSetting): AlarmSetting;

/**
 Returns alarm setting value.
 */
export function getAlarmSetting(deviceOrId: HubitatDevice | number, defaultValue: AlarmSetting = 'off'): AlarmSetting {
  return (getDevice(deviceOrId).getAttributeAsString('alarm') as AlarmSetting) ?? defaultValue;
}

/**
 Sets alarm to specified setting.
 */
export async function setAlarmSetting(device: HubitatDevice, setting: AlarmSetting): Promise<void>;

/**
 Sets alarm to specified setting.
 */
export async function setAlarmSetting(deviceId: number, setting: AlarmSetting): Promise<void>;

export async function setAlarmSetting(deviceOrId: HubitatDevice | number, setting: AlarmSetting): Promise<void> {
  const device = getDevice(deviceOrId);
  device.setAttribute('alarm', setting);
  await device.sendCommand(setting);
}
