/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns current battery status (percentage).
 *
 * @param device A target device.
 * @returns Returns current battery status.
 * @category Battery capability
 */
export function getBatteryStatus(device: HubitatDevice): number;

/**
 * Returns current battery status (percentage).
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current battery status.
 * @category Battery capability
 */
export function getBatteryStatus(deviceId: number): number;

export function getBatteryStatus(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('battery');
}
