/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { setSwitch } from '..';

/**
 * Sets the switch to `off` position.
 *
 * Capabilities:
 * - Bulb
 * - Light
 * - Outlet
 * - RelaySwitch
 * - SamsungTV
 * - Switch
 *
 * @param device A target device.
 */
export async function switchOff(device: HubitatDevice): Promise<void>;

/**
 * Sets the switch to `off` position.
 *
 * Capabilities:
 * - Bulb
 * - Light
 * - Outlet
 * - RelaySwitch
 * - SamsungTV
 * - Switch
 *
 * @param deviceId An ID of the target device.
 */
export async function switchOff(deviceId: number): Promise<void>;

/**
 * Sets the switch to `off` position.
 *
 * Capabilities:
 * - Bulb
 * - Light
 * - Outlet
 * - RelaySwitch
 * - SamsungTV
 * - Switch
 *
 * @param deviceOrId An ID of the target device or the device itself.
 */
export async function switchOff(deviceOrId: HubitatDevice | number): Promise<void>;

export async function switchOff(deviceOrId: HubitatDevice | number): Promise<void> {
  setSwitch(deviceOrId, 'off');
}
