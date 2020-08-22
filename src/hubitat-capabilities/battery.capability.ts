/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 Returns current battery status.
 */
export function getBatteryStatus(device: HubitatDevice): number;

/**
 Returns current battery status.
 */
export function getBatteryStatus(deviceId: number): number;

export function getBatteryStatus(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('battery');
}
