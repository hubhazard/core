/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns the last temperature measurement.
 *
 * Capabilities:
 * - TemperatureMeasurement
 * - Thermostat
 *
 * @param device A target device.
 * @returns Returns the last temperature measurement.
 */
export function getTemperature(device: HubitatDevice): number;

/**
 * Returns the last temperature measurement.
 *
 * Capabilities:
 * - TemperatureMeasurement
 * - Thermostat
 *
 * @param deviceId An ID of the target device.
 * @returns Returns the last temperature measurement.
 */
export function getTemperature(deviceId: number): number;

export function getTemperature(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('temperature');
}
