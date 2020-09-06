/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatModes } from '..';
import { enumListToStringList, getDevice } from '../capabilities.helpers';

/**
 * Returns a list of modes supported by specified thermostat.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param device A target device.
 * @returns Returns a list of modes supported by specified thermostat.
 */
export function getSupportedThermostatModes(device: HubitatDevice): EThermostatModes[];

/**
 * Returns a list of modes supported by specified thermostat.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param deviceId An ID of the target device.
 * @returns Returns a list of modes supported by specified thermostat.
 */
export function getSupportedThermostatModes(deviceId: number): EThermostatModes[];

export function getSupportedThermostatModes(deviceOrId: HubitatDevice | number): EThermostatModes[] {
  const valueList = getDevice(deviceOrId).getAttributeAsString('supportedThermostatModes') ?? '[]';
  return enumListToStringList(valueList) as EThermostatModes[];
}
