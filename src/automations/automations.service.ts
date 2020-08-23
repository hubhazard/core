/**
 * @packageDocumentation
 * @module Automations
 */

import { Injectable } from '@nestjs/common';
import { Automation } from './automation';
import { IEventsService } from './events-service.interface';

/**
 * A service for registering automations and events services.
 */
@Injectable()
export class AutomationsService {
  /**
   * A set of registered events services.
   * @private
   */
  private registeredEventsServices: Set<IEventsService> = new Set<IEventsService>();

  /**
   * A set of registered automations.
   * @private
   */
  private registeredAutomations: Set<Automation> = new Set<Automation>();

  /**
   * Registers provided automation to all registered events services.
   */
  public registerAutomation(automation: Automation): void {
    console.log(`Registering automation: ${automation.name}`);

    // Register automation locally
    this.registeredAutomations.add(automation);

    // Register automation to user-automations-module services
    if (automation.triggers.length > 0) {
      for (const eventsService of this.registeredEventsServices) {
        eventsService.registerAutomation(automation);
      }
    }
  }

  /**
   * Registers provided events service. After registration all currently
   * registered automations will be automatically registered to that events
   * service.
   */
  public registerEventsService(eventsService: IEventsService): void {
    this.registeredEventsServices.add(eventsService);
    for (const automation of this.registeredAutomations) {
      eventsService.registerAutomation(automation);
    }
  }
}
