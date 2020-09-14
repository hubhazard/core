/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Opens the device.
 *
 * Capabilities:
 * - Virtual [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param device A target device.
 */
export async function open(device: HubitatDevice): Promise<void>;

/**
 * Opens the device.
 *
 * Capabilities:
 * - Virtual [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceId An ID of the target device.
 */
export async function open(deviceId: number): Promise<void>;

/**
 * Opens the device.
 *
 * Capabilities:
 * - Virtual [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceOrId An ID of the target device or the device itself.
 */
export async function open(deviceOrId: HubitatDevice | number): Promise<void>;

export async function open(deviceOrId: HubitatDevice | number): Promise<void> {
  const device = getDevice(deviceOrId);
  const command = 'open';
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command);
}
