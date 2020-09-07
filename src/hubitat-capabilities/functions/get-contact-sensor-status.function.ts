/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EOpenStatus, getDevice } from '..';

/**
 * Returns current contact sensor status.
 *
 * Capabilities:
 * - ContactSensor
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns A status of the contact sensor or the default value.
 */
export function getContactSensorStatus(device: HubitatDevice, defaultValue: EOpenStatus): EOpenStatus;

/**
 * Returns current contact sensor status.
 *
 * Capabilities:
 * - ContactSensor
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns A status of the contact sensor or the default value.
 */
export function getContactSensorStatus(deviceId: number, defaultValue: EOpenStatus): EOpenStatus;

export function getContactSensorStatus(
  deviceOrId: HubitatDevice | number,
  defaultValue: EOpenStatus = 'closed',
): EOpenStatus {
  const contact = getDevice(deviceOrId).getAttributeAsString('contact');
  if (contact === 'closed' || contact === 'open') return contact;
  return defaultValue;
}
