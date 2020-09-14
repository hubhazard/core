/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { close, EOpenClosedPosition, open } from '..';

/**
 * Moves the device to provided position.
 *
 * Capabilities:
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param device A target device.
 * @param position The position to initialize.
 */
export async function setPosition(device: HubitatDevice, position: EOpenClosedPosition): Promise<void>;

/**
 * Moves the device to provided position.
 *
 * Capabilities:
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceId An ID of the target device.
 * @param position The position to initialize.
 */
export async function setPosition(deviceId: number, position: EOpenClosedPosition): Promise<void>;

export async function setPosition(deviceOrId: HubitatDevice | number, position: EOpenClosedPosition): Promise<void> {
  if (position === 'open') await open(deviceOrId);
  else close(deviceOrId);
}
