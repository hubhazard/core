/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { SwitchStatus } from '..';
import { getDevice } from '../capabilities.helpers';

/**
 * Sets the switch to a specified value.
 *
 * Capabilities:
 * - Bulb
 * - Light
 * - Outlet
 * - RelaySwitch
 * - SamsungTV
 * - Switch
 *
 * @param device A target device.
 * @param setting A setting to set the switch to. `true` is on; `false` is off.
 */
export async function setSwitch(device: HubitatDevice, setting: boolean | SwitchStatus): Promise<void>;

/**
 * Sets the switch to a specified value.
 *
 * Capabilities:
 * - Bulb
 * - Light
 * - Outlet
 * - RelaySwitch
 * - SamsungTV
 * - Switch
 *
 * @param deviceId An ID of the target device.
 * @param setting A setting to set the switch to. `true` is on; `false` is off.
 */
export async function setSwitch(deviceId: number, setting: boolean | SwitchStatus): Promise<void>;

export async function setSwitch(deviceOrId: HubitatDevice | number, setting: boolean | SwitchStatus): Promise<void> {
  if (typeof setting === 'boolean') setting = setting ? 'on' : 'off';
  const device = getDevice(deviceOrId);
  device.setAttribute('switch', setting);
  await device.sendCommand(setting);
}
