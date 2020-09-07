/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { isOn } from '..';

/**
 * Returns a value indicating whether any of specified switches are on.
 *
 * Capabilities:
 * - Bulb
 * - Light
 * - Outlet
 * - RelaySwitch
 * - SamsungTV
 * - Switch
 *
 * @param devices A list of target devices.
 * @returns `true` if any switch is on; `false` if the no switch is on.
 */
export function isAnySwitchOn(devices: (HubitatDevice | number)[]): boolean {
  return devices.some(isOn);
}
