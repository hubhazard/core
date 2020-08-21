import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { AttributeFilter } from '../trigger-definition/attribute-filter';
import { ChangeGroup } from '../trigger-definition/change-group';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';

export class WithAttributesDefinition extends BuildableToTriggerDefinition {
  protected triggerDefinition: HubitatDeviceTriggerDefinition;

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
   * Allows to specify another change filter in a change filter group.
   */
  get and(): AwaitChangeFilterDefinition {
    return new AwaitChangeFilterDefinition(this.triggerDefinition);
  }

  /**
   * Creates a new change filter group and allows to specify a change filter in
   * it.
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
   * Allows to specify another attributes filter.
   */
  andWhere(attributeName: string, ...otherAttributesNames: string[]): AwaitChangeFilterDefinition {
    const attributeFilter = new AttributeFilter();
    attributeFilter.attributeNames = [attributeName, ...otherAttributesNames];
    this.triggerDefinition.attributes.push(attributeFilter);
    return new AwaitChangeFilterDefinition(this.triggerDefinition);
  }
}
