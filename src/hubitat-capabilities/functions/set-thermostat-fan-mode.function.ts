/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatFanModes, getDevice } from '..';

/**
 * Sets the thermostat fan mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatFanMode
 *
 * @param device A target device.
 * @param mode A fan mode to set.
 */
export async function setThermostatFanMode(device: HubitatDevice, mode: EThermostatFanModes): Promise<void>;

/**
 * Sets the thermostat fan mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatFanMode
 *
 * @param deviceId An ID of the target device.
 * @param mode A fan mode to set.
 */
export async function setThermostatFanMode(deviceId: number, mode: EThermostatFanModes): Promise<void>;

export async function setThermostatFanMode(
  deviceOrId: HubitatDevice | number,
  mode: EThermostatFanModes,
): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setThermostatFanMode', mode);
}
