import { Constructor } from '@nestjs/common/utils/merge-with-values.util';

/**
 * A base class for all types of automation events.
 */
export abstract class AutomationEvent {
  /**
   * A type of this event. Used for routing and filtering of events.
   */
  abstract readonly eventType: string;

  /**
   * Force-cast the event as specified type. If the event isn't of specified
   * type, an error will be thrown.
   */
  handleAs<T extends AutomationEvent>(eventClass: Constructor<T>): T {
    if (this instanceof eventClass) return this as T;
    throw new Error(`Failed to convert the automation event into ${eventClass}`);
  }
}
