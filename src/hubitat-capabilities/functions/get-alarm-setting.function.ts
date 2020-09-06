/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EAlarmSetting } from '..';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns a value of the alarm setting.
 *
 * Capabilities:
 * - Alarm
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns Returns current alarm setting value.
 */
export function getAlarmSetting(device: HubitatDevice, defaultValue: EAlarmSetting): EAlarmSetting;

/**
 * Returns a value of the alarm setting.`
 *
 * Capabilities:
 * - Alarm
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns Returns current alarm setting value.
 */
export function getAlarmSetting(deviceId: number, defaultValue: EAlarmSetting): EAlarmSetting;

export function getAlarmSetting(
  deviceOrId: HubitatDevice | number,
  defaultValue: EAlarmSetting = 'off',
): EAlarmSetting {
  return (getDevice(deviceOrId).getAttributeAsString('alarm') as EAlarmSetting) ?? defaultValue;
}
