/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns a number of the button that was double-pressed.
 *
 * Capabilities:
 * - DoubleTappableButton
 *
 * @param device A target device.
 * @returns A number of the button that was double-pressed.
 */
export function whichButtonDoubleTapped(device: HubitatDevice): number;

/**
 * Returns a number of the button that was double-pressed.
 *
 * Capabilities:
 * - DoubleTappableButton
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was double-pressed.
 */
export function whichButtonDoubleTapped(deviceId: number): number;

export function whichButtonDoubleTapped(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('doubleTapped');
}
