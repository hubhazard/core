/**
 * @packageDocumentation
 * @module Automations
 */

import { Inject, Injectable } from '@nestjs/common';
import { AutomationEvent } from './automation-event';
import { BuildableToTriggerDefinition } from './buildable-to-trigger-definition';
import { TriggerDefinition } from './trigger-definition';
import { AutomationsService } from './automations.service';

/**
 * A base class for all automations. Allows for automations to be correctly
 * registered and triggered.
 */
@Injectable()
export abstract class Automation {
  /**
   * A name of the automation. Must be unique.
   */
  abstract readonly name: string;

  /**
   * A list of not-yet-built triggers. Empty list means this automation won't be
   * triggered.
   *
   * @example
   * ```ts
   * // List of triggers this automation subscribes to.
   * readonly triggers = [TimerTrigger.every(10, 'seconds')];
   * ```
   */
  abstract readonly triggers: BuildableToTriggerDefinition[];

  /**
   * A reference to automations service injected by the Nest.js Dependency
   * Injection. Its value is not available in the constructor.
   * @protected
   */
  @Inject()
  protected readonly automationsService: AutomationsService;

  /**
   * A cache for `get builtTriggers`.
   * @private
   */
  private builtTriggersCache: TriggerDefinition[] | undefined = undefined;

  /**
   * A default constructor that registers this automation to the automations
   * service.
   */
  public constructor() {
    setTimeout(() => this.automationsService.registerAutomation(this), 1000);
  }

  /**
   * Returns a list of triggers already built as {@link TriggerDefinition}.
   * This value is cached. This is used by {@link IEventsService events services}.
   * @internal
   */
  get builtTriggers(): TriggerDefinition[] {
    if (this.builtTriggersCache == null) {
      this.builtTriggersCache = this.triggers.map((buildable) => buildable.build());
    }
    return this.builtTriggersCache;
  }

  /**
   * A function called when an event matches any of automations triggers.
   * This function is called by {@link IEventsService events services}.
   * @param automationEvent The event accepted by any of automations triggers.
   * The event is generalized to the {@link AutomationEvent} type, but can be
   * narrowed down back to the original event within the automation.
   */
  abstract async handleEvent(automationEvent: AutomationEvent): Promise<void>;
}
