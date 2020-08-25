/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns the last temperature measurement.
 *
 * @param device A target device.
 * @returns Returns the last temperature measurement.
 * @category TemperatureMeasurement capability
 */
export function getTemperature(device: HubitatDevice): number;

/**
 * Returns the last temperature measurement.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns the last temperature measurement.
 * @category TemperatureMeasurement capability
 */
export function getTemperature(deviceId: number): number;

export function getTemperature(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('temperature');
}
