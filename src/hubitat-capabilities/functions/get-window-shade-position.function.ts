/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EWindowShadePosition, getDevice } from '..';

/**
 * Returns current valve position.
 *
 * Capabilities:
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param device A target device.
 * @returns Returns current valve position.
 */
export function getWindowShadePosition(device: HubitatDevice): EWindowShadePosition;

/**
 * Returns current valve position.
 *
 * Capabilities:
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current valve position.
 */
export function getWindowShadePosition(deviceId: number): EWindowShadePosition;

export function getWindowShadePosition(deviceOrId: HubitatDevice | number): EWindowShadePosition {
  return getDevice(deviceOrId).getAttributeAsString('windowShade') as EWindowShadePosition;
}
