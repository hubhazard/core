import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { TriggerDefinition } from '../../automations/trigger-definition';
import { TimerTriggerDefinition } from './timer-trigger-definition';

export class ShortIntervalDefinition extends BuildableToTriggerDefinition {
  protected triggerDefinition: TimerTriggerDefinition;

  constructor(trigger: TimerTriggerDefinition) {
    super();
    if (trigger.data.length === 0) throw new Error(`Can't create TTriggerShortInterval as there are no data entries.`);
    this.triggerDefinition = trigger;
  }

  build(): TriggerDefinition {
    return this.triggerDefinition;
  }
}
