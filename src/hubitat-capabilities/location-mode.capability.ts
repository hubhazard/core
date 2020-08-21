import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns current location mode name.
 */
export function getLocationMode(device: HubitatDevice): string | undefined;

/**
 Returns current location mode name.
 */
export function getLocationMode(deviceId: number): string | undefined;

export function getLocationMode(deviceOrId: HubitatDevice | number): string | undefined {
  return getDevice(deviceOrId).getAttributeAsString('mode');
}
