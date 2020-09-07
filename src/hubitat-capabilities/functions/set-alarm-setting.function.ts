/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EAlarmSetting, getDevice } from '..';

/**
 * Sets the alarm to a specified setting.
 *
 * Capabilities:
 * - Alarm
 *
 * @param device A target device.
 * @param setting A setting to set the alarm to.
 */
export async function setAlarmSetting(device: HubitatDevice, setting: EAlarmSetting): Promise<void>;

/**
 * Sets the alarm to a specified setting.
 *
 * Capabilities:
 * - Alarm
 *
 * @param deviceId An ID of the target device.
 * @param setting A setting to set the alarm to.
 */
export async function setAlarmSetting(deviceId: number, setting: EAlarmSetting): Promise<void>;

export async function setAlarmSetting(deviceOrId: HubitatDevice | number, setting: EAlarmSetting): Promise<void> {
  const device = getDevice(deviceOrId);
  device.setAttribute('alarm', setting);
  await device.sendCommand(setting);
}
