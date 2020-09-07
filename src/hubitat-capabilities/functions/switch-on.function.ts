/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { setSwitch } from '..';

/**
 * Sets the switch to `on` position.
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
export async function switchOn(device: HubitatDevice): Promise<void>;

/**
 * Sets the switch to `on` position.
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
export async function switchOn(deviceId: number): Promise<void>;

/**
 * Sets the switch to `on` position.
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
export async function switchOn(deviceOrId: HubitatDevice | number): Promise<void>;

export async function switchOn(deviceOrId: HubitatDevice | number): Promise<void> {
  setSwitch(deviceOrId, 'on');
}
