/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatModes } from '..';
import { getDevice } from '../capabilities.helpers';

/**
 * Sets the supported modes of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param device A target device.
 * @param modes A list of supported modes to set.
 */
export async function setSupportedThermostatModes(device: HubitatDevice, modes: EThermostatModes[]): Promise<void>;

/**
 * Sets the supported modes of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param deviceId An ID of the target device.
 * @param modes A list of supported modes to set.
 */
export async function setSupportedThermostatModes(deviceId: number, modes: EThermostatModes[]): Promise<void>;

export async function setSupportedThermostatModes(
  deviceOrId: HubitatDevice | number,
  modes: EThermostatModes[],
): Promise<void> {
  const command = 'setSupportedThermostatModes';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, JSON.stringify(modes));
}
