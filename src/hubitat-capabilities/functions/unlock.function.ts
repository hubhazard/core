/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Unlocks the device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param device A target device.
 */
export async function unlock(device: HubitatDevice): Promise<void>;

/**
 * Unlocks the device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceId An ID of the target device.
 */
export async function unlock(deviceId: number): Promise<void>;

/**
 * Unlocks the device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceOrId An ID of the target device or the device itself.
 */
export async function unlock(deviceOrId: HubitatDevice | number): Promise<void>;

export async function unlock(deviceOrId: HubitatDevice | number): Promise<void> {
  const device = getDevice(deviceOrId);
  const command = 'unlock';
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command);
}
