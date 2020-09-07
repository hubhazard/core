/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice, isOn, setSwitch } from '..';

/**
 * Toggles the switch.
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
export async function toggle(device: HubitatDevice): Promise<void>;

/**
 * Toggles the switch.
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
export async function toggle(deviceId: number): Promise<void>;

export async function toggle(deviceOrId: HubitatDevice | number): Promise<void> {
  const device = getDevice(deviceOrId);
  const currentSetting = isOn(device);
  if (currentSetting == null) return;
  await setSwitch(device, !currentSetting);
}
