import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns current contact sensor status.
 */
export function getContactSensorStatus(device: HubitatDevice, defaultValue: 'closed' | 'open'): 'closed' | 'open';

/**
 Returns current contact sensor status.
 */
export function getContactSensorStatus(deviceId: number, defaultValue: 'closed' | 'open'): 'closed' | 'open';

export function getContactSensorStatus(
  deviceOrId: HubitatDevice | number,
  defaultValue: 'closed' | 'open' = 'closed',
): 'closed' | 'open' {
  const contact = getDevice(deviceOrId).getAttributeAsString('contact');
  if (contact === 'closed' || contact === 'open') return contact;
  return defaultValue;
}

/**
 Returns current switch status. True is 'on', false is 'off'.
 */
export function isContactOpen(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 Returns current switch status. True is 'on', false is 'off'.
 */
export function isContactOpen(deviceId: number, defaultValue: boolean): boolean;

export function isContactOpen(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const status = getContactSensorStatus(getDevice(deviceOrId), defaultValue ? 'open' : 'closed');
  return status === 'open';
}
