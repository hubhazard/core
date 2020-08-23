import { name } from 'faker';
import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { TriggerDefinition } from '../../automations/trigger-definition';
import { doTimes, repeat } from '../../common/collections-helpers';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';
import { randomDeviceTriggerDef } from './hubitat-device-trigger.spec';
import { WithAttributesDefinition } from './with-attributes.definition';

export function getWithAttributes(): WithAttributesDefinition {
  return new WithAttributesDefinition(randomDeviceTriggerDef('devices-attributes'));
}

describe('WithAttributesDefinition', () => {
  describe('constructor', () => {
    it('should return WithAttributesDefinition', () => {
      const trigger = randomDeviceTriggerDef('attributes-only');
      expect(new WithAttributesDefinition(trigger)).toBeInstanceOf(WithAttributesDefinition);
    });

    it('should be buildable to TriggerDefinition', () => {
      const trigger = randomDeviceTriggerDef('devices-attributes');
      expect(new WithAttributesDefinition(trigger)).toBeInstanceOf(BuildableToTriggerDefinition);
      expect(new WithAttributesDefinition(trigger).build()).toBeInstanceOf(TriggerDefinition);
      expect(new WithAttributesDefinition(trigger).build()).toBe(trigger);
    });

    it(`should throw an error if trigger definition doesn't contain any attributes`, () => {
      const trigger = randomDeviceTriggerDef('devices-only');
      expect(() => {
        return new WithAttributesDefinition(trigger);
      }).toThrow();
    });
  });

  describe('andWhere', () => {
    it('should return a valid definition with one attribute name', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const attributesNumber = trigger.attributes.length;
        const name1 = name.findName();
        const awaitingChangeFilter = withAttributes.andWhere(name1);
        expect(awaitingChangeFilter).toBeInstanceOf(AwaitChangeFilterDefinition);
        const triggerDefinition = awaitingChangeFilter.changes().build() as HubitatDeviceTriggerDefinition;
        expect(triggerDefinition.attributes.length).toBe(attributesNumber + 1);
        const { lastAttribute } = triggerDefinition;
        if (lastAttribute == null) throw new Error(`There are no attributes after adding one.`);
        expect(lastAttribute.attributeNames.length).toBe(1);
        expect(lastAttribute.attributeNames[0]).toBe(name1);
      });
    });

    it('should return a valid definition with many attribute names', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const initialAttributesNumber = trigger.attributes.length;
        const initialAllAttributesNames = trigger.allAttributeNames;
        const name1 = name.findName();
        const restOfNames = repeat(Math.random() * 4).map(() => name.findName());
        const allNames = [name1, ...restOfNames];
        const awaitingChangeFilter = withAttributes.andWhere(name1, ...restOfNames);
        expect(awaitingChangeFilter).toBeInstanceOf(AwaitChangeFilterDefinition);
        const triggerDefinition = awaitingChangeFilter.changes().build() as HubitatDeviceTriggerDefinition;
        expect(triggerDefinition.attributes.length).toBe(initialAttributesNumber + 1);
        expect(triggerDefinition.allAttributeNames.length).toBe(initialAllAttributesNames.length + allNames.length);
        expect(triggerDefinition.allAttributeNames.sort()).toEqual([...initialAllAttributesNames, ...allNames].sort());
      });
    });

    it('should always add new attribute filter', () => {
      let withAttributes = getWithAttributes();
      const td = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const numberOfAttributes = td.attributes.length;
      for (let i = 1; i <= 30; i++) {
        const names = repeat(Math.random() * 5 + 1).map(() => name.findName());
        const [firstName, ...restOfNames] = names;
        withAttributes = withAttributes.andWhere(firstName, ...restOfNames).changes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        expect(trigger.attributes.length).toBe(numberOfAttributes + i);
        const { lastAttribute } = trigger;
        if (lastAttribute == null) throw new Error(`There are no attributes after adding one.`);
        expect(lastAttribute.attributeNames).toEqual(names);
      }
    });
  });

  describe('get and', () => {
    it('should return TriggerDefinitionAwaitingChangeFilter', () => {
      const withAttributes = getWithAttributes();
      expect(withAttributes.and).toBeInstanceOf(AwaitChangeFilterDefinition);
    });

    it('should allow to add change filter in the last group', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const { lastAttribute } = trigger;
        if (lastAttribute == null) throw new Error(`There are no attributes!`);
        const initialGroupsNumber = lastAttribute.changeGroups.length;
        const { lastGroup } = lastAttribute;
        if (lastGroup == null) throw new Error(`There are no groups!`);
        const initialGroupFiltersCount = lastGroup.filters.length;
        const builtAfterAnd = withAttributes.and.changes().build() as HubitatDeviceTriggerDefinition;
        const lastAttributeAfterAnd = builtAfterAnd.lastAttribute;
        if (lastAttributeAfterAnd == null) throw new Error(`There are no attributes!`);
        expect(lastAttributeAfterAnd.changeGroups.length).toBe(initialGroupsNumber);
        const lastGroupAfterAnd = lastAttributeAfterAnd.lastGroup;
        if (lastGroupAfterAnd == null) throw new Error(`There are no groups!`);
        expect(lastGroupAfterAnd.filters.length).toBe(initialGroupFiltersCount + 1);
      });
    });
  });

  describe('get or', () => {
    it('should return TriggerDefinitionAwaitingChangeFilter', () => {
      const withAttributes = getWithAttributes();
      expect(withAttributes.or).toBeInstanceOf(AwaitChangeFilterDefinition);
    });

    it('should create a new group and add new filter to it', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of repeat(15)) {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const { lastAttribute } = trigger;
        if (lastAttribute == null) throw new Error(`There are no attributes!`);
        const initialGroupsNumber = lastAttribute.changeGroups.length;
        const { lastGroup } = lastAttribute;
        if (lastGroup == null) throw new Error(`There are no groups!`);
        const builtAfterOr = withAttributes.or.changes().build() as HubitatDeviceTriggerDefinition;
        const lastAttributeAfterOr = builtAfterOr.lastAttribute;
        if (lastAttributeAfterOr == null) throw new Error(`There are no attributes!`);
        expect(lastAttributeAfterOr.changeGroups.length).toBe(initialGroupsNumber + 1);
        const lastGroupAfterOr = lastAttributeAfterOr.lastGroup;
        if (lastGroupAfterOr == null) throw new Error(`There are no groups!`);
        expect(lastGroupAfterOr.filters.length).toBe(1);
      }
    });

    it('should throw when there are no attributes', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      trigger.attributes = [];
      expect(() => {
        return withAttributes.or;
      }).toThrow();
    });
  });
});
