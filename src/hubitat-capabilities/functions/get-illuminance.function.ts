/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns the last illuminance measurement.
 *
 * Capabilities:
 * - IlluminanceMeasurement
 *
 * @param device A target device.
 * @returns Returns the last illuminance measurement.
 */
export function getIlluminance(device: HubitatDevice): number;

/**
 * Returns the last illuminance measurement.
 *
 * Capabilities:
 * - IlluminanceMeasurement
 *
 * @param deviceId An ID of the target device.
 * @returns Returns the last illuminance measurement.
 */
export function getIlluminance(deviceId: number): number;

export function getIlluminance(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('illuminance');
}
