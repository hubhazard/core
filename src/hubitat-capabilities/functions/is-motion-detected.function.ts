/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns a value indicating whether the motion was detected.
 *
 * Capabilities:
 * - MotionSensor
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the motion was detected; `false` if the motion wasn't
 * detected.
 */
export function isMotionDetected(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 * Returns a value indicating whether the motion was detected.
 *
 * Capabilities:
 * - MotionSensor
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the motion was detected; `false` if the motion wasn't
 * detected.
 */
export function isMotionDetected(deviceId: number, defaultValue: boolean): boolean;

export function isMotionDetected(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const status = getDevice(deviceOrId).getAttributeAsString('motion');
  if (status === 'active') return true;
  return status === 'inactive' ? false : defaultValue;
}
