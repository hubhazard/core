/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns current battery status (percentage).
 *
 * Capabilities:
 * - Battery
 *
 * @param device A target device.
 * @returns Returns current battery status.
 */
export function getBatteryStatus(device: HubitatDevice): number;

/**
 * Returns current battery status (percentage).
 *
 * Capabilities:
 * - Battery
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current battery status.
 */
export function getBatteryStatus(deviceId: number): number;

export function getBatteryStatus(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('battery');
}
