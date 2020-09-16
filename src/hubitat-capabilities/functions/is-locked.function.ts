/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice, getLockStatus } from '..';

/**
 * Returns a value whether the device is locked.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param device A target device.
 * @returns `true` if the device is locked.
 */
export function isLocked(device: HubitatDevice): boolean;

/**
 * Returns a value whether the device is locked.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the device is locked.
 */
export function isLocked(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 * Returns a value whether the device is locked.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceId An ID of the target device.
 * @returns `true` if the device is locked.
 */
export function isLocked(deviceId: number): boolean;

/**
 * Returns a value whether the device is locked.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the device is locked.
 */
export function isLocked(deviceId: number, defaultValue: boolean): boolean;

export function isLocked(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const device = getDevice(deviceOrId);
  const status = getLockStatus(device);
  if (status == null) return defaultValue;
  return status === 'locked';
}
