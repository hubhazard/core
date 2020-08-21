import { Injectable } from '@nestjs/common';
import { AutomationEvent } from './automation-event';
import { BuildableToTriggerDefinition } from './buildable-to-trigger-definition';
import { TriggerDefinition } from './trigger-definition';

/**
 * A base class for all automations.
 */
@Injectable()
export abstract class Automation {
  /**
   * A name of the automation. Must be unique.
   */
  abstract readonly name: string;

  /**
   * A list of not-yet-built triggers. Empty list means this automation won't be triggered.
   */
  abstract readonly triggers: BuildableToTriggerDefinition[];

  /**
   * A cache for `get builtTriggers`.
   * @private
   */
  private builtTriggersCache: TriggerDefinition[] | undefined = undefined;

  /**
   * Returns a list of triggers already built as `TriggerDefinition`. This value
   * is cached.
   */
  get builtTriggers(): TriggerDefinition[] {
    if (this.builtTriggersCache == null) {
      this.builtTriggersCache = this.triggers.map((buildable) => buildable.build());
    }
    return this.builtTriggersCache;
  }

  /**
   * A function called upon event matching automations triggers.
   */
  abstract async handleEvent(automationEvent: AutomationEvent): Promise<void>;
}
