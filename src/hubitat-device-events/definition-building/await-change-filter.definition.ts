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
  is(value: string | number | null): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (typeof value === 'number') return event.newValue === `${value}`;
      return event.newValue === value;
    });
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
  was(value: string | number | null | undefined): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (typeof value === 'number') return event.previousValue === `${value}`;
      return event.previousValue === value;
    });
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
  isNot(value: string | number | null): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (typeof value === 'number') return event.newValue !== `${value}`;
      return event.newValue !== value;
    });
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
  wasNot(value: string | number | null | undefined): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (typeof value === 'number') return event.previousValue !== `${value}`;
      return event.previousValue !== value;
    });
  }

  /**
   * Adds a change filter that accepts only current attribute's value greater
   * than the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(119)
   *     .where('level')
   *     .isGreaterThan(15),
   * ];
   * ```
   *
   * @param value A value of the attribute that is not allowed to match the trigger.
   */
  isGreaterThan(value: number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (event.newValue == null) return false;
      return Number(event.newValue) > value;
    });
  }

  /**
   * Adds a change filter that accepts only previous attribute's value greater
   * than the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(119)
   *     .where('level')
   *     .wasGreaterThan(15),
   * ];
   * ```
   *
   * @param value A value of the attribute that is not allowed to match the trigger.
   */
  wasGreaterThan(value: number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (event.previousValue == null) return false;
      return Number(event.previousValue) > value;
    });
  }

  /**
   * Adds a change filter that accepts only current attribute's value lesser
   * than the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(119)
   *     .where('level')
   *     .isLesserThan(15),
   * ];
   * ```
   *
   * @param value A value of the attribute that is not allowed to match the trigger.
   */
  isLesserThan(value: number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (event.newValue == null) return false;
      return Number(event.newValue) < value;
    });
  }

  /**
   * Adds a change filter that accepts only previous attribute's value lesser
   * than the one specified.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(119)
   *     .where('level')
   *     .wasLesserThan(15),
   * ];
   * ```
   *
   * @param value A value of the attribute that is not allowed to match the trigger.
   */
  wasLesserThan(value: number): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (event.previousValue == null) return false;
      return Number(event.previousValue) < value;
    });
  }

  /**
   * Adds a change filter that accepts only current attribute's value only when
   * it increased in comparison to the previous one.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(119)
   *     .where('level')
   *     .increased(),
   * ];
   * ```
   */
  increased(): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (event.newValue == null || event.previousValue == null) return false;
      return Number(event.previousValue) < Number(event.newValue);
    });
  }

  /**
   * Adds a change filter that accepts only current attribute's value only when
   * it decreased in comparison to the previous one.
   *
   * @example
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(119)
   *     .where('level')
   *     .decreased(),
   * ];
   * ```
   */
  decreased(): WithAttributesDefinition {
    return this.registerChangeFilter((event) => {
      if (event.newValue == null || event.previousValue == null) return false;
      return Number(event.previousValue) > Number(event.newValue);
    });
  }

  /**
   * Adds a change filter with custom filtering function.
   * @param filterFunction A function that decides what events is accepted
   * (`=> true`) and what event is rejected (`=> false`).
   */
  customFilter(filterFunction: HubitatEventMatchFunction): WithAttributesDefinition {
    return this.registerChangeFilter(filterFunction);
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

  private registerChangeFilter(matchFunction: HubitatEventMatchFunction): WithAttributesDefinition {
    const filter = new ChangeFilter(matchFunction);
    this.addChangeFilter(filter);
    return new WithAttributesDefinition(this.triggerDefinition);
  }
}
