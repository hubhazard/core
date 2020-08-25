/**
 * The TimerEvents module allows to easily create automations that are triggered
 * periodically. The TimerEvents module lets you declare timer triggers that
 * will trigger the automation in a specified period.
 *
 * @packageDocumentation
 * @module TimerEvents
 * @preferred
 */

import { Module } from '@nestjs/common';
import { AutomationsModule } from '../automations/automations.module';
import { TimerEventsService } from './timer-events.service';

/**
 * A [Nest.js module](https://docs.nestjs.com/modules) providing the
 * functionality of the HubHazard's timer-events module.
 */
@Module({
  imports: [AutomationsModule],
  controllers: [],
  providers: [TimerEventsService],
  exports: [TimerEventsService],
})
export class TimerEventsModule {}
