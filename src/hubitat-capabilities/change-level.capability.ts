/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Start the level change in specified direction.
 */
export async function startLevelChange(device: HubitatDevice, direction: 'up' | 'down'): Promise<void>;

/**
 Start the level change in specified direction.
 */
export async function startLevelChange(deviceId: number, direction: 'up' | 'down'): Promise<void>;

export async function startLevelChange(deviceOrId: HubitatDevice | number, direction: 'up' | 'down'): Promise<void> {
  await getDevice(deviceOrId).sendCommand('startLevelChange', direction);
}

/**
 Stop the level change.
 */
export async function stopLevelChange(device: HubitatDevice): Promise<void>;

/**
 Stop the level change.
 */
export async function stopLevelChange(deviceId: number): Promise<void>;

export async function stopLevelChange(deviceOrId: HubitatDevice | number): Promise<void> {
  await getDevice(deviceOrId).sendCommand('stopLevelChange');
}
