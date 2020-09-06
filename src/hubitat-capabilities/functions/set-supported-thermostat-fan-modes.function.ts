/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EThermostatFanModes } from '..';
import { getDevice } from '../capabilities.helpers';

/**
 * Sets the supported fan modes of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param device A target device.
 * @param modes A list of supported fan modes to set.
 */
export async function setSupportedThermostatFanModes(
  device: HubitatDevice,
  modes: EThermostatFanModes[],
): Promise<void>;

/**
 * Sets the supported fan modes of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param deviceId An ID of the target device.
 * @param modes A list of supported fan modes to set.
 */
export async function setSupportedThermostatFanModes(deviceId: number, modes: EThermostatFanModes[]): Promise<void>;

export async function setSupportedThermostatFanModes(
  deviceOrId: HubitatDevice | number,
  modes: EThermostatFanModes[],
): Promise<void> {
  const command = 'setSupportedThermostatFanModes';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, JSON.stringify(modes));
}
