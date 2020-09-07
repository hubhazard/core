/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns current switch status.
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
 * @returns `true` if the switch is on; `false` if the switch is off.
 */
export function isOn(device: HubitatDevice): boolean;

/**
 * Returns current switch status.
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
 * @returns `true` if the switch is on; `false` if the switch is off.
 */
export function isOn(deviceId: number): boolean;

/**
 * Returns current switch status.
 *
 * Capabilities:
 * - Bulb
 * - Light
 * - Outlet
 * - RelaySwitch
 * - SamsungTV
 * - Switch
 *
 * @param deviceOrId A target device or an ID of the target device.
 * @returns `true` if the switch is on; `false` if the switch is off.
 */
export function isOn(deviceOrId: HubitatDevice | number): boolean;

export function isOn(deviceOrId: HubitatDevice | number): boolean {
  return getDevice(deviceOrId).getAttributeAsString('switch') === 'on';
}
