/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns the last carbon monoxide measurement.
 *
 * Capabilities:
 * - CarbonMonoxideMeasurement
 *
 * @param device A target device.
 * @returns Returns the last carbon monoxide measurement.
 */
export function getCarbonMonoxide(device: HubitatDevice): number;

/**
 * Returns the last carbon monoxide measurement.
 *
 * Capabilities:
 * - CarbonMonoxideMeasurement
 *
 * @param deviceId An ID of the target device.
 * @returns Returns the last carbon monoxide measurement.
 */
export function getCarbonMonoxide(deviceId: number): number;

export function getCarbonMonoxide(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('carbonMonoxide');
}
