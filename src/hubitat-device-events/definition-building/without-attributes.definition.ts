/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { AttributeFilter } from '../trigger-definition/attribute-filter';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';

/**
 * An in-progress {@link HubitatDeviceTriggerDefinition} builder class.
 */
export class WithoutAttributesDefinition extends BuildableToTriggerDefinition {
  protected triggerDefinition: HubitatDeviceTriggerDefinition;

  /**
   * @internal
   */
  constructor(triggerDefinition: HubitatDeviceTriggerDefinition) {
    super();
    this.triggerDefinition = triggerDefinition;
  }

  /**
   * Allows only events where updated attribute name is within specified list.
   *
   * @example
   * A single attribute name:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(7)
   *     .where('level').wasNot(50),
   * ];
   * ```
   *
   * @example
   * Where 3 attribute names are accepted:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(354)
   *     .where('temperature', 'pressure', 'humidity').changes(),
   * ];
   * ```
   *
   * @param attributeName A name of the attribute to accepts events from. You
   * can specify more allowed attribute names using the `otherAttributesNames`.
   * @param otherAttributesNames Other attribute names in case you want to allow
   * device events related to more than one attribute. Optional.
   */
  where(attributeName: string, ...otherAttributesNames: string[]): AwaitChangeFilterDefinition {
    const attributeFilter = new AttributeFilter();
    attributeFilter.attributeNames = [attributeName, ...otherAttributesNames];
    this.triggerDefinition.attributes.push(attributeFilter);
    return new AwaitChangeFilterDefinition(this.triggerDefinition);
  }
}
