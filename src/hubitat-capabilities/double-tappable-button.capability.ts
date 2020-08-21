import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns double-pressed button number.
 */
export function whichButtonIsDoubleTapped(device: HubitatDevice): number;

/**
 Returns double-pressed button number.
 */
export function whichButtonIsDoubleTapped(deviceId: number): number;

export function whichButtonIsDoubleTapped(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('doubleTapped');
}
