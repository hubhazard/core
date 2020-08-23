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

type HubitatApiConfig = { hubitatIp: string; makerApiAppId: string; makerApiAccessToken: string };

@Injectable()
export class HubitatApiService {
  private eventsSubject = new Subject<DeviceEventDto>();

  private config: HubitatApiConfig;

  constructor(private configService: ConfigService) {
    this.config = {
      hubitatIp: this.configService.get<string>('HUBITAT_IP') ?? 'not-configured',
      makerApiAppId: this.configService.get<string>('HUBITAT_MAKER_API_APP_ID') ?? 'not-configured',
      makerApiAccessToken: this.configService.get<string>('HUBITAT_MAKER_API_ACCESS_TOKEN') ?? 'not-configured',
    };
  }

  /**
   * Returns an observer for device update events.
   */
  public get deviceUpdateObservable(): Observable<DeviceEventDto> {
    return this.eventsSubject;
  }

  /**
   * Fetches a list of all devices from Hubitat's Maker API.
   */
  public async getDevicesList(): Promise<DevicesListItemDto[] | undefined> {
    return this.get('devices');
  }

  /**
   * Fetches full data for specified device. If the device wasn't found or there
   * was some other error, returns `undefined`.
   */
  public async getDeviceInfo(deviceId: number): Promise<DeviceInfoDto | undefined> {
    return this.get(`devices/${deviceId}`);
  }

  /**
   * Method used by the `HubitatApiController` to pass new device update events.
   */
  public handleDeviceUpdate(event: DeviceEventDto): void {
    this.eventsSubject.next(event);
  }

  /**
   * Sends device command to Hubitat's Maker API. Only one value is supported as
   * the Hubitat's Maker API doesn't support receiving two values. This makes it
   * impossible to send commands like `setLevel` with the `duration` value.
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
