/**
 * @packageDocumentation
 * @module HubitatApi
 */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';
import { Observable, Subject } from 'rxjs';
import { DeviceEventDto } from './dtos/device-event.dto';
import { DeviceInfoDto } from './dtos/device-info.dto';
import { DevicesListItemDto } from './dtos/devices-list-item.dto';

/**
 * A type for storing module's configuration data.
 */
type HubitatApiConfig = { hubitatIp: string; makerApiAppId: string; makerApiAccessToken: string };

/**
 * A [Nest.js service](https://docs.nestjs.com/providers#services) that allows
 * for querying Hubitat's devices, sending commands to Hubitat's devices and
 * exposes an observable providing device update events from Hubitat hub.
 */
@Injectable()
export class HubitatApiService {
  private eventsSubject = new Subject<DeviceEventDto>();

  private config: HubitatApiConfig;

  /**
   * Creates a new service instance. Use only for testing as service's creation
   * is handled by the Dependency Injection.
   *
   * @param configService A configuration service providing the configuration
   * data required to establish a connection with the Hubitat hub.
   */
  constructor(private configService: ConfigService) {
    this.config = {
      hubitatIp: this.configService.get<string>('HUBITAT_IP') ?? 'not-configured',
      makerApiAppId: this.configService.get<string>('HUBITAT_MAKER_API_APP_ID') ?? 'not-configured',
      makerApiAccessToken: this.configService.get<string>('HUBITAT_MAKER_API_ACCESS_TOKEN') ?? 'not-configured',
    };
  }

  /**
   * Returns an new observer for device update events.
   *
   * @example
   * ```ts
   * const subscription = hubitatApiService.deviceUpdateObservable
   *   .subscribe(eventData => console.log(JSON.stringify(eventData)));
   * ```
   *
   * @returns An observable that will provide all future device events.
   */
  public get deviceUpdateObservable(): Observable<DeviceEventDto> {
    return this.eventsSubject;
  }

  /**
   * Fetches a list of all devices provided by
   * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API).
   *
   * @example
   * ```ts
   * const devices = await hubitatApiService.getDevicesList();
   * if (devices != null)
   *   console.log(`Received ${devices.length} devices`);
   * ```
   *
   * @returns Returns a list of devices provided by
   * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API).
   * The list can be empty. Returns `undefined` if fetching devices failed.
   */
  public async getDevicesList(): Promise<DevicesListItemDto[] | undefined> {
    return this.get('devices');
  }

  /**
   * Fetches full data for a specified device.
   *
   * @example
   * ```ts
   * const deviceInfo = await hubitatApiService.getDeviceInfo(42);
   * if (deviceInfo != null)
   *   console.log(`Device details: ${JSON.stringify(deviceInfo)}`);
   * ```
   *
   * @param deviceId Id of the device to fetch.
   * @returns Returns details of a specified device. Returns `undefined` if the
   * fetching the data failed.
   */
  public async getDeviceInfo(deviceId: number): Promise<DeviceInfoDto | undefined> {
    return this.get(`devices/${deviceId}`);
  }

  /**
   * Method used by the {@link HubitatApiController} to pass new device update
   * events to the {@link HubitatApiService}.
   *
   * @internal
   * @param event An event to handle.
   */
  public handleDeviceUpdate(event: DeviceEventDto): void {
    this.eventsSubject.next(event);
  }

  /**
   * Sends command to Hubitat's device. **Only one value is supported** as the
   * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API)
   * doesn't support receiving two values. This makes it impossible to send
   * commands like
   * [`setLevel` with the `duration` value](https://docs.hubitat.com/index.php?title=Driver_Capability_List#SwitchLevel).
   *
   * @example
   * ```ts
   * await hubitatApiService.sendDeviceCommand(160, 'on');
   * await hubitatApiService.sendDeviceCommand(160, 'setLevel', 75);
   * ```
   *
   * @param deviceId Id of the device this command needs to be sent.
   * @param command The command that needs to be send.
   * @param value An optional value for the command.
   */
  public async sendDeviceCommand(
    deviceId: number,
    command: string,
    value?: string | number,
  ): Promise<unknown | undefined> {
    if (value) {
      return this.get(`devices/${deviceId}/${command}/${value}`);
    }
    return this.get(`devices/${deviceId}/${command}`);
  }

  private getFullPath(path: string): string {
    return (
      `http://${this.config.hubitatIp}/apps/api/${this.config.makerApiAppId}/` +
      `${path}?access_token=${this.config.makerApiAccessToken}`
    );
  }

  private async get<T>(path: string, tryAgain = true): Promise<T | undefined> {
    const fullPath = this.getFullPath(path);
    const response = await fetch(fullPath);
    try {
      return (await response.json()) as T;
    } catch (e) {
      if (tryAgain) {
        console.warn(
          `Failed to parse hubitat response to: '${fullPath}'. Received response: ${JSON.stringify(response)}`,
        );
        const retryResult = await this.get<T>(path, false);
        if (retryResult != null) return retryResult;
      }
      console.error(
        `Failed to parse hubitat response to: '${fullPath}'. Received response: ${JSON.stringify(response)}`,
      );
      return undefined;
    }
  }
}
