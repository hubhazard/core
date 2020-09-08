/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Refreshes the device.
 *
 * Capabilities:
 * - Refresh
 *
 * @param device A target device.
 */
export async function refresh(device: HubitatDevice): Promise<void>;

/**
 * Refreshes the device.
 *
 * Capabilities:
 * - Refresh
 *
 * @param deviceId An ID of the target device.
 */
export async function refresh(deviceId: number): Promise<void>;

export async function refresh(deviceOrId: HubitatDevice | number): Promise<void> {
  await getDevice(deviceOrId).sendCommand('refresh');
}
