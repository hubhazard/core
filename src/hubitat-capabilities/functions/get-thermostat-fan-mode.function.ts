/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatFanModes, getDevice } from '..';

/**
 * Returns current thermostat fan mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatFanMode
 *
 * @param device A target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat fan mode.
 */
export function getThermostatFanMode(device: HubitatDevice, defaultValue: EThermostatFanModes): EThermostatFanModes;

/**
 * Returns current thermostat fan mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatFanMode
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat fan mode.
 */
export function getThermostatFanMode(deviceId: number, defaultValue: EThermostatFanModes): EThermostatFanModes;

export function getThermostatFanMode(
  deviceOrId: HubitatDevice | number,
  defaultValue: EThermostatFanModes = 'auto',
): EThermostatFanModes {
  const fanMode = getDevice(deviceOrId).getAttributeAsString('thermostatFanMode') ?? defaultValue;
  return fanMode as EThermostatFanModes;
}
