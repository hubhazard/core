import { ChangeFilter } from '../trigger-definition/change-filter';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { WithAttributesDefinition } from './with-attributes.definition';

export class AwaitChangeFilterDefinition {
  private triggerDefinition: HubitatDeviceTriggerDefinition;

  constructor(triggerDefinition: HubitatDeviceTriggerDefinition) {
    this.triggerDefinition = triggerDefinition;
  }

  /**
   * Adds a change filter that accepts all attribute's value changes.
   */
  changes(): WithAttributesDefinition {
    return this.registerChangeFilter('changes');
  }

  /**
   * Adds a change filter that accepts only current attribute's value equal to
   * the one specified.
   */
  is(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter('is', value);
  }

  /**
   * Adds a change filter that accepts only previous attribute's value equal to
   * the one specified.
   */
  was(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter('was', value);
  }

  /**
   * Adds a change filter that accepts only current attribute's value other than
   * the one specified.
   */
  isNot(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter('is-not', value);
  }

  /**
   * Adds a change filter that accepts only previous attribute's value other than
   * the one specified.
   */
  wasNot(value: string | number): WithAttributesDefinition {
    return this.registerChangeFilter('was-not', value);
  }

  private registerChangeFilter(name: string, value?: string | number): WithAttributesDefinition {
    const filter = new ChangeFilter();
    filter.name = name;
    if (value != null) filter.value = value;
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
