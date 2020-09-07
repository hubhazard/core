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
export function getCarbonMonoxideMeasurement(device: HubitatDevice): number;

/**
 * Returns the last carbon monoxide measurement.
 *
 * Capabilities:
 * - CarbonMonoxideMeasurement
 *
 * @param deviceId An ID of the target device.
 * @returns Returns the last carbon monoxide measurement.
 */
export function getCarbonMonoxideMeasurement(deviceId: number): number;

export function getCarbonMonoxideMeasurement(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('carbonMonoxide');
}
