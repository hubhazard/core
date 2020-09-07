/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

import { HubitatDevice } from '../../hubitat-device-events/hubitat-device';
import { HubitatDevicesService } from '../../hubitat-device-events/hubitat-devices.service';

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
