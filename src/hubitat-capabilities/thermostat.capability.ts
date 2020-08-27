/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice, getDevice } from "index";
import { json } from "express";

/* ==== Cooling setpoint ==== */

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

/* ==== Heating setpoint ==== */

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

/* ==== Schedule ==== */

/**
 * Returns current thermostat schedule.
 *
 * @param device A target device.
 * @returns Returns current thermostat schedule.
 * @category Thermostat capability
 */
export function getThermostatSchedule(device: HubitatDevice): Object;

/**
 * Returns current thermostat schedule.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current thermostat schedule.
 * @category Thermostat capability
 */
export function getThermostatSchedule(deviceId: number): Object;

export function getThermostatSchedule(deviceOrId: HubitatDevice | number): Object {
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
export async function setThermostatSchedule(device: HubitatDevice, schedule: Object): Promise<void>;

/**
 * Sets the thermostat schedule.
 *
 * @param deviceId An ID of the target device.
 * @param schedule A schedule data.
 * @category Thermostat capability
 */
export async function setThermostatSchedule(deviceId: number, schedule: Object): Promise<void>;

export async function setThermostatSchedule(deviceOrId: HubitatDevice | number, schedule: Object): Promise<void> {
  const device = getDevice(deviceOrId);
  await device.sendCommand('setSchedule', JSON.stringify(schedule));
}

/* ==== Thermostat Setpoint ==== */

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