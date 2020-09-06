/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Sets the thermostat heating setpoint to a specified temperature.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatHeatingSetpoint
 *
 * @param device A target device.
 * @param temperature A temperature to set the heating setpoint to.
 */
export async function setHeatingSetpoint(device: HubitatDevice, temperature: number): Promise<void>;

/**
 * Sets the thermostat heating setpoint to a specified temperature.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatHeatingSetpoint
 *
 * @param deviceId An ID of the target device.
 * @param temperature A temperature to set the heating setpoint to.
 */
export async function setHeatingSetpoint(deviceId: number, temperature: number): Promise<void>;

export async function setHeatingSetpoint(deviceOrId: HubitatDevice | number, temperature: number): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setHeatingSetpoint', temperature);
}
