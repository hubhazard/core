/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns a value indicating if the presence was detected.
 */
export function isPresent(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 Returns a value indicating if the presence was detected.
 */
export function isPresent(deviceId: number, defaultValue: boolean): boolean;

export function isPresent(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const status = getDevice(deviceOrId).getAttributeAsString('presence');
  if (status === 'present') return true;
  return status === 'not present' ? false : defaultValue;
}
