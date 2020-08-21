import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { AttributeFilter } from '../trigger-definition/attribute-filter';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';

export class WithoutAttributesDefinition extends BuildableToTriggerDefinition {
  protected triggerDefinition: HubitatDeviceTriggerDefinition;

  constructor(triggerDefinition: HubitatDeviceTriggerDefinition) {
    super();
    this.triggerDefinition = triggerDefinition;
  }

  /**
   * Allows only events where updated attribute name is within specified list.
   */
  where(attributeName: string, ...otherAttributesNames: string[]): AwaitChangeFilterDefinition {
    const attributeFilter = new AttributeFilter();
    attributeFilter.attributeNames = [attributeName, ...otherAttributesNames];
    this.triggerDefinition.attributes.push(attributeFilter);
    return new AwaitChangeFilterDefinition(this.triggerDefinition);
  }
}
