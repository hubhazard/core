/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

/**
 * Returns the last temperature measurement.
 *
 * @param device A target device.
 * @returns Returns the last temperature measurement.
 * @category TemperatureMeasurement capability
 */
export function getTemperature(device: HubitatDevice): number;

/**
 * Returns the last temperature measurement.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns the last temperature measurement.
 * @category TemperatureMeasurement capability
 */
export function getTemperature(deviceId: number): number;

export function getTemperature(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('temperature');
}

/**
 * Sets the temperature measurement of a **virtual** temperature measurement device.
 *
 * @param device A target device.
 * @param temperature A temperature to set.
 * @category TemperatureMeasurement capability
 */
export async function setTemperature(device: HubitatDevice, temperature: number): Promise<void>;

/**
 * Sets the temperature measurement of a **virtual** temperature measurement device.
 *
 * @param deviceId An ID of the target device.
 * @param temperature A temperature to set.
 * @category TemperatureMeasurement capability
 */
export async function setTemperature(deviceId: number, temperature: number): Promise<void>;

export async function setTemperature(deviceOrId: HubitatDevice | number, temperature: number): Promise<void> {
  const command = 'setTemperature';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, temperature);
}
