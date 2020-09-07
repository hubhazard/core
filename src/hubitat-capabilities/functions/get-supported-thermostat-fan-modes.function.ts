/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { enumListToStringList, EThermostatFanModes, getDevice } from '..';

/**
 * Returns a list of fan modes supported by specified thermostat.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param device A target device.
 * @returns Returns a list of fan modes supported by specified thermostat.
 */
export function getSupportedThermostatFanModes(device: HubitatDevice): EThermostatFanModes[];

/**
 * Returns a list of fan modes supported by specified thermostat.
 *
 * Capabilities:
 * - Thermostat
 *
 * @param deviceId An ID of the target device.
 * @returns Returns a list of fan modes supported by specified thermostat.
 */
export function getSupportedThermostatFanModes(deviceId: number): EThermostatFanModes[];

export function getSupportedThermostatFanModes(deviceOrId: HubitatDevice | number): EThermostatFanModes[] {
  const valueList = getDevice(deviceOrId).getAttributeAsString('supportedThermostatFanModes') ?? '[]';
  return enumListToStringList(valueList) as EThermostatFanModes[];
}
