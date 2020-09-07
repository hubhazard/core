/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns a number of the button that was held.
 *
 * Capabilities:
 * - HoldableButton
 *
 * @param device A target device.
 * @returns A number of the button that was held.
 */
export function whichButtonHeld(device: HubitatDevice): number;

/**
 * Returns a number of the button that was held.
 *
 * Capabilities:
 * - HoldableButton
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was held.
 */
export function whichButtonHeld(deviceId: number): number;

export function whichButtonHeld(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('held');
}
