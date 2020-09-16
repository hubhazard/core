/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { ELockStatus, getDevice } from '..';

/**
 * Returns current status of the lock device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param device A target device.
 * @returns Returns current status of the lock device.
 */
export function getLockStatus(device: HubitatDevice): ELockStatus;

/**
 * Returns current status of the lock device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current status of the lock device.
 */
export function getLockStatus(deviceId: number): ELockStatus;

export function getLockStatus(deviceOrId: HubitatDevice | number): ELockStatus;

export function getLockStatus(deviceOrId: HubitatDevice | number): ELockStatus {
  return getDevice(deviceOrId).getAttributeAsString('lock') as ELockStatus;
}
