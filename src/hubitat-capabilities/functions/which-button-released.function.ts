/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns a number of the button that was released.
 *
 * Capabilities:
 * - ReleasableButton
 *
 * @param device A target device.
 * @returns A number of the button that was released.
 */
export function whichButtonReleased(device: HubitatDevice): number;

/**
 * Returns a number of the button that was released.
 *
 * Capabilities:
 * - ReleasableButton
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was released.
 */
export function whichButtonReleased(deviceId: number): number;

export function whichButtonReleased(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('released');
}
