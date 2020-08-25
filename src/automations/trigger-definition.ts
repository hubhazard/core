/**
 * @packageDocumentation
 * @module Automations
 */

/**
 * A base class for trigger definitions. Trigger definitions describe what kind
 * of events an automation awaits.
 */
export abstract class TriggerDefinition {
  /**
   * A value describing a type of the event. Used to recognize which events
   * service this definition belongs to.
   */
  abstract readonly triggerType: string;
}
