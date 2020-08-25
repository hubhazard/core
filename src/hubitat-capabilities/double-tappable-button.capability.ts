/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns a number of the button that was double-pressed.
 *
 * @param device A target device.
 * @returns A number of the button that was double-pressed.
 * @category DoubleTappableButton capability
 */
export function whichButtonIsDoubleTapped(device: HubitatDevice): number;

/**
 * Returns a number of the button that was double-pressed.
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was double-pressed.
 * @category DoubleTappableButton capability
 */
export function whichButtonIsDoubleTapped(deviceId: number): number;

export function whichButtonIsDoubleTapped(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('doubleTapped');
}
