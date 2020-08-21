import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Refreshed the device.
 */
export async function refresh(device: HubitatDevice): Promise<void>;

/**
 Refreshed the device.
 */
export async function refresh(deviceId: number): Promise<void>;

export async function refresh(deviceOrId: HubitatDevice | number): Promise<void> {
  await getDevice(deviceOrId).sendCommand('refresh');
}
