/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns held button number.
 */
export function whichButtonIsHeld(device: HubitatDevice): number;

/**
 Returns held button number.
 */
export function whichButtonIsHeld(deviceId: number): number;

export function whichButtonIsHeld(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('held');
}
