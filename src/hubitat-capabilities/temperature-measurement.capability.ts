/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns current temperature.
 */
export function getTemperature(device: HubitatDevice): number;

/**
 Returns current temperature.
 */
export function getTemperature(deviceId: number): number;

export function getTemperature(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('temperature');
}
