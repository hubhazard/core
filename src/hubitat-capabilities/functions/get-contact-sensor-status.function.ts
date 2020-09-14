/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EOpenClosedPosition, getDevice } from '..';

/**
 * Returns current contact sensor status.
 *
 * Capabilities:
 * - [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns A status of the contact sensor or the default value.
 */
export function getContactSensorStatus(device: HubitatDevice, defaultValue: EOpenClosedPosition): EOpenClosedPosition;

/**
 * Returns current contact sensor status.
 *
 * Capabilities:
 * - [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns A status of the contact sensor or the default value.
 */
export function getContactSensorStatus(deviceId: number, defaultValue: EOpenClosedPosition): EOpenClosedPosition;

export function getContactSensorStatus(
  deviceOrId: HubitatDevice | number,
  defaultValue: EOpenClosedPosition = 'closed',
): EOpenClosedPosition {
  const contact = getDevice(deviceOrId).getAttributeAsString('contact');
  if (contact === 'closed' || contact === 'open') return contact;
  return defaultValue;
}
