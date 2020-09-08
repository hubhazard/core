/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatOperatingState, getDevice } from '..';

/**
 * Returns current operating state of the thermostat.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatOperatingState
 *
 * @param device A target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current operating state of the thermostat.
 */
export function getThermostatOperatingState(
  device: HubitatDevice,
  defaultValue: EThermostatOperatingState,
): EThermostatOperatingState;

/**
 * Returns current operating state of the thermostat.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatOperatingState
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current operating state of the thermostat.
 */
export function getThermostatOperatingState(
  deviceId: number,
  defaultValue: EThermostatOperatingState,
): EThermostatOperatingState;

export function getThermostatOperatingState(
  deviceOrId: HubitatDevice | number,
  defaultValue: EThermostatOperatingState = 'idle',
): EThermostatOperatingState {
  const operatingState = getDevice(deviceOrId).getAttributeAsString('thermostatOperatingState') ?? defaultValue;
  return operatingState as EThermostatOperatingState;
}
