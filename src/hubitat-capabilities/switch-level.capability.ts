/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';
import { setSwitch } from './switch.capability';

/**
 * Returns current switch level.
 *
 * @param device A target device.
 * @returns Returns current switch level.
 * @category SwitchLevel capability
 */
export function getSwitchLevel(device: HubitatDevice): number;

/**
 * Returns current switch level.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current switch level.
 * @category SwitchLevel capability
 */
export function getSwitchLevel(deviceId: number): number;

export function getSwitchLevel(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('level');
}

export { getSwitchLevel as getLevel } from './switch-level.capability';

/**
 * Sets the switch to a specified level. Can't specify level change duration due
 * to [Maker API](https://docs.hubitat.com/index.php?title=Maker_API) limitations.
 *
 * @param device A target device.
 * @param level A level to set the switch to.
 * @category SwitchLevel capability
 */
export async function setSwitchLevel(device: HubitatDevice, level: number): Promise<void>;

/**
 * Sets the switch to a specified level. Can't specify level change duration due
 * to [Maker API](https://docs.hubitat.com/index.php?title=Maker_API) limitations.
 *
 * @param deviceId An ID of the target device.
 * @param level A level to set the switch to.
 * @category SwitchLevel capability
 */
export async function setSwitchLevel(deviceId: number, level: number): Promise<void>;

export async function setSwitchLevel(deviceOrId: HubitatDevice | number, level: number): Promise<void> {
  level = Math.round(level);
  const levelString = `${level}`;
  const device = getDevice(deviceOrId);
  if (device.hasAttribute('switch')) {
    setSwitch(device, level > 0);
  }
  device.setAttribute('level', levelString);
  await device.sendCommand('setLevel', levelString);
}

export { setSwitchLevel as setLevel } from './switch-level.capability';
