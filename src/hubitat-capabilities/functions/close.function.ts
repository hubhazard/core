/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { getDevice } from '..';

/**
 * Closes the device.
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
export async function close(device: HubitatDevice): Promise<void>;

/**
 * Closes the device.
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
export async function close(deviceId: number): Promise<void>;

/**
 * Closes the device.
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
export async function close(deviceOrId: HubitatDevice | number): Promise<void>;

export async function close(deviceOrId: HubitatDevice | number): Promise<void> {
  const device = getDevice(deviceOrId);
  const command = 'close';
  if (!device.hasCommand(command))
    throw new Error(`The device '${device.name}' doesn't support the '${command}' command.`);
  await device.sendCommand(command);
}
