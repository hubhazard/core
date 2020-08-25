/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Refreshes the device.
 *
 * @param device A target device.
 * @category Refresh capability
 */
export async function refresh(device: HubitatDevice): Promise<void>;

/**
 * Refreshes the device.
 *
 * @param deviceId An ID of the target device.
 * @category Refresh capability
 */
export async function refresh(deviceId: number): Promise<void>;

export async function refresh(deviceOrId: HubitatDevice | number): Promise<void> {
  await getDevice(deviceOrId).sendCommand('refresh');
}
