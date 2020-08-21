/**
 * Base class for every trigger definition.
 */
export abstract class TriggerDefinition {
  /**
   * A value describing a type of the event. Used to recognize which events
   * service this definition belongs to.
   */
  abstract readonly triggerType: string;
}
