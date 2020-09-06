/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';
import { ECapability } from '../../hubitat-device-events/capability.enum';
import { getContactSensorStatus } from './get-contact-sensor-status.function';

/**
 * Returns a value whether the sensor is open.
 *
 * Capabilities:
 * - ContactSensor
 *
 * @param device A target device.
 * @returns `true` if the sensor is open; `false` if sensor is closed or
 * encountered an error.
 */
export function isOpen(device: HubitatDevice): boolean;

/**
 * Returns a value whether the sensor is open.
 *
 * Capabilities:
 * - ContactSensor
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the sensor is open; `false` if sensor is closed.
 */
export function isOpen(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 * Returns a value whether the sensor is open.
 *
 * Capabilities:
 * - ContactSensor
 *
 * @param deviceId An ID of the target device.
 * @returns `true` if the sensor is open; `false` if sensor is closed.
 */
export function isOpen(deviceId: number): boolean;

/**
 * Returns a value whether the sensor is open.
 *
 * Capabilities:
 * - ContactSensor
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the sensor is open; `false` if sensor is closed or
 * encountered an error.
 */
export function isOpen(deviceId: number, defaultValue: boolean): boolean;

export function isOpen(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const device = getDevice(deviceOrId);

  if (device.hasCapability(ECapability.ContactSensor)) {
    const status = getContactSensorStatus(device, defaultValue ? 'open' : 'closed');
    return status === 'open';
  }

  return defaultValue;
}
