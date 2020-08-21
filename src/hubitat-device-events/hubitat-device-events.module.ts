import { Module } from '@nestjs/common';
import { AutomationsModule } from '../automations/automations.module';
import { HubitatApiModule } from '../hubitat-api/hubitat-api.module';
import { HubitatDeviceEventsService } from './hubitat-device-events.service';
import { HubitatDevicesService } from './hubitat-devices.service';

@Module({
  imports: [HubitatApiModule, AutomationsModule],
  controllers: [],
  providers: [HubitatDeviceEventsService, HubitatDevicesService],
  exports: [HubitatDeviceEventsService, HubitatDevicesService],
})
export class HubitatDeviceEventsModule {}
