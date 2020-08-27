/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { AutomationEvent } from '../automations/automation-event';
import { TIMER_EVENT_TYPE } from './timer-event-type.const';
import { TriggerDefinition } from '../automations/trigger-definition';

/**
 * Returns a value whether the provided event is of {@link TimerEvent} type.
 *
 * @example
 * ```ts
 * async handleEvent(event: AutomationEvent) {
 *   if (isTimerEvent(event)) {
 *     // Do something
 *   }
 * }
 * ```
 *
 * @param event Event to check.
 * @returns `true` if provided event is {@link TimerEvent}; `false` if not.
 */
export function isTimerEvent(event: AutomationEvent): boolean;

/**
 * Returns a value whether the provided trigger is related to
 * {@link TimerEvent} type.
 *
 * @param trigger Trigger to check.
 * @returns `true` if provided trigger is related to {@link TimerEvent};
 * `false` if not.
 */
export function isTimerEvent(trigger: TriggerDefinition): boolean;

export function isTimerEvent(eventOrTrigger: AutomationEvent | TriggerDefinition): boolean {
  if (eventOrTrigger instanceof AutomationEvent) return eventOrTrigger.eventType === TIMER_EVENT_TYPE;
  return eventOrTrigger.triggerType === TIMER_EVENT_TYPE;
}
