import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns a value indicating if the motion was detected.
 */
export function isMotionDetected(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 Returns a value indicating if the motion was detected.
 */
export function isMotionDetected(deviceId: number, defaultValue: boolean): boolean;

export function isMotionDetected(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const status = getDevice(deviceOrId).getAttributeAsString('motion');
  if (status === 'active') return true;
  return status === 'inactive' ? false : defaultValue;
}
