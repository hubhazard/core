/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { ShortIntervalDefinition } from './short-interval.definition';
import { TimerTriggerDefinition } from './timer-trigger-definition';
import { EShortIntervalUnit } from './short-interval-unit.type';

/**
 * A timer trigger definition builder. Used when describing trigger definitions
 * in automations.
 */
export class TimerTrigger {
  /**
   * Create a timer trigger definition that describes a time interval.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   TimerTrigger.every(35, 'minutes'),
   * ];
   * ```
   *
   * @param value A number of specified units this interval will last.
   * @param unit A unit of this time interval.
   * @returns A version of a *trigger builder* with the provided data.
   */
  static every(value: number, unit: EShortIntervalUnit): ShortIntervalDefinition {
    if (value <= 0) throw new Error(`Can't create timer trigger with a value equal or less than zero: ${value}`);
    const trigger = new TimerTriggerDefinition();
    trigger.data.push({
      unit,
      value,
    });
    return new ShortIntervalDefinition(trigger);
  }
}
