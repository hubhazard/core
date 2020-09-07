/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns current thermostat heating setpoint.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatHeatingSetpoint
 *
 * @param device A target device.
 * @returns Returns current thermostat heating setpoint.
 */
export function getHeatingSetpoint(device: HubitatDevice): number;

/**
 * Returns current thermostat heating setpoint.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatHeatingSetpoint
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat heating setpoint.
 */
export function getHeatingSetpoint(deviceId: number): number;

export function getHeatingSetpoint(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('heatingSetpoint');
}
