/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns a value indicating whether any of specified switches are on.
 *
 * @param devices A list of target devices.
 * @returns `true` if any switch is on; `false` if the no switch is on.
 * @category Switch capability
 */
export function isAnySwitchOn(devices: (HubitatDevice | number)[]): boolean {
  return devices.some((device) => isSwitchOn(device));
}

export { isAnySwitchOn as isAnyOn } from './switch.capability';

/**
 * Returns current switch status.
 *
 * @param device A target device.
 * @returns `true` if the switch is on; `false` if the switch is off.
 * @category Switch capability
 */
export function isSwitchOn(device: HubitatDevice): boolean;

/**
 * Returns current switch status.
 *
 * @param deviceId An ID of the target device.
 * @returns `true` if the switch is on; `false` if the switch is off.
 * @category Switch capability
 */
export function isSwitchOn(deviceId: number): boolean;

/**
 * Returns current switch status.
 *
 * @param deviceOrId A target device or an ID of the target device.
 * @returns `true` if the switch is on; `false` if the switch is off.
 * @category Switch capability
 */
export function isSwitchOn(deviceOrId: HubitatDevice | number): boolean;

export function isSwitchOn(deviceOrId: HubitatDevice | number): boolean {
  return getDevice(deviceOrId).getAttributeAsString('switch') === 'on';
}

export { isSwitchOn as isOn } from './switch.capability';

/**
 * Sets the switch to a specified value.
 *
 * @param device A target device.
 * @param setting A setting to set the switch to. `true` is on; `false` is off.
 * @category Switch capability
 */
export async function setSwitch(device: HubitatDevice, setting: boolean | 'on' | 'off'): Promise<void>;

/**
 * Sets the switch to a specified value.
 *
 * @param deviceId An ID of the target device.
 * @param setting A setting to set the switch to. `true` is on; `false` is off.
 * @category Switch capability
 */
export async function setSwitch(deviceId: number, setting: boolean | 'on' | 'off'): Promise<void>;

export async function setSwitch(deviceOrId: HubitatDevice | number, setting: boolean | 'on' | 'off'): Promise<void> {
  if (typeof setting === 'boolean') setting = setting ? 'on' : 'off';
  const device = getDevice(deviceOrId);
  device.setAttribute('switch', setting);
  await device.sendCommand(setting);
}

/**
 * Toggles the switch.
 *
 * @param device A target device.
 * @category Switch capability
 */
export async function toggleSwitch(device: HubitatDevice): Promise<void>;

/**
 * Toggles the switch.
 *
 * @param deviceId An ID of the target device.
 * @category Switch capability
 */
export async function toggleSwitch(deviceId: number): Promise<void>;

export async function toggleSwitch(deviceOrId: HubitatDevice | number): Promise<void> {
  const device = getDevice(deviceOrId);
  const currentSetting = isSwitchOn(device);
  if (currentSetting == null) return;
  await setSwitch(device, !currentSetting);
}

export { toggleSwitch as toggle } from './switch.capability';
