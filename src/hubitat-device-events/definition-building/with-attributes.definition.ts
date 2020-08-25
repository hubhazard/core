/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { AttributeFilter } from '../trigger-definition/attribute-filter';
import { ChangeGroup } from '../trigger-definition/change-group';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';

/**
 * An in-progress {@link HubitatDeviceTriggerDefinition} builder class.
 */
export class WithAttributesDefinition extends BuildableToTriggerDefinition {
  protected triggerDefinition: HubitatDeviceTriggerDefinition;

  /**
   * @internal
   */
  constructor(triggerDefinition: HubitatDeviceTriggerDefinition) {
    super();
    if (triggerDefinition.attributes.length === 0) {
      throw new Error(
        `Can't create the WithAttributesDefinition. Provided trigger definition
        doesn't contain any attributes.`,
      );
    }
    this.triggerDefinition = triggerDefinition;
  }

  /**
   * Allows to specify another change filter in a change filter group to make
   * the trigger more specific.
   *
   * @example
   * Making the trigger more specific:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(50)
   *     .where('level')
   *     .wasNot(100)
   *     .and.wasNot(50)
   *     .and.isNot(75),
   * ];
   * ```
   *
   * @example
   * Combining with {@link WithAttributesDefinition.or} to form groups:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(10)
   *     .where('level')
   *     .is(100)
   *     .and.wasNot(50)
   *     .or
   *     .is(50)
   *     .and.wasNot(25),
   * ];
   * ```
   */
  get and(): AwaitChangeFilterDefinition {
    return new AwaitChangeFilterDefinition(this.triggerDefinition);
  }

  /**
   * Creates a new change filter group and allows to specify a change filter in
   * it to make the trigger more generic.
   *
   * @example
   * Making the trigger more generic
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(99)
   *     .where('level')
   *     .is(100)
   *     .or.is(50),
   * ];
   * ```
   *
   * @example
   * Combining with {@link WithAttributesDefinition.and} to form groups:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(75)
   *     .where('level')
   *     .is(100)
   *     .and.wasNot(50)
   *     .or
   *     .is(50)
   *     .and.wasNot(25),
   * ];
   * ```
   */
  get or(): AwaitChangeFilterDefinition {
    const { lastAttribute } = this.triggerDefinition;
    if (lastAttribute == null) {
      throw new Error(`There are no attribute filters in WithAttributesDefinition!`);
    }
    lastAttribute.changeGroups.push(new ChangeGroup());
    return new AwaitChangeFilterDefinition(this.triggerDefinition);
  }

  /**
   * Allows to specify another attributes filter to make the trigger more
   * specific.
   *
   * @example
   * A single attribute name:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(44)
   *     .where('level').is(100)
   *     .andWhere('switch').was('off'),
   * ];
   * ```
   *
   * @example
   * Where 3 attribute names are accepted:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(206)
   *     .where('level').isNot(100)
   *     .andWhere('switch', 'level', 'temperature').changed(),
   * ];
   * ```
   *
   * @param attributeName A name of the attribute to accepts events from. You
   * can specify more allowed attribute names using the `otherAttributesNames`.
   * @param otherAttributesNames Other attribute names in case you want to allow
   * device events related to more than one attribute. Optional.
   */
  andWhere(attributeName: string, ...otherAttributesNames: string[]): AwaitChangeFilterDefinition {
    const attributeFilter = new AttributeFilter();
    attributeFilter.attributeNames = [attributeName, ...otherAttributesNames];
    this.triggerDefinition.attributes.push(attributeFilter);
    return new AwaitChangeFilterDefinition(this.triggerDefinition);
  }
}
