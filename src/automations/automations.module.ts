/**
 * You can consider this module to be the core of the HubHazard Core. The
 * {@link AutomationsModule} is responsible for providing base classes and
 * interfaces for events services, events, automations and is responsible for
 * managing registered event services and automations:
 *
 * - {@link Automation} - a base class for every automation. Allows for
 *      automations to be correctly registered and triggered.
 * - {@link AutomationEvent} - a base class for events passed to automations.
 *      Every automation event provides the `eventType` string field that allows
 *      for identification of the event type inside the automation.
 * - {@link AutomationsService} - a service for registering automations and
 *      events services.
 * - {@link BuildableToTriggerDefinition} - a base class for classes used in
 *      describing triggers. This allows them to be *buildable* to the
 *      {@link TriggerDefinition} consumed by events services.
 * - {@link IEventsService} - an interface describing basic functionality of the
 *      event service: registering and unregistering automations.
 * - {@link TriggerDefinition} - a base class for trigger definitions. Trigger
 *      definitions describe what kind of events an automation awaits.
 *
 * @packageDocumentation
 * @module Automations
 * @preferred
 */

import { Module } from '@nestjs/common';
import { AutomationsService } from './automations.service';

/**
 * A Nest.js module providing the functionality of the HubHazard's automations
 * module.
 */
@Module({
  imports: [],
  controllers: [],
  providers: [AutomationsService],
  exports: [AutomationsService],
})
export class AutomationsModule {}
