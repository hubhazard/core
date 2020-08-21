import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns number of available buttons.
 */
export function getNumberOfButtons(device: HubitatDevice): number;

/**
 Returns number of available buttons.
 */
export function getNumberOfButtons(deviceId: number): number;

export function getNumberOfButtons(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('numberOfButtons');
}

/**
 Returns pressed button number.
 */
export function whichButtonIsPushed(device: HubitatDevice): number;

/**
 Returns pressed button number.
 */
export function whichButtonIsPushed(deviceId: number): number;

export function whichButtonIsPushed(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('pushed');
}
