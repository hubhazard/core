/**
 * @packageDocumentation
 * @module HubitatApi
 */

import { Body, Controller, Post } from '@nestjs/common';
import { DeviceEventDto } from './dtos/device-event.dto';
import { HubitatApiService } from './hubitat-api.service';

/**
 * A [Nest.js controller](https://docs.nestjs.com/controllers) responsible for
 * catching device events sent by the [Hubitat hub](https://hubitat.com/).
 */
@Controller('hubitat/event')
export class HubitatApiController {
  constructor(private readonly hubitatApiService: HubitatApiService) {}

  /**
   * A handler of device events sent by Hubitat hub via POST request.
   * @param eventData Data describing a device event.
   */
  @Post()
  async onEvent(@Body('content') eventData: DeviceEventDto): Promise<void> {
    await this.hubitatApiService.handleDeviceUpdate(eventData);
  }
}
