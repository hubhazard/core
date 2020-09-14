/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Sets the percentage coverage of the window shade.
 *
 * Capabilities:
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param device A target device.
 * @param coverage A coverage percentage to set.
 */
export async function setWindowShadeCoverage(device: HubitatDevice, coverage: number): Promise<void>;

/**
 * Sets the percentage coverage of the window shade.
 *
 * Capabilities:
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceId An ID of the target device.
 * @param coverage A coverage percentage to set.
 */
export async function setWindowShadeCoverage(deviceId: number, coverage: number): Promise<void>;

export async function setWindowShadeCoverage(deviceOrId: HubitatDevice | number, coverage: number): Promise<void> {
  const command = 'setPosition';
  const device = getDevice(deviceOrId);
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command, coverage);
}
