/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { EDoorStatus, getDevice } from '..';

/**
 * Returns current door position.
 *
 * Capabilities:
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 *
 * @param device A target device.
 * @returns Returns current door position.
 */
export function getDoorPosition(device: HubitatDevice): EDoorStatus;

/**
 * Returns current door position.
 *
 * Capabilities:
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 *
 * @param deviceId An ID of the target device.
 * @returns Returns current door position.
 */
export function getDoorPosition(deviceId: number): EDoorStatus;

export function getDoorPosition(deviceOrId: HubitatDevice | number): EDoorStatus {
  return getDevice(deviceOrId).getAttributeAsString('door') as EDoorStatus;
}
