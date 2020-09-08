/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatModes, getDevice } from '..';

/**
 * Returns current thermostat mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatMode
 *
 * @param device A target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat mode.
 */
export function getThermostatMode(device: HubitatDevice, defaultValue: EThermostatModes): EThermostatModes;

/**
 * Returns current thermostat mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatMode
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat mode.
 */
export function getThermostatMode(deviceId: number, defaultValue: EThermostatModes): EThermostatModes;

export function getThermostatMode(
  deviceOrId: HubitatDevice | number,
  defaultValue: EThermostatModes = 'auto',
): EThermostatModes {
  const fanMode = getDevice(deviceOrId).getAttributeAsString('thermostatMode') ?? defaultValue;
  return fanMode as EThermostatModes;
}
