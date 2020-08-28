/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { ChangeFilter } from '../trigger-definition/change-filter';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { WithAttributesDefinition } from './with-attributes.definition';
import { HubitatEventMatchFunction } from '../trigger-definition/hubitat-event-match-function.type';

/**
 * An in-progress {@link HubitatDeviceTriggerDefinition} builder class.
 */
export class AwaitChangeFilterDefinition {
  private triggerDefinition: HubitatDeviceTriggerDefinition;

  /**
   * @internal
   */
  constructor(triggerDefinition: HubitatDeviceTriggerDefinition) {
    this.triggerDefinition = triggerDefinition;
  }

  /**
   * Adds a change filter that accepts all attribute's value changes.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(201)
   *     .where('level')
   *     .changes(),
   * ];
   * ```
   */
  changes(): WithAttributesDefinition {
    return this.registerChangeFilter(() => true);
  }

  /**
   * Adds a change filter that accepts only current attribute's value equal to
   * the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(185)
   *     .where('level')
   *     .is(50),
   * ];
   * ```
   *
   * @param value A value of the attribute that is required to match the trigger.
   */
  is(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => event.newValue === `${value}`);
  }

  /**
   * Adds a change filter that accepts only previous attribute's value equal to
   * the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(60)
   *     .where('level')
   *     .was(50),
   * ];
   * ```
   *
   * @param value A previous value of the attribute that is required to match
   * the trigger.
   */
  was(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => event.previousValue === `${value}`);
  }

  /**
   * Adds a change filter that accepts only current attribute's value other than
   * the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(119)
   *     .where('level')
   *     .isNot(100),
   * ];
   * ```
   *
   * @param value A value of the attribute that is not allowed to match the trigger.
   */
  isNot(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => event.newValue !== `${value}`);
  }

  /**
   * Adds a change filter that accepts only previous attribute's value other than
   * the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(67)
   *     .where('level')
   *     .wasNot(100),
   * ];
   * ```
   *
   * @param value A previous value of the attribute that is not allowed to match
   * the trigger.
   */
  wasNot(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => event.previousValue !== `${value}`);
  }

  private registerChangeFilter(matchFunction: HubitatEventMatchFunction): WithAttributesDefinition {
    const filter = new ChangeFilter(matchFunction);
    this.addChangeFilter(filter);
    return new WithAttributesDefinition(this.triggerDefinition);
  }

  private addChangeFilter(filter: ChangeFilter) {
    const { lastAttribute } = this.triggerDefinition;
    if (lastAttribute == null) {
      throw new Error(`There are no attribute filters in DUTriggerAwaitCF!`);
    }
    const { lastGroup } = lastAttribute;
    if (lastGroup == null) {
      throw new Error(`There are no filter groups in DUTriggerAwaitCF!`);
    }
    lastGroup.filters.push(filter);
  }
}
