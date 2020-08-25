/**
 * The HubitatDeviceEvents module allows to easily create automations triggered
 * by Hubitat's device events. In addition it creates a local cache of all
 * Hubitat's devices provided by the Maker API and keeps them up-to-date by
 * listening to device events from Hubitat. This cache is queryable via the
 * {@link HubitatDevicesService}.
 *
 * The HubitatDeviceEvents module uses the HubitatApi module, therefore the
 * HubitatApi module needs to be properly configured (Hubitat's Maker API app
 * and the `.env` config). Refer to the HubitatApi documentation for more
 * details.
 *
 * @packageDocumentation
 * @module HubitatDeviceEvents
 * @preferred
 */

import { Module } from '@nestjs/common';
import { AutomationsModule } from '../automations/automations.module';
import { HubitatApiModule } from '../hubitat-api/hubitat-api.module';
import { HubitatDeviceEventsService } from './hubitat-device-events.service';
import { HubitatDevicesService } from './hubitat-devices.service';

/**
 * A [Nest.js module](https://docs.nestjs.com/modules) providing the
 * functionality of the HubHazard's hubitat-device-events module.
 */
@Module({
  imports: [HubitatApiModule, AutomationsModule],
  controllers: [],
  providers: [HubitatDeviceEventsService, HubitatDevicesService],
  exports: [HubitatDeviceEventsService, HubitatDevicesService],
})
export class HubitatDeviceEventsModule {}
