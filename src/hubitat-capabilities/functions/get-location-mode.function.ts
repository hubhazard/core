/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns current location mode name.
 *
 * Capabilities:
 * - LocationMode
 *
 * @param device A target device.
 * @returns Returns a name of the the current location mode.
 */
export function getLocationMode(device: HubitatDevice): string | undefined;

/**
 * Returns current location mode name.
 *
 * Capabilities:
 * - LocationMode
 *
 * @param deviceId An ID of the target device.
 * @returns Returns a name of the the current location mode.
 */
export function getLocationMode(deviceId: number): string | undefined;

export function getLocationMode(deviceOrId: HubitatDevice | number): string | undefined {
  return getDevice(deviceOrId).getAttributeAsString('mode');
}
