/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns a number of the button that was released.
 *
 * @param device A target device.
 * @returns A number of the button that was released.
 * @category ReleasableButton capability
 */
export function whichButtonIsReleased(device: HubitatDevice): number;

/**
 * Returns a number of the button that was released.
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was released.
 * @category ReleasableButton capability
 */
export function whichButtonIsReleased(deviceId: number): number;

export function whichButtonIsReleased(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('released');
}
