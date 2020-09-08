/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns a value indicating whether the acceleration is detected.
 *
 * Capabilities:
 * - AccelerationSensor
 *
 * @param device A target device.
 * @returns `true` if acceleration was detected; `false` when not.
 */
export function isAccelerating(device: HubitatDevice): boolean;

/**
 * Returns a value indicating whether the acceleration is detected.
 *
 * Capabilities:
 * - AccelerationSensor
 *
 * @param deviceId An ID of the target device.
 * @returns `true` if acceleration was detected; `false` when not.
 */
export function isAccelerating(deviceId: number): boolean;

export function isAccelerating(deviceOrId: HubitatDevice | number): boolean {
  const status = getDevice(deviceOrId).getAttributeAsString('acceleration');
  return status === 'active';
}
