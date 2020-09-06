/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatModes } from '..';
import { getDevice } from '../capabilities.helpers';

/**
 * Sets the thermostat mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatMode
 *
 * @param device A target device.
 * @param mode A mode to set.
 */
export async function setThermostatMode(device: HubitatDevice, mode: EThermostatModes): Promise<void>;

/**
 * Sets the thermostat mode.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatMode
 *
 * @param deviceId An ID of the target device.
 * @param mode A mode to set.
 */
export async function setThermostatMode(deviceId: number, mode: EThermostatModes): Promise<void>;

export async function setThermostatMode(deviceOrId: HubitatDevice | number, mode: EThermostatModes): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setThermostatMode', mode);
}
