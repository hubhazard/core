/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EActiveStatus, getDevice } from '..';

/**
 * Sets the acceleration status of the **virtual** acceleration sensor.
 *
 * Capabilities:
 * - AccelerationSensor
 *
 * @param device A target device.
 * @param value Acceleration status to set.
 */
export async function setAcceleration(device: HubitatDevice, value: EActiveStatus): Promise<void>;

/**
 * Sets the acceleration status of the **virtual** acceleration sensor.
 *
 * Capabilities:
 * - AccelerationSensor
 *
 * @param deviceId An ID of the target device.
 * @param value Acceleration status to set.
 */
export async function setAcceleration(deviceId: number, value: EActiveStatus): Promise<void>;

export async function setAcceleration(deviceOrId: HubitatDevice | number, value: EActiveStatus): Promise<void> {
  const device = getDevice(deviceOrId);
  device.setAttribute('acceleration', value);
  if (value === 'active') await device.sendCommand('active');
  else await device.sendCommand('inactive');
}
