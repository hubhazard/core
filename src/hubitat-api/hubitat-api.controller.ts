/**
 * @packageDocumentation
 * @module HubitatApi
 */

import { Body, Controller, Post } from '@nestjs/common';
import { DeviceEventDto } from './dtos/device-event.dto';
import { HubitatApiService } from './hubitat-api.service';

/**
 * A Nest.js controller responsible for receiving device events from Hubitat hub.
 */
@Controller('hubitat/event')
export class HubitatApiController {
  constructor(private readonly hubitatApiService: HubitatApiService) {}

  /**
   * Handles device events sent from the Hubitat hub.
   * @param eventData Device event data sent by the Hubitat hub.
   */
  @Post()
  async onEvent(@Body('content') eventData: DeviceEventDto): Promise<void> {
    await this.hubitatApiService.handleDeviceUpdate(eventData);
  }
}
