/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatOperatingState, getDevice } from '..';

/**
 * Sets the operating mode of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatOperatingState
 *
 * @param device A target device.
 * @param mode An operating mode to set.
 */
export async function setThermostatOperatingState(
  device: HubitatDevice,
  mode: EThermostatOperatingState,
): Promise<void>;

/**
 * Sets the operating mode of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatOperatingState
 *
 * @param deviceId An ID of the target device.
 * @param mode An operating mode to set.
 */
export async function setThermostatOperatingState(deviceId: number, mode: EThermostatOperatingState): Promise<void>;

export async function setThermostatOperatingState(
  deviceOrId: HubitatDevice | number,
  mode: EThermostatOperatingState,
): Promise<void> {
  const command = 'setThermostatOperatingState';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, mode);
}
