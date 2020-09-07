/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { ESwitchStatus, getDevice } from '..';

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
export async function setSwitch(device: HubitatDevice, setting: boolean | ESwitchStatus): Promise<void>;

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
export async function setSwitch(deviceId: number, setting: boolean | ESwitchStatus): Promise<void>;

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
 * @param deviceOrId An ID of the target device or the device itself.
 * @param setting A setting to set the switch to. `true` is on; `false` is off.
 */
export async function setSwitch(deviceOrId: HubitatDevice | number, setting: boolean | ESwitchStatus): Promise<void>;

export async function setSwitch(deviceOrId: HubitatDevice | number, setting: boolean | ESwitchStatus): Promise<void> {
  if (typeof setting === 'boolean') setting = setting ? 'on' : 'off';
  const device = getDevice(deviceOrId);
  device.setAttribute('switch', setting);
  await device.sendCommand(setting);
}
