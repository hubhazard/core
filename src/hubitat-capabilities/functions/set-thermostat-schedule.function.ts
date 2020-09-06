/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '../capabilities.helpers';

/**
 * Sets the thermostat schedule.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSchedule
 *
 * @param device A target device.
 * @param schedule A schedule data.
 */
export async function setThermostatSchedule(device: HubitatDevice, schedule: Record<string, any>): Promise<void>;

/**
 * Sets the thermostat schedule.
 *
 * Capabilities:
 * - Thermostat
 * - ThermostatSchedule
 *
 * @param deviceId An ID of the target device.
 * @param schedule A schedule data.
 */
export async function setThermostatSchedule(deviceId: number, schedule: Record<string, any>): Promise<void>;

export async function setThermostatSchedule(
  deviceOrId: HubitatDevice | number,
  schedule: Record<string, any>,
): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setSchedule', JSON.stringify(schedule));
}
