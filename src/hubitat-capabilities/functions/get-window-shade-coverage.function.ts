/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns current window shade position. 0 is closed, 100 is open.
 *
 * Capabilities:
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param device A target device.
 * @returns Returns current window shade position. 0 is closed, 100 is open.
 */
export function getWindowShadeCoverage(device: HubitatDevice): number;

/**
 * Returns current window shade position. 0 is closed, 100 is open.
 *
 * Capabilities:
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current window shade position. 0 is closed, 100 is open.
 */
export function getWindowShadeCoverage(deviceId: number): number;

export function getWindowShadeCoverage(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('position');
}
