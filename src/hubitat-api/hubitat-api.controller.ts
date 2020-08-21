import { Body, Controller, Post } from '@nestjs/common';
import { DeviceEventDto } from './dtos/device-event.dto';
import { HubitatApiService } from './hubitat-api.service';

@Controller('hubitat/event')
export class HubitatApiController {
  constructor(private readonly hubitatApiService: HubitatApiService) {}

  /**
   * Device update event handler.
   */
  @Post()
  async onEvent(@Body('content') eventData: DeviceEventDto): Promise<void> {
    await this.hubitatApiService.handleDeviceUpdate(eventData);
  }
}
