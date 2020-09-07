/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Sets the temperature measurement of a **virtual** temperature measurement device.
 *
 * Capabilities:
 * - TemperatureMeasurement
 * - Thermostat
 *
 * @param device A target device.
 * @param temperature A temperature to set.
 */
export async function setTemperature(device: HubitatDevice, temperature: number): Promise<void>;

/**
 * Sets the temperature measurement of a **virtual** temperature measurement device.
 *
 * Capabilities:
 * - TemperatureMeasurement
 * - Thermostat
 *
 * @param deviceId An ID of the target device.
 * @param temperature A temperature to set.
 */
export async function setTemperature(deviceId: number, temperature: number): Promise<void>;

export async function setTemperature(deviceOrId: HubitatDevice | number, temperature: number): Promise<void> {
  const command = 'setTemperature';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, temperature);
}
