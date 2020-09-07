/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns a number of the button that was pushed.
 *
 * Capabilities:
 * - PushableButton
 *
 * @param device A target device.
 * @returns A number of the button that was pushed.
 */
export function whichButtonPushed(device: HubitatDevice): number;

/**
 * Returns a number of the button that was pushed.
 *
 * Capabilities:
 * - PushableButton
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was pushed.
 */
export function whichButtonPushed(deviceId: number): number;

export function whichButtonPushed(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('pushed');
}
