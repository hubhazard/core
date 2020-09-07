/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns a number of available buttons.
 *
 * Capabilities:
 * - PushableButton
 *
 * @param device A target device.
 * @returns A number of the available buttons.
 */
export function getNumberOfButtons(device: HubitatDevice): number;

/**
 * Returns a number of available buttons.
 *
 * Capabilities:
 * - PushableButton
 *
 * @param deviceId An ID of the target device.
 * @returns A number of the available buttons.
 */
export function getNumberOfButtons(deviceId: number): number;

export function getNumberOfButtons(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('numberOfButtons');
}
