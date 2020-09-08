/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Stop the level change.
 *
 * Capabilities:
 * - ChangeLevel
 *
 * @param device A target device.
 */
export async function stopLevelChange(device: HubitatDevice): Promise<void>;

/**
 * Stop the level change.
 *
 * Capabilities:
 * - ChangeLevel
 *
 * @param deviceId An ID of the target device.
 */
export async function stopLevelChange(deviceId: number): Promise<void>;

export async function stopLevelChange(deviceOrId: HubitatDevice | number): Promise<void> {
  await getDevice(deviceOrId).sendCommand('stopLevelChange');
}
