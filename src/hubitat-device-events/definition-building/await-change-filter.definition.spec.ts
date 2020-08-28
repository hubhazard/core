import { name } from 'faker';
import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { doTimes } from '../../common/collections-helpers';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';
import { randomDeviceTriggerDef } from './hubitat-device-trigger.spec';
import { WithAttributesDefinition } from './with-attributes.definition';
import { getWithAttributes } from './with-attributes.definition.spec';

describe('AwaitChangeFilterDefinition', () => {
  describe('constructor', () => {
    it('should return AwaitChangeFilterDefinition', () => {
      const trigger = randomDeviceTriggerDef('random');
      expect(new AwaitChangeFilterDefinition(trigger)).toBeInstanceOf(AwaitChangeFilterDefinition);
    });

    it('should not be buildable to TriggerDefinition', () => {
      const trigger = randomDeviceTriggerDef('random');
      expect(new AwaitChangeFilterDefinition(trigger)).not.toBeInstanceOf(BuildableToTriggerDefinition);
    });
  });

  describe('changes', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        // Use 'changes'
        expect(awaitingChange.changes()).toBeInstanceOf(WithAttributesDefinition);
        expect(trigger.lastAttribute?.lastGroup?.filters.length).toEqual(filtersNumber + 1);
        expect(trigger.lastAttribute?.lastGroup?.lastFilter).not.toBe(lastFilter);
      });
    });

    it('should throw error when there are no filter attributes', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      trigger.attributes = [];
      expect(() => {
        awaitingChangeFilter.changes();
      }).toThrow();
    });

    it('should throw error when there are no changes groups', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      const { lastAttribute } = trigger;
      if (lastAttribute == null) throw new Error(`There are no attributes!`);
      lastAttribute.changeGroups = [];
      expect(() => {
        awaitingChangeFilter.changes();
      }).toThrow();
    });
  });

  describe('is', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        // Use 'is'
        expect(awaitingChange.is(name.findName())).toBeInstanceOf(WithAttributesDefinition);
        expect(trigger.lastAttribute?.lastGroup?.filters.length).toEqual(filtersNumber + 1);
        expect(trigger.lastAttribute?.lastGroup?.lastFilter).not.toBe(lastFilter);
      });
    });

    it('should throw when there are no filter attributes', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      trigger.attributes = [];
      expect(() => {
        awaitingChangeFilter.is(name.findName());
      }).toThrow();
    });

    it('should throw when there are no changes groups', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      const { lastAttribute } = trigger;
      if (lastAttribute == null) throw new Error(`There are no attributes!`);
      lastAttribute.changeGroups = [];
      expect(() => {
        awaitingChangeFilter.is(name.findName());
      }).toThrow();
    });
  });

  describe('isNot', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        // Use 'isNot'
        expect(awaitingChange.isNot(name.findName())).toBeInstanceOf(WithAttributesDefinition);
        expect(trigger.lastAttribute?.lastGroup?.filters.length).toEqual(filtersNumber + 1);
        expect(trigger.lastAttribute?.lastGroup?.lastFilter).not.toBe(lastFilter);
      });
    });

    it('should throw when there are no filter attributes', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      trigger.attributes = [];
      expect(() => {
        awaitingChangeFilter.isNot(name.findName());
      }).toThrow();
    });

    it('should throw when there are no changes groups', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      const { lastAttribute } = trigger;
      if (lastAttribute == null) throw new Error(`There are no attributes!`);
      lastAttribute.changeGroups = [];
      expect(() => {
        awaitingChangeFilter.isNot(name.findName());
      }).toThrow();
    });
  });

  describe('was', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        // Use 'was'
        expect(awaitingChange.was(name.findName())).toBeInstanceOf(WithAttributesDefinition);
        expect(trigger.lastAttribute?.lastGroup?.filters.length).toEqual(filtersNumber + 1);
        expect(trigger.lastAttribute?.lastGroup?.lastFilter).not.toBe(lastFilter);
      });
    });

    it('should throw when there are no filter attributes', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      trigger.attributes = [];
      expect(() => {
        awaitingChangeFilter.was(name.findName());
      }).toThrow();
    });

    it('should throw when there are no changes groups', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      const { lastAttribute } = trigger;
      if (lastAttribute == null) throw new Error(`There are no attributes!`);
      lastAttribute.changeGroups = [];
      expect(() => {
        awaitingChangeFilter.was(name.findName());
      }).toThrow();
    });
  });

  describe('wasNot', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        // Use 'wasNot'
        expect(awaitingChange.wasNot(name.findName())).toBeInstanceOf(WithAttributesDefinition);
        expect(trigger.lastAttribute?.lastGroup?.filters.length).toEqual(filtersNumber + 1);
        expect(trigger.lastAttribute?.lastGroup?.lastFilter).not.toBe(lastFilter);
      });
    });

    it('should throw when there are no filter attributes', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      trigger.attributes = [];
      expect(() => {
        awaitingChangeFilter.wasNot(name.findName());
      }).toThrow();
    });

    it('should throw when there are no changes groups', () => {
      const withAttributes = getWithAttributes();
      const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
      const awaitingChangeFilter = withAttributes.andWhere(name.findName());
      const { lastAttribute } = trigger;
      if (lastAttribute == null) throw new Error(`There are no attributes!`);
      lastAttribute.changeGroups = [];
      expect(() => {
        awaitingChangeFilter.wasNot(name.findName());
      }).toThrow();
    });
  });
});
