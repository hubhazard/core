/**
 * @packageDocumentation
 * @module Automations
 */

import { Constructor } from '@nestjs/common/utils/merge-with-values.util';

/**
 * A base class for events passed to automations. Every automation event
 * provides the {@link AutomationEvent.eventType eventType} string field that
 * allows for identification of the event type inside the automation.
 */
export abstract class AutomationEvent {

  /**
   * A type of this event. Used for routing and filtering of events.
   *
   * @example
   * Can be used to identify the type of the event in automation:
   * ```ts
   * async handleEvent(event: TimerEvent) {
   *   if(event.eventType === TIMER_EVENT_TYPE)
   *     console.log(`${this.name} was triggered!`);
   * }
   * ```
   */
  abstract readonly eventType: string;

  /**
   * Force-cast the event as specified type.
   *
   * @example
   * Can be used to identify the type of the event in an automation:
   * ```ts
   * async handleEvent(event: AutomationEvent) {
   *   try {
   *     const timerEvent = event.handleAs(TimerEvent);
   *   } catch (e) {
   *     // ...
   *   }
   * }
   * ```
   *
   * @param eventClass An {@link AutomationEvent} subclass to cast this event to.
   * @returns An event casted to a type specified in `eventClass` argument.
   * @throws Throws an error if the cast failed.
   */
  handleAs<T extends AutomationEvent>(eventClass: Constructor<T>): T {
    if (this instanceof eventClass) return this as T;
    throw new Error(`Failed to convert the automation event into ${eventClass}`);
  }
}
