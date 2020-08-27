/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { enumListToStringList, getDevice } from './capabilities.helpers';

export { getTemperature as getThermostatTemperature } from './temperature-measurement.capability';

export type EThermostatFanMode = 'on' | 'circulate' | 'auto';
export type EThermostatMode = 'auto' | 'off' | 'heat' | 'emergency heat' | 'cool';
export type EThermostatOperatingState =
  'heating' | 'pending cool' | 'pending heat' | 'vent economizer' | 'idle' | 'cooling' | 'fan only';

/* ==========================================
 *     Cooling setpoint
 * ========================================== */

/**
 * Returns current thermostat cooling setpoint.
 *
 * @param device A target device.
 * @returns Returns current thermostat cooling setpoint.
 * @category Thermostat capability
 */
export function getCoolingSetpoint(device: HubitatDevice): number;

/**
 * Returns current thermostat cooling setpoint.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat cooling setpoint.
 * @category Thermostat capability
 */
export function getCoolingSetpoint(deviceId: number): number;

export function getCoolingSetpoint(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('coolingSetpoint');
}

/**
 * Sets the thermostat cooling setpoint to a specified temperature.
 *
 * @param device A target device.
 * @param temperature A temperature to set the cooling setpoint to.
 * @category Thermostat capability
 */
export async function setCoolingSetpoint(device: HubitatDevice, temperature: number): Promise<void>;

/**
 * Sets the thermostat cooling setpoint to a specified temperature.
 *
 * @param deviceId An ID of the target device.
 * @param temperature A temperature to set the cooling setpoint to.
 * @category Thermostat capability
 */
export async function setCoolingSetpoint(deviceId: number, temperature: number): Promise<void>;

export async function setCoolingSetpoint(deviceOrId: HubitatDevice | number, temperature: number): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setCoolingSetpoint', temperature);
}

/* ==========================================
 *     Heating setpoint
 * ========================================== */

/**
 * Returns current thermostat heating setpoint.
 *
 * @param device A target device.
 * @returns Returns current thermostat heating setpoint.
 * @category Thermostat capability
 */
export function getHeatingSetpoint(device: HubitatDevice): number;

/**
 * Returns current thermostat heating setpoint.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat heating setpoint.
 * @category Thermostat capability
 */
export function getHeatingSetpoint(deviceId: number): number;

export function getHeatingSetpoint(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('heatingSetpoint');
}

/**
 * Sets the thermostat heating setpoint to a specified temperature.
 *
 * @param device A target device.
 * @param temperature A temperature to set the heating setpoint to.
 * @category Thermostat capability
 */
export async function setHeatingSetpoint(device: HubitatDevice, temperature: number): Promise<void>;

/**
 * Sets the thermostat heating setpoint to a specified temperature.
 *
 * @param deviceId An ID of the target device.
 * @param temperature A temperature to set the heating setpoint to.
 * @category Thermostat capability
 */
export async function setHeatingSetpoint(deviceId: number, temperature: number): Promise<void>;

export async function setHeatingSetpoint(deviceOrId: HubitatDevice | number, temperature: number): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setHeatingSetpoint', temperature);
}

/* ==========================================
 *     Schedule
 * ========================================== */

/**
 * Returns current thermostat schedule.
 *
 * @param device A target device.
 * @returns Returns current thermostat schedule.
 * @category Thermostat capability
 */
export function getThermostatSchedule(device: HubitatDevice): Record<string, any>;

/**
 * Returns current thermostat schedule.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat schedule.
 * @category Thermostat capability
 */
export function getThermostatSchedule(deviceId: number): Record<string, any>;

export function getThermostatSchedule(deviceOrId: HubitatDevice | number): Record<string, any> {
  const scheduleString = getDevice(deviceOrId).getAttributeAsString('schedule') ?? '{}';
  return JSON.parse(scheduleString);
}

/**
 * Sets the thermostat schedule.
 *
 * @param device A target device.
 * @param schedule A schedule data.
 * @category Thermostat capability
 */
export async function setThermostatSchedule(device: HubitatDevice, schedule: Record<string, any>): Promise<void>;

/**
 * Sets the thermostat schedule.
 *
 * @param deviceId An ID of the target device.
 * @param schedule A schedule data.
 * @category Thermostat capability
 */
export async function setThermostatSchedule(deviceId: number, schedule: Record<string, any>): Promise<void>;

export async function setThermostatSchedule(deviceOrId: HubitatDevice | number, schedule: Record<string, any>): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setSchedule', JSON.stringify(schedule));
}

/* ==========================================
 *     Thermostat supported fan modes
 * ========================================== */

/**
 * Returns a list of fan modes supported by specified thermostat.
 *
 * @param device A target device.
 * @returns Returns a list of fan modes supported by specified thermostat.
 * @category Thermostat capability
 */
export function getSupportedThermostatFanModes(device: HubitatDevice): EThermostatFanMode[];

/**
 * Returns a list of fan modes supported by specified thermostat.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns a list of fan modes supported by specified thermostat.
 * @category Thermostat capability
 */
export function getSupportedThermostatFanModes(deviceId: number): EThermostatFanMode[];

export function getSupportedThermostatFanModes(deviceOrId: HubitatDevice | number): EThermostatFanMode[] {
  const valueList = getDevice(deviceOrId).getAttributeAsString('supportedThermostatFanModes') ?? '[]';
  return enumListToStringList(valueList) as EThermostatFanMode[];
}

/**
 * Sets the supported fan modes of a **virtual** thermostat device.
 *
 * @param device A target device.
 * @param modes A list of supported fan modes to set.
 * @category Thermostat capability
 */
export async function setSupportedThermostatFanModes(device: HubitatDevice, modes: EThermostatFanMode[]): Promise<void>;

/**
 * Sets the supported fan modes of a **virtual** thermostat device.
 *
 * @param deviceId An ID of the target device.
 * @param modes A list of supported fan modes to set.
 * @category Thermostat capability
 */
export async function setSupportedThermostatFanModes(deviceId: number, modes: EThermostatFanMode[]): Promise<void>;

export async function setSupportedThermostatFanModes(deviceOrId: HubitatDevice | number, modes: EThermostatFanMode[]): Promise<void> {
  const command = 'setSupportedThermostatFanModes';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, JSON.stringify(modes));
}

/* ==========================================
 *     Thermostat supported modes
 * ========================================== */

/**
 * Returns a list of modes supported by specified thermostat.
 *
 * @param device A target device.
 * @returns Returns a list of modes supported by specified thermostat.
 * @category Thermostat capability
 */
export function getSupportedThermostatModes(device: HubitatDevice): EThermostatMode[];

/**
 * Returns a list of modes supported by specified thermostat.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns a list of modes supported by specified thermostat.
 * @category Thermostat capability
 */
export function getSupportedThermostatModes(deviceId: number): EThermostatMode[];

export function getSupportedThermostatModes(deviceOrId: HubitatDevice | number): EThermostatMode[] {
  const valueList = getDevice(deviceOrId).getAttributeAsString('supportedThermostatModes') ?? '[]';
  return enumListToStringList(valueList) as EThermostatMode[];
}

/**
 * Sets the supported modes of a **virtual** thermostat device.
 *
 * @param device A target device.
 * @param modes A list of supported modes to set.
 * @category Thermostat capability
 */
export async function setSupportedThermostatModes(device: HubitatDevice, modes: EThermostatMode[]): Promise<void>;

/**
 * Sets the supported modes of a **virtual** thermostat device.
 *
 * @param deviceId An ID of the target device.
 * @param modes A list of supported modes to set.
 * @category Thermostat capability
 */
export async function setSupportedThermostatModes(deviceId: number, modes: EThermostatMode[]): Promise<void>;

export async function setSupportedThermostatModes(deviceOrId: HubitatDevice | number, modes: EThermostatMode[]): Promise<void> {
  const command = 'setSupportedThermostatModes';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, JSON.stringify(modes));
}

/* ==========================================
 *     Thermostat fan mode
 * ========================================== */

/**
 * Returns current thermostat fan mode.
 *
 * @param device A target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat fan mode.
 * @category Thermostat capability
 */
export function getThermostatFanMode(device: HubitatDevice, defaultValue: EThermostatFanMode): EThermostatFanMode;

/**
 * Returns current thermostat fan mode.
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat fan mode.
 * @category Thermostat capability
 */
export function getThermostatFanMode(deviceId: number, defaultValue: EThermostatFanMode): EThermostatFanMode;

export function getThermostatFanMode(deviceOrId: HubitatDevice | number, defaultValue: EThermostatFanMode = 'auto'): EThermostatFanMode {
  const fanMode = getDevice(deviceOrId).getAttributeAsString('thermostatFanMode') ?? defaultValue;
  return fanMode as EThermostatFanMode;
}

/**
 * Sets the thermostat fan mode.
 *
 * @param device A target device.
 * @param mode A fan mode to set.
 * @category Thermostat capability
 */
export async function setThermostatFanMode(device: HubitatDevice, mode: EThermostatFanMode): Promise<void>;

/**
 * Sets the thermostat fan mode.
 *
 * @param deviceId An ID of the target device.
 * @param mode A fan mode to set.
 * @category Thermostat capability
 */
export async function setThermostatFanMode(deviceId: number, mode: EThermostatFanMode): Promise<void>;

export async function setThermostatFanMode(deviceOrId: HubitatDevice | number, mode: EThermostatFanMode): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setThermostatFanMode', mode);
}

/* ==========================================
 *     Thermostat mode
 * ========================================== */

/**
 * Returns current thermostat mode.
 *
 * @param device A target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat mode.
 * @category Thermostat capability
 */
export function getThermostatMode(device: HubitatDevice, defaultValue: EThermostatMode): EThermostatMode;

/**
 * Returns current thermostat mode.
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current thermostat mode.
 * @category Thermostat capability
 */
export function getThermostatMode(deviceId: number, defaultValue: EThermostatMode): EThermostatMode;

export function getThermostatMode(deviceOrId: HubitatDevice | number, defaultValue: EThermostatMode = 'auto'): EThermostatMode {
  const fanMode = getDevice(deviceOrId).getAttributeAsString('thermostatMode') ?? defaultValue;
  return fanMode as EThermostatMode;
}

/**
 * Sets the thermostat mode.
 *
 * @param device A target device.
 * @param mode A mode to set.
 * @category Thermostat capability
 */
export async function setThermostatMode(device: HubitatDevice, mode: EThermostatMode): Promise<void>;

/**
 * Sets the thermostat mode.
 *
 * @param deviceId An ID of the target device.
 * @param mode A mode to set.
 * @category Thermostat capability
 */
export async function setThermostatMode(deviceId: number, mode: EThermostatMode): Promise<void>;

export async function setThermostatMode(deviceOrId: HubitatDevice | number, mode: EThermostatMode): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setThermostatMode', mode);
}

/* ==========================================
 *     Thermostat operating state
 * ========================================== */

/**
 * Returns current operating state of the thermostat.
 *
 * @param device A target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current operating state of the thermostat.
 * @category Thermostat capability
 */
export function getThermostatOperatingState(device: HubitatDevice, defaultValue: EThermostatOperatingState): EThermostatOperatingState;

/**
 * Returns current operating state of the thermostat.
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case of invalid value returned by Hubitat.
 * @returns Returns current operating state of the thermostat.
 * @category Thermostat capability
 */
export function getThermostatOperatingState(deviceId: number, defaultValue: EThermostatOperatingState): EThermostatOperatingState;

export function getThermostatOperatingState(deviceOrId: HubitatDevice | number, defaultValue: EThermostatOperatingState = 'idle'): EThermostatOperatingState {
  const operatingState = getDevice(deviceOrId).getAttributeAsString('thermostatOperatingState') ?? defaultValue;
  return operatingState as EThermostatOperatingState;
}

/**
 * Sets the operating mode of a **virtual** thermostat device.
 *
 * @param device A target device.
 * @param mode An operating mode to set.
 * @category Thermostat capability
 */
export async function setThermostatOperatingState(device: HubitatDevice, mode: EThermostatOperatingState): Promise<void>;

/**
 * Sets the operating mode of a **virtual** thermostat device.
 *
 * @param deviceId An ID of the target device.
 * @param mode An operating mode to set.
 * @category Thermostat capability
 */
export async function setThermostatOperatingState(deviceId: number, mode: EThermostatOperatingState): Promise<void>;

export async function setThermostatOperatingState(deviceOrId: HubitatDevice | number, mode: EThermostatOperatingState): Promise<void> {
  const command = 'setThermostatOperatingState';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, mode);
}

/* ==========================================
 *     Thermostat Setpoint
 * ========================================== */

/**
 * Returns current thermostat setpoint.
 *
 * @param device A target device.
 * @returns Returns current thermostat setpoint.
 * @category Thermostat capability
 */
export function getThermostatSetpoint(device: HubitatDevice): number;

/**
 * Returns current thermostat setpoint.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat setpoint.
 * @category Thermostat capability
 */
export function getThermostatSetpoint(deviceId: number): number;

export function getThermostatSetpoint(deviceOrId: HubitatDevice | number): number {
  return getDevice(deviceOrId).getAttributeAsFloat('thermostatSetpoint');
}

