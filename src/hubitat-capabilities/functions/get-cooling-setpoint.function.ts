/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Returns current thermostat cooling setpoint.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatCoolingSetpoint
 *
 * @param device A target device.
 * @returns Returns current thermostat cooling setpoint.
 */
export function getCoolingSetpoint(device: HubitatDevice): number;

/**
 * Returns current thermostat cooling setpoint.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatCoolingSetpoint
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat cooling setpoint.
 */
export function getCoolingSetpoint(deviceId: number): number;

export function getCoolingSetpoint(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('coolingSetpoint');
}
