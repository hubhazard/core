/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { TriggerDefinition } from '../../automations/trigger-definition';
import { TIMER_EVENT_TYPE } from '../timer-event';
import { ShortInterval } from './timer-trigger';

/**
 * A class defining a timer trigger. Contains a list of
 * {@link ShortInterval short intervals}.
 */
export class TimerTriggerDefinition extends TriggerDefinition {

  /**
   * A string value describing timer event type.
   */
  readonly triggerType = TIMER_EVENT_TYPE;

  /**
   * A data of this trigger definition as a list of
   * {@link ShortInterval short intervals}.
   */
  data: ShortInterval[] = [];
}
