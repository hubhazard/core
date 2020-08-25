/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns current contact sensor status.
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns A status of the contact sensor or the default value.
 * @category ContactSensor capability
 */
export function getContactSensorStatus(device: HubitatDevice, defaultValue: 'closed' | 'open'): 'closed' | 'open';

/**
 * Returns current contact sensor status.
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns A status of the contact sensor or the default value.
 * @category ContactSensor capability
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
 * Returns a value whether the contact sensor is open.
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the sensor is open; `false` if sensor is closed.
 * @category ContactSensor capability
 */
export function isContactOpen(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 * Returns a value whether the contact sensor is open.
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the sensor is open; `false` if sensor is closed.
 * @category ContactSensor capability
 */
export function isContactOpen(deviceId: number, defaultValue: boolean): boolean;

export function isContactOpen(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const status = getContactSensorStatus(getDevice(deviceOrId), defaultValue ? 'open' : 'closed');
  return status === 'open';
}
