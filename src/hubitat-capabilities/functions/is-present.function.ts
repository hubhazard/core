/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns a value indicating whether the presence was detected.
 *
 * Capabilities:
 * - Beacon
 * - PresenceSensor
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the presence was detected; `false` if no presence was
 * detected.
 */
export function isPresent(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 * Returns a value indicating whether the presence was detected.
 *
 * Capabilities:
 * - Beacon
 * - PresenceSensor
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the presence was detected; `false` if no presence was
 * detected.
 */
export function isPresent(deviceId: number, defaultValue: boolean): boolean;

export function isPresent(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const status = getDevice(deviceOrId).getAttributeAsString('presence');
  if (status === 'present') return true;
  return status === 'not present' ? false : defaultValue;
}
