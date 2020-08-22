/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { TriggerDefinition } from '../../automations/trigger-definition';
import { TIMER_EVENT_TYPE } from '../timer-event';
import { ShortInterval } from './timer-trigger';

/**
 * A class defining timer trigger.
 */
export class TimerTriggerDefinition extends TriggerDefinition {
  readonly triggerType = TIMER_EVENT_TYPE;

  /**
   * A data of this trigger definition as a list of short intervals.
   */
  data: ShortInterval[] = [];
}
