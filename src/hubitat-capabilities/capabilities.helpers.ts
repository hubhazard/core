/**
 * The HubitatCapabilities module is a collection of functions that simplify
 * interactions with Hubitat's devices. Those functions are following the
 * naming conventions and functionalities of
 * [Hubitat device capabilities](https://docs.hubitat.com/index.php?title=Driver_Capability_List).
 *
 * **These functions are intended to be used within automations only.**
 *
 * @packageDocumentation
 * @module HubitatCapabilities
 * @preferred
 */

import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { HubitatDevicesService } from '../hubitat-device-events/hubitat-devices.service';

/**
 * Returns a provided device back. This method exists to make device
 * capabilities functions more usable.
 *
 * @param device A target device.
 * @returns Returns the provided device back.
 */
export function getDevice(device: HubitatDevice): HubitatDevice;

/**
 * Returns a device with the provided ID.
 *
 * @param deviceId An ID of the target device.
 * @returns Returns a device with the provided ID.
 * @throws Throws an error if couldn't get the device.
 */
export function getDevice(deviceId: number): HubitatDevice;

/**
 * Returns a provided device or a device with the provided ID.
 *
 * @param deviceOrId A target device or an ID of the target device.
 * @returns Returns a provided device or a device with the provided ID.
 * @throws Throws an error if couldn't get the device.
 */
export function getDevice(deviceOrId: HubitatDevice | number): HubitatDevice;

export function getDevice(deviceOrId: HubitatDevice | number): HubitatDevice {
  if (typeof deviceOrId === 'number') {
    const device = HubitatDevicesService.getDevice(deviceOrId);
    if (device == null) {
      throw new Error(`Failed to get the device #${deviceOrId} from DevicesService cache.`);
    }
    return device;
  }
  return deviceOrId;
}

/**
 * Convert the *enum list* received from Hubitat into the JS-friendly string list.
 * @param enumList An *enum list* from Hubitat in format: `[valueA, valueB, value C]`.
 * @returns Returns a list of values as strings: `["valueA", "valueB", "value C"]` .
 */
export function enumListToStringList(enumList: string): string[] {
  // Check if the enumList string is within []
  if (enumList.length < 2 || enumList.charAt(0) !== '[' || enumList.charAt(enumList.length - 1) !== ']') {
    console.error(`Failed to convert the enum list ("${enumList}") into string list.`);
    return [];
  }

  // Remove surrounding brackets
  enumList = enumList.substring(1, enumList.length - 1);

  // Extract values
  return enumList
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}
