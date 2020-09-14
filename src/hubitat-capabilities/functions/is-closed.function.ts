/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { ECapability } from '../../hubitat-device-events/capability.enum';
import { getContactSensorStatus, getDevice, getDoorPosition, getValvePosition, getWindowShadePosition } from '..';

/**
 * Returns a value whether the device is closed.
 *
 * Capabilities:
 * - [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param device A target device.
 * @returns `true` if the device is closed; `false` if sensor is open or
 * encountered an error.
 */
export function isClosed(device: HubitatDevice): boolean;

/**
 * Returns a value whether the device is closed.
 *
 * Capabilities:
 * - [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param device A target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the device is closed; `false` if sensor is open.
 */
export function isClosed(device: HubitatDevice, defaultValue: boolean): boolean;

/**
 * Returns a value whether the device is closed.
 *
 * Capabilities:
 * - [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceId An ID of the target device.
 * @returns `true` if the device is closed; `false` if sensor is open.
 */
export function isClosed(deviceId: number): boolean;

/**
 * Returns a value whether the device is closed.
 *
 * Capabilities:
 * - [ContactSensor](https://docs.hubitat.com/index.php?title=Driver_Capability_List#ContactSensor)
 * - [DoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#DoorControl)
 * - [GarageDoorControl](https://docs.hubitat.com/index.php?title=Driver_Capability_List#GarageDoorControl)
 * - [Valve](https://docs.hubitat.com/index.php?title=Driver_Capability_List#Valve)
 * - [WindowShade](https://docs.hubitat.com/index.php?title=Driver_Capability_List#WindowShade)
 *
 * @param deviceId An ID of the target device.
 * @param defaultValue A value returned in case getting the device status has
 * failed.
 * @returns `true` if the device is closed; `false` if sensor is open or
 * encountered an error.
 */
export function isClosed(deviceId: number, defaultValue: boolean): boolean;

export function isClosed(deviceOrId: HubitatDevice | number, defaultValue = false): boolean {
  const device = getDevice(deviceOrId);

  if (device.hasCapability(ECapability.ContactSensor)) {
    const status = getContactSensorStatus(device, defaultValue ? 'open' : 'closed');
    return status === 'closed';
  }

  if (device.hasCapability(ECapability.DoorControl) || device.hasCapability(ECapability.GarageDoorControl)) {
    const status = getDoorPosition(device);
    return status === 'closed';
  }

  if (device.hasCapability(ECapability.Valve)) {
    const status = getValvePosition(device);
    return status === 'closed';
  }

  if (device.hasCapability(ECapability.WindowShade)) {
    const status = getWindowShadePosition(device);
    return status === 'closed';
  }

  return defaultValue;
}
