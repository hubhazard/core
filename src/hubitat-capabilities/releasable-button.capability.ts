/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns released button number.
 */
export function whichButtonIsReleased(device: HubitatDevice): number;

/**
 Returns released button number.
 */
export function whichButtonIsReleased(deviceId: number): number;

export function whichButtonIsReleased(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('released');
}
