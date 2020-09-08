/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Returns current thermostat schedule.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSchedule
 *
 * @param device A target device.
 * @returns Returns current thermostat schedule.
 */
export function getThermostatSchedule(device: HubitatDevice): Record<string, any>;

/**
 * Returns current thermostat schedule.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSchedule
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat schedule.
 */
export function getThermostatSchedule(deviceId: number): Record<string, any>;

export function getThermostatSchedule(deviceOrId: HubitatDevice | number): Record<string, any> {
  const scheduleString = getDevice(deviceOrId).getAttributeAsString('schedule') ?? '{}';
  return JSON.parse(scheduleString);
}
