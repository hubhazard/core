/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { Injectable } from '@nestjs/common';
import { DeviceEventDto } from '../hubitat-api/dtos/device-event.dto';
import { DeviceInfoDto } from '../hubitat-api/dtos/device-info.dto';
import { HubitatApiService } from '../hubitat-api/hubitat-api.service';
import { HubitatDevice } from './hubitat-device';
import { HubitatDeviceEvent } from './hubitat-device-event';
import { HubitatDeviceEventsService } from './hubitat-device-events.service';
import Timeout = NodeJS.Timeout;

@Injectable()
export class HubitatDevicesService {
  /**
   * A static field representing an instance of this service. Allows a
   * singleton-style access to simplify device-querying.
   * @private
   */
  private static instance: HubitatDevicesService;

  /**
   * A reference to the device-list reload interval.
   * @private
   */
  private static reloadingInterval: Timeout | undefined = undefined;

  /**
   * A map of devices by their id.
   * @private
   */
  private devicesMap: Map<number, HubitatDevice> = new Map<number, HubitatDevice>();

  /* ==== CONSTRUCTOR ==== */

  constructor(
    private readonly hubitatApiService: HubitatApiService,
    // TODO: REMOVE
    private readonly deviceUpdateEventsService: HubitatDeviceEventsService,
  ) {
    // Subscribe to device update events.
    this.hubitatApiService.deviceUpdateObservable.subscribe((event) => this.handleDeviceUpdateEvent(event));

    // Get all devices from hubitat
    this.reloadAllDevices();

    // Periodic devices reload
    const minutes = 15;
    if (HubitatDevicesService.reloadingInterval != null) {
      clearInterval(HubitatDevicesService.reloadingInterval);
    }
    HubitatDevicesService.reloadingInterval = setInterval(async () => {
      console.log(`Reloading all devices as of ${minutes}-minute interval.`);
      const reloadedDevices = await this.reloadAllDevices();
      console.log(`Reloaded ${reloadedDevices.length} devices as of ${minutes}-minute interval.`);
    }, minutes * 60 * 1000);

    HubitatDevicesService.instance = this;
  }

  /**
   * A static method allowing for singleton-style device querying. Helps to
   * simplify automations code. Returns `undefined` if there's no such device.
   * @param deviceId Id of the requested device.
   */
  static getDevice(deviceId: number): HubitatDevice | undefined {
    return this.instance?.getDevice(deviceId) ?? undefined;
  }

  /**
   * Emits new device update event.
   */
  announceAttributeUpdate(
    attributeName: string,
    device: HubitatDevice,
    newValue: string | null,
    previousValue: string | null | undefined,
  ): void {
    const event = new HubitatDeviceEvent(attributeName, device, device.id, newValue, previousValue);
    this.deviceUpdateEventsService.handleEvent(event);
  }

  /**
   * Returns all cached devices.
   */
  getAllDevices(): HubitatDevice[] {
    return Array.from(this.devicesMap.values());
  }

  /**
   * Returns the cached device by it's id. Returns `undefined` if no such device
   * exists.
   */
  getDevice(deviceId: number): HubitatDevice | undefined {
    return this.devicesMap.get(deviceId) ?? undefined;
  }

  /**
   * Returns a value whether there is a device with specified id in the
   * service's cache.
   */
  hasDevice(deviceId: number): boolean {
    return this.devicesMap.has(deviceId);
  }

  /**
   * Fetches all Hubitat devices to the service's cache and removes devices
   * no longer existing on the Hubitat but existing in the service's cache.
   */
  async reloadAllDevices(): Promise<HubitatDevice[]> {
    const devicesList = await this.hubitatApiService.getDevicesList();
    if (devicesList == null) {
      throw new Error(`Can't reload devices. Hubitats response is invalid!`);
    }
    // Reload devices
    const deviceReloadPromises = devicesList.map((device) => this.reloadDevice(parseInt(device.id, 10)));
    const reloadedDevices = (await Promise.all(deviceReloadPromises)).filter(
      (device) => device != null,
    ) as HubitatDevice[];
    // Delete devices removed from Hubitat
    for (const cachedDeviceId of this.devicesMap.keys()) {
      if (!reloadedDevices.some((device) => device.id === cachedDeviceId)) {
        this.deleteDevice(cachedDeviceId);
      }
    }
    // Return all reloaded devices
    return reloadedDevices;
  }

  /**
   * Fetches a single Hubitat device to the service's cache. Returns fetched
   * device or `undefined` if a device with specified id doesn't exist.
   */
  async reloadDevice(deviceId: number): Promise<HubitatDevice | undefined> {
    const dto = await this.hubitatApiService.getDeviceInfo(deviceId);
    if (dto == null) {
      this.deleteDevice(deviceId);
      return undefined;
    }
    return this.updateDevice(dto);
  }

  /**
   * A method handling new device update events.
   * @private
   */
  private async handleDeviceUpdateEvent(eventData: DeviceEventDto): Promise<void> {
    let deviceId: number | undefined;
    try {
      deviceId = parseInt(eventData.deviceId, 10);
    } catch {
      throw new Error(
        `Can't handle device update. Device's id can't be parsed into integer: ${JSON.stringify(eventData)}`,
      );
    }
    let device = this.getDevice(deviceId);
    if (device == null) {
      device = await this.reloadDevice(deviceId);
      if (device == null)
        throw new Error(`Can't handle the update event for device #${deviceId}. This device doesn't exist.`);
    }
    device.setAttribute(eventData.name, eventData.value, true);
  }

  /**
   * Deletes specified device.
   */
  private deleteDevice(deviceId: number) {
    this.devicesMap.delete(deviceId);
    // TODO: Notify about device removal
  }

  /**
   * Updates an existing device or creates a new device.
   */
  private updateDevice(dto: DeviceInfoDto): HubitatDevice | undefined {
    if (dto == null) return undefined;
    const newDevice = new HubitatDevice(dto, this.hubitatApiService, this);
    if (newDevice == null) return undefined; // TODO: Add error logging

    // Update old device
    if (this.devicesMap.has(newDevice.id)) {
      const oldDevice = this.devicesMap.get(newDevice.id);
      if (oldDevice == null) return undefined;
      oldDevice.update(newDevice);
      return oldDevice;
    }

    // Add new device

    this.devicesMap.set(newDevice.id, newDevice);
    // TODO: Send out device-added event
    return newDevice;
  }
}
