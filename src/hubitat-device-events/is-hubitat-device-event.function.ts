/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { AutomationEvent } from '../automations/automation-event';
import { HUBITAT_DEVICE_EVENT_TYPE } from './hubitat-device-event-type.const';
import { TriggerDefinition } from '../automations/trigger-definition';

/**
 * Returns a value whether the provided event is of {@link HubitatDeviceEvent} type.
 *
 * @example
 * ```ts
 * async handleEvent(event: AutomationEvent) {
 *   if (isHubitatDeviceEvent(event)) {
 *     // Do something
 *   }
 * }
 * ```
 *
 * @param event Event to check.
 * @returns `true` if provided event is {@link HubitatDeviceEvent}; `false` if not.
 */
export function isHubitatDeviceEvent(event: AutomationEvent): boolean;

/**
 * Returns a value whether the provided trigger is related to
 * {@link HubitatDeviceEvent} type.
 *
 * @param trigger Trigger to check.
 * @returns `true` if provided trigger is related to {@link HubitatDeviceEvent};
 * `false` if not.
 */
export function isHubitatDeviceEvent(trigger: TriggerDefinition): boolean;

export function isHubitatDeviceEvent(eventOrTrigger: AutomationEvent | TriggerDefinition): boolean {
  if (eventOrTrigger instanceof AutomationEvent) return eventOrTrigger.eventType === HUBITAT_DEVICE_EVENT_TYPE;
  return eventOrTrigger.triggerType === HUBITAT_DEVICE_EVENT_TYPE;
}
