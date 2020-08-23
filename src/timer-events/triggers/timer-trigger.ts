/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { ShortIntervalDefinition } from './short-interval.definition';
import { TimerTriggerDefinition } from './timer-trigger-definition';

export declare type ShortIntervalUnit = 'hours' | 'minutes' | 'seconds' | 'ms';
export declare type ShortInterval = { unit: ShortIntervalUnit; value: number };

/**
 * A timer trigger definition builder. Used when describing trigger definitions
 * in automations.
 */
export class TimerTrigger {
  /**
   * Create timer trigger definition that describes a time interval.
   * @param value A number of specified units this interval will last.
   * @param unit A unit of this time interval.
   */
  static every(value: number, unit: ShortIntervalUnit): ShortIntervalDefinition {
    if (value <= 0) throw new Error(`Can't create timer trigger with a value equal or less than zero: ${value}`);
    const trigger = new TimerTriggerDefinition();
    trigger.data.push({
      unit,
      value,
    });
    return new ShortIntervalDefinition(trigger);
  }
}
