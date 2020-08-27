/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { AutomationEvent } from '../automations/automation-event';
import { TIMER_EVENT_TYPE } from './timer-event-type.const';

/**
 * An event sent by the timer module.
 */
export class TimerEvent extends AutomationEvent {
  readonly eventType = TIMER_EVENT_TYPE;
}
