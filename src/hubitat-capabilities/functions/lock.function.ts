/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Locks the device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param device A target device.
 */
export async function lock(device: HubitatDevice): Promise<void>;

/**
 * Locks the device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceId An ID of the target device.
 */
export async function lock(deviceId: number): Promise<void>;

/**
 * Locks the device.
 *
 * Capabilities:
 * - [Lock](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Lock)
 *
 * @param deviceOrId An ID of the target device or the device itself.
 */
export async function lock(deviceOrId: HubitatDevice | number): Promise<void>;

export async function lock(deviceOrId: HubitatDevice | number): Promise<void> {
  const device = getDevice(deviceOrId);
  const command = 'lock';
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command);
}
