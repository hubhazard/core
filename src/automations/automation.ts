/**
 * @packageDocumentation
 * @module Automations
 */

import { Injectable } from '@nestjs/common';
import { AutomationEvent } from './automation-event';
import { BuildableToTriggerDefinition } from './buildable-to-trigger-definition';
import { TriggerDefinition } from './trigger-definition';

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
   * A cache for `get builtTriggers`.
   * @private
   */
  private builtTriggersCache: TriggerDefinition[] | undefined = undefined;

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
   * A function called upon event matching automations triggers. This function
   * is called by {@link IEventsService events services}.
   * @internal
   */
  abstract async handleEvent(automationEvent: AutomationEvent): Promise<void>;
}
