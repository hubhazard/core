/**
 * @packageDocumentation
 * @module Automations
 */

import { TriggerDefinition } from './trigger-definition';

/**
 * A base class for all classes representing a trigger that is ready to be
 * *built* into a {@link TriggerDefinition}.
 */
export abstract class BuildableToTriggerDefinition {
  /**
   * A reference to a {@link TriggerDefinition} instance. It will be returned
   * when the `build` method is called.
   * @protected
   */
  protected abstract triggerDefinition: TriggerDefinition;

  /**
   * Returns a reference to the {@link TriggerDefinition}.
   * @throws Throws an error when the {@link TriggerDefinition} reference is
   * invalid.
   * @internal
   */
  build(): TriggerDefinition {
    if (this.triggerDefinition == null) {
      throw new Error(`Can't build into TriggerDefinition. The trigger reference is null!`);
    }
    return this.triggerDefinition;
  }
}
