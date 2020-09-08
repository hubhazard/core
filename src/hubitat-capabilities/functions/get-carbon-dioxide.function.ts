/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns the last carbon dioxide measurement.
 *
 * Capabilities:
 * - CarbonDioxideMeasurement
 *
 * @param device A target device.
 * @returns Returns the last carbon dioxide measurement.
 */
export function getCarbonDioxide(device: HubitatDevice): number;

/**
 * Returns the last carbon dioxide measurement.
 *
 * Capabilities:
 * - CarbonDioxideMeasurement
 *
 * @param deviceId An ID of the target device.
 * @returns Returns the last carbon dioxide measurement.
 */
export function getCarbonDioxide(deviceId: number): number;

export function getCarbonDioxide(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('carbonDioxide');
}
