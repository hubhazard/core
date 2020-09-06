/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { ELevelChangeDirection } from '..';
import { getDevice } from '../capabilities.helpers';

/**
 * Starts the level change in a specified direction.
 *
 * Capabilities:
 * - ChangeLevel
 *
 * @param device A target device.
 * @param direction A direction of the level change
 */
export async function startLevelChange(device: HubitatDevice, direction: ELevelChangeDirection): Promise<void>;

/**
 * Starts the level change in a specified direction.
 *
 * Capabilities:
 * - ChangeLevel
 *
 * @param deviceId An ID of the target device.
 * @param direction A direction of the level change.
 */
export async function startLevelChange(deviceId: number, direction: ELevelChangeDirection): Promise<void>;

export async function startLevelChange(
  deviceOrId: HubitatDevice | number,
  direction: ELevelChangeDirection,
): Promise<void> {
  await getDevice(deviceOrId).sendCommand('startLevelChange', direction);
}
