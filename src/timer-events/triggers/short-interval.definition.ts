/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { TriggerDefinition } from '../../automations/trigger-definition';
import { TimerTriggerDefinition } from './timer-trigger-definition';

/**
 * A *trigger builder* where the short interval was defined. Buildable to
 * {@link TriggerDefinition}.
 */
export class ShortIntervalDefinition extends BuildableToTriggerDefinition {
  protected triggerDefinition: TimerTriggerDefinition;

  /**
   * Creates a new instance out of the provided {@link TimerTriggerDefinition}.
   */
  constructor(trigger: TimerTriggerDefinition) {
    super();
    if (trigger.data.length === 0) throw new Error(`Can't create TTriggerShortInterval as there are no data entries.`);
    this.triggerDefinition = trigger;
  }

  /**
   * Return the contained {@link TriggerDefinition}.
   */
  build(): TriggerDefinition {
    return this.triggerDefinition;
  }
}
