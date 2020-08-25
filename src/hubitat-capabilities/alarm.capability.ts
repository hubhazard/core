/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * All possible settings of the alarm (Alarm capability).
 */
type AlarmSetting = 'both' | 'off' | 'siren' | 'strobe';

/**
 * Returns a value of the alarm setting.
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns Returns current alarm setting value.
 * @category Alarm capability
 */
export function getAlarmSetting(device: HubitatDevice, defaultValue: AlarmSetting): AlarmSetting;

/**
 * Returns a value of the alarm setting.`
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns Returns current alarm setting value.
 * @category Alarm capability
 */
export function getAlarmSetting(deviceId: number, defaultValue: AlarmSetting): AlarmSetting;

export function getAlarmSetting(deviceOrId: HubitatDevice | number, defaultValue: AlarmSetting = 'off'): AlarmSetting {
  return (getDevice(deviceOrId).getAttributeAsString('alarm') as AlarmSetting) ?? defaultValue;
}

/**
 * Sets the alarm to a specified setting.
 *
 * @param device A target device.
 * @param setting A setting to set the alarm to.
 * @category Alarm capability
 */
export async function setAlarmSetting(device: HubitatDevice, setting: AlarmSetting): Promise<void>;

/**
 * Sets the alarm to a specified setting.
 *
 * @param deviceId An ID of the target device.
 * @param setting A setting to set the alarm to.
 * @category Alarm capability
 */
export async function setAlarmSetting(deviceId: number, setting: AlarmSetting): Promise<void>;

export async function setAlarmSetting(deviceOrId: HubitatDevice | number, setting: AlarmSetting): Promise<void> {
  const device = getDevice(deviceOrId);
  device.setAttribute('alarm', setting);
  await device.sendCommand(setting);
}
