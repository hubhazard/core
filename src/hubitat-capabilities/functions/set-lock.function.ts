/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { lock, unlock } from '..';

/**
 * Sets the lock to a specified value.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param device A target device.
 * @param setting A setting to set the lock to.
 */
export async function setLock(device: HubitatDevice, setting: 'lock' | 'unlock'): Promise<void>;

/**
 * Sets the lock to a specified value.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceId An ID of the target device.
 * @param setting A setting to set the lock to.
 */
export async function setLock(deviceId: number, setting: 'lock' | 'unlock'): Promise<void>;

/**
 * Sets the lock to a specified value.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceOrId An ID of the target device or the device itself.
 * @param setting A setting to set the lock to.
 */
export async function setLock(deviceOrId: HubitatDevice | number, setting: 'lock' | 'unlock'): Promise<void>;

export async function setLock(deviceOrId: HubitatDevice | number, setting: 'lock' | 'unlock'): Promise<void> {
  if (setting === 'lock') await lock(deviceOrId);
  else await unlock(deviceOrId);
}
