/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns a number of available buttons.
 *
 * @param device A target device.
 * @returns A number of the available buttons.
 * @category PushableButton capability
 */
export function getNumberOfButtons(device: HubitatDevice): number;

/**
 * Returns a number of available buttons.
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the available buttons.
 * @category PushableButton capability
 */
export function getNumberOfButtons(deviceId: number): number;

export function getNumberOfButtons(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('numberOfButtons');
}

/**
 * Returns a number of the button that was pushed.
 *
 * @param device A target device.
 * @returns A number of the button that was pushed.
 * @category PushableButton capability
 */
export function whichButtonIsPushed(device: HubitatDevice): number;

/**
 * Returns a number of the button that was pushed.
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the button that was pushed.
 * @category PushableButton capability
 */
export function whichButtonIsPushed(deviceId: number): number;

export function whichButtonIsPushed(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('pushed');
}
