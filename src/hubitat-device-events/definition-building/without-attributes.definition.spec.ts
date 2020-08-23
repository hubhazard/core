import { name } from 'faker';
import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { TriggerDefinition } from '../../automations/trigger-definition';
import { doTimes, repeat } from '../../common/collections-helpers';
import { randomIntRange } from '../../common/number-helpers';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';
import { randomDeviceTriggerDef } from './hubitat-device-trigger.spec';
import { WithAttributesDefinition } from './with-attributes.definition';
import { WithoutAttributesDefinition } from './without-attributes.definition';

function getWithoutAttributes(): WithoutAttributesDefinition {
  return new WithoutAttributesDefinition(randomDeviceTriggerDef('devices-only'));
}

describe('WithoutAttributesDefinition', () => {
  describe('constructor', () => {
    it('should return WithoutAttributesDefinition', () => {
      const trigger = randomDeviceTriggerDef('random');
      expect(new WithoutAttributesDefinition(trigger)).toBeInstanceOf(WithoutAttributesDefinition);
    });

    it('should be buildable to TriggerDefinition', () => {
      const trigger = randomDeviceTriggerDef('random');
      expect(new WithoutAttributesDefinition(trigger)).toBeInstanceOf(BuildableToTriggerDefinition);
      expect(new WithoutAttributesDefinition(trigger).build()).toBeInstanceOf(TriggerDefinition);
      expect(new WithoutAttributesDefinition(trigger).build()).toBe(trigger);
    });
  });

  describe('where', () => {
    it('should return a valid definition with one attribute name', () => {
      doTimes(15, () => {
        const withoutAttributes = getWithoutAttributes();
        const attributeName = name.findName();
        const awaitingChangeFilter = withoutAttributes.where(attributeName);
        expect(awaitingChangeFilter).toBeInstanceOf(AwaitChangeFilterDefinition);
        const triggerDefinition = awaitingChangeFilter.changes().build() as HubitatDeviceTriggerDefinition;
        expect(triggerDefinition.attributes.length).toBe(1);
        expect(triggerDefinition.attributes[0].attributeNames.length).toBe(1);
        expect(triggerDefinition.attributes[0].attributeNames[0]).toBe(attributeName);
      });
    });

    it('should return a valid definition with many attribute names', () => {
      doTimes(15, () => {
        const withoutAttributes = getWithoutAttributes();
        const name1 = name.findName();
        const restOfNames = repeat(Math.random() * 4).map(() => name.findName());
        const allNames = [name1, ...restOfNames];
        const awaitingChangeFilter = withoutAttributes.where(name1, ...restOfNames);
        expect(awaitingChangeFilter).toBeInstanceOf(AwaitChangeFilterDefinition);
        const triggerDefinition = awaitingChangeFilter.changes().build() as HubitatDeviceTriggerDefinition;
        expect(triggerDefinition.attributes.length).toBe(1);
        expect(triggerDefinition.allAttributeNames.length).toBe(allNames.length);
        expect(triggerDefinition.allAttributeNames.sort()).toEqual(allNames.sort());
      });
    });

    it('should always add new attribute filter', () => {
      const withoutAttributes = getWithoutAttributes();
      const triggerWOA = withoutAttributes.build() as HubitatDeviceTriggerDefinition;
      expect(triggerWOA.attributes.length).toBe(0);
      let withAttributes: WithAttributesDefinition;
      doTimes(15, (index) => {
        const names = doTimes(randomIntRange(1, 5), () => name.findName());
        const [firstName, ...restOfNames] = names;
        withAttributes = withoutAttributes.where(firstName, ...restOfNames).changes();
        const triggerWA = withAttributes.build() as HubitatDeviceTriggerDefinition;
        expect(triggerWA.attributes.length).toBe(index + 1);
        const { lastAttribute } = triggerWA;
        if (lastAttribute == null) throw new Error(`There are no attributes after adding one.`);
        expect(lastAttribute.attributeNames).toEqual(names);
      });
    });
  });
});
