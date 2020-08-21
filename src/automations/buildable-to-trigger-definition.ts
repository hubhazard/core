import { TriggerDefinition } from './trigger-definition';

/**
 * Base class for all classes representing a trigger that is ready to be built
 * into a `TriggerDefinition`.
 */
export abstract class BuildableToTriggerDefinition {
  /**
   * A reference to a trigger definition instance. Will be returned when
   * `build()` method is called.
   * @protected
   */
  protected abstract triggerDefinition: TriggerDefinition;

  /**
   * Returns a reference to TriggerDefinition. Throws an error when
   * `TriggerDefinition` reference is invalid.
   */
  build(): TriggerDefinition {
    if (this.triggerDefinition == null) {
      throw new Error(`Can't build into TriggerDefinition. The trigger reference is null!`);
    }
    return this.triggerDefinition;
  }
}
