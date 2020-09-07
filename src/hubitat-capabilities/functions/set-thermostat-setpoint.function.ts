/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Sets the setpoint of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSetpoint
 *
 * @param device A target device.
 * @param temperature A temperature to set the setpoint to.
 */
export async function setThermostatSetpoint(device: HubitatDevice, temperature: number): Promise<void>;

/**
 * Sets the setpoint of a **virtual** thermostat device.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSetpoint
 *
 * @param deviceId An ID of the target device.
 * @param temperature A temperature to set the setpoint to.
 */
export async function setThermostatSetpoint(deviceId: number, temperature: number): Promise<void>;

export async function setThermostatSetpoint(deviceOrId: HubitatDevice | number, temperature: number): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setThermostatSetpoint', temperature);
}
