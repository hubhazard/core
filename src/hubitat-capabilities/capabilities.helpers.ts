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

export function getDevice(device: HubitatDevice): HubitatDevice;
export function getDevice(deviceId: number): HubitatDevice;
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
