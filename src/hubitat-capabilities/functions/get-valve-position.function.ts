/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EOpenClosedPosition, getDevice } from '..';

/**
 * Returns current valve position.
 *
 * Capabilities:
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 *
 * @param device A target device.
 * @returns Returns current valve position.
 */
export function getValvePosition(device: HubitatDevice): EOpenClosedPosition;

/**
 * Returns current valve position.
 *
 * Capabilities:
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current valve position.
 */
export function getValvePosition(deviceId: number): EOpenClosedPosition;

export function getValvePosition(deviceOrId: HubitatDevice | number): EOpenClosedPosition {
  return getDevice(deviceOrId).getAttributeAsString('valve') as EOpenClosedPosition;
}
