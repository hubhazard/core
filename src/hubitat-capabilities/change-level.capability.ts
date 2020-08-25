/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Starts the level change in a specified direction.
 *
 * @param device A target device.
 * @param direction A direction of the level change.
 * @category ChangeLevel capability
 */
export async function startLevelChange(device: HubitatDevice, direction: 'up' | 'down'): Promise<void>;

/**
 * Starts the level change in a specified direction.
 *
 * @param deviceId An ID of the target device.
 * @param direction A direction of the level change.
 * @category ChangeLevel capability
 */
export async function startLevelChange(deviceId: number, direction: 'up' | 'down'): Promise<void>;

export async function startLevelChange(deviceOrId: HubitatDevice | number, direction: 'up' | 'down'): Promise<void> {
  await getDevice(deviceOrId).sendCommand('startLevelChange', direction);
}

/**
 * Stop the level change.
 *
 * @param device A target device.
 * @category ChangeLevel capability
 */
export async function stopLevelChange(device: HubitatDevice): Promise<void>;

/**
 * Stop the level change.
 *
 * @param deviceId An ID of the target device.
 * @category ChangeLevel capability
 */
export async function stopLevelChange(deviceId: number): Promise<void>;

export async function stopLevelChange(deviceOrId: HubitatDevice | number): Promise<void> {
  await getDevice(deviceOrId).sendCommand('stopLevelChange');
}
