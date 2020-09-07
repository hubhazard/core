/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';
import { setSwitch } from './set-switch.function';

/**
 * Sets the switch to a specified level. Can't specify level change duration due
 * to [Maker API](https://docs.hubitat.com/index.php?title=Maker_API) limitations.
 *
 * Capabilities:
 * - MusicPlayer
 * - SwitchLevel
 *
 * @param device A target device.
 * @param level A level to set the switch to.
 */
export async function setLevel(device: HubitatDevice, level: number): Promise<void>;

/**
 * Sets the switch to a specified level. Can't specify level change duration due
 * to [Maker API](https://docs.hubitat.com/index.php?title=Maker_API) limitations.
 *
 * Capabilities:
 * - MusicPlayer
 * - SwitchLevel
 *
 * @param deviceId An ID of the target device.
 * @param level A level to set the switch to.
 */
export async function setLevel(deviceId: number, level: number): Promise<void>;

export async function setLevel(deviceOrId: HubitatDevice | number, level: number): Promise<void> {
  level = Math.round(level);
  const levelString = `${level}`;
  const device = getDevice(deviceOrId);
  if (device.hasAttribute('switch')) {
    setSwitch(device, level > 0);
  }
  device.setAttribute('level', levelString);
  await device.sendCommand('setLevel', levelString);
}
