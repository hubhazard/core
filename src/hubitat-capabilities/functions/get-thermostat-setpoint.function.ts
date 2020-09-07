/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns current thermostat setpoint.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSetpoint
 *
 * @param device A target device.
 * @returns Returns current thermostat setpoint.
 */
export function getThermostatSetpoint(device: HubitatDevice): number;

/**
 * Returns current thermostat setpoint.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSetpoint
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat setpoint.
 */
export function getThermostatSetpoint(deviceId: number): number;

export function getThermostatSetpoint(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('thermostatSetpoint');
}
