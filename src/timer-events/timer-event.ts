/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { AutomationEvent } from '../automations/automation-event';

/**
 * A string value describing timer event type.
 */
export const TIMER_EVENT_TYPE = 'timer';

/**
 * An event sent by the timer module.
 */
export class TimerEvent extends AutomationEvent {
  readonly eventType = TIMER_EVENT_TYPE;
}
