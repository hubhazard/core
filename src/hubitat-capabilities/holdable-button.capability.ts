/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns a number of the button that was held.
 *
 * @param device A target device.
 * @returns A number of the button that was held.
 * @category HoldableButton capability
 */
export function whichButtonIsHeld(device: HubitatDevice): number;

/**
 * Returns a number of the button that was held.
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was held.
 * @category HoldableButton capability
 */
export function whichButtonIsHeld(deviceId: number): number;

export function whichButtonIsHeld(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('held');
}
