/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Sets the thermostat cooling setpoint to a specified temperature.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatCoolingSetpoint
 *
 * @param device A target device.
 * @param temperature A temperature to set the cooling setpoint to.
 */
export async function setCoolingSetpoint(device: HubitatDevice, temperature: number): Promise<void>;

/**
 * Sets the thermostat cooling setpoint to a specified temperature.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatCoolingSetpoint
 *
 * @param deviceId An ID of the target device.
 * @param temperature A temperature to set the cooling setpoint to.
 */
export async function setCoolingSetpoint(deviceId: number, temperature: number): Promise<void>;

export async function setCoolingSetpoint(deviceOrId: HubitatDevice | number, temperature: number): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setCoolingSetpoint', temperature);
}
