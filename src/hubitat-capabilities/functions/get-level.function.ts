/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns current switch level.
 *
 * Capabilities:
 * - MusicPlayer
 * - SwitchLevel
 *
 * @param device A target device.
 * @returns Returns current switch level.
 */
export function getLevel(device: HubitatDevice): number;

/**
 * Returns current switch level.
 *
 * Capabilities:
 * - MusicPlayer
 * - SwitchLevel
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current switch level.
 */
export function getLevel(deviceId: number): number;

export function getLevel(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsInt('level');
}
