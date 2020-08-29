import { name } from 'faker';
import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { doTimes } from '../../common/collections-helpers';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { AwaitChangeFilterDefinition } from './await-change-filter.definition';
import { randomDeviceTriggerDef } from './hubitat-device-trigger.spec';
import { WithAttributesDefinition } from './with-attributes.definition';
import { getWithAttributes } from './with-attributes.definition.spec';
import { randomIntRange } from '../../common/number-helpers';
import { HubitatDeviceEvent } from '../hubitat-device-event';
import { HubitatDevice } from '../hubitat-device';

function createEvent(
  newValue: string | number | null,
  previousValue: string | number | null | undefined,
): HubitatDeviceEvent {
  return new HubitatDeviceEvent(
    'some-attribute',
    {} as HubitatDevice,
    randomIntRange(1, 300),
    newValue == null ? newValue : String(newValue),
    previousValue == null ? previousValue : String(previousValue),
  );
}

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

    it('should accept all events', () => {
      const test = (newValue: string | null) => {
        const event = createEvent(newValue, undefined);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .changes()
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBeTruthy();
      };

      test(null);
      test('null');
      test('undefined');
      test('0');
      test('1.123');
      test('on');
      test('-1');
      test('off');
      test('hello-world');
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

    it('should accept only events with equal newValue', () => {
      const test = (newValue: string | null, filterValue: string | number | null, expected: boolean) => {
        const event = createEvent(newValue, undefined);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .is(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Null values
      test(null, null, true);
      test(null, 'null', false);
      test(null, 0, false);
      test('null', null, false);

      // String values
      test('on', 'on', true);
      test('on', 'off', false);

      // Number values
      test('6', 6, true);
      test('0', 0, true);
      test('-1356', -1356, true);
      test('0.22', 0.22, true);
      test('0.2199999999999', 0.22, false);
      test('0.333337', 0.333337, true);
      test('0.3333370001', 0.333337, false);
      test('20066648497.12135', 20066648497.12135, true);
      test('20066648497.12135', 20066648497.12136, false);
      test('on', 3, false);
      test('56', '56', true);
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

    it('should accept only events with not equal newValue', () => {
      const test = (newValue: string | null, filterValue: string | number | null, expected: boolean) => {
        const event = createEvent(newValue, undefined);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .isNot(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Null values
      test(null, null, false);
      test(null, 'null', true);
      test(null, 0, true);
      test('null', null, true);

      // String values
      test('on', 'on', false);
      test('on', 'off', true);

      // Number values
      test('6', 6, false);
      test('0', 0, false);
      test('-1356', -1356, false);
      test('0.22', 0.22, false);
      test('0.2199999999999', 0.22, true);
      test('0.333337', 0.333337, false);
      test('0.3333370001', 0.333337, true);
      test('20066648497.12135', 20066648497.12135, false);
      test('20066648497.12135', 20066648497.12136, true);
      test('on', 3, true);
      test('56', '56', false);
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

    it('should accept only events with equal previousValue', () => {
      const test = (
        previousValue: string | null | undefined,
        filterValue: string | number | null | undefined,
        expected: boolean,
      ) => {
        const event = createEvent(null, previousValue);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .was(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Undefined values
      test(undefined, undefined, true);
      test(undefined, null, false);
      test(undefined, 'null', false);
      test(undefined, 0, false);
      test(undefined, 'undefined', false);

      // Null values
      test(null, null, true);
      test(null, 'null', false);
      test(null, 0, false);
      test('null', null, false);

      // String values
      test('on', 'on', true);
      test('on', 'off', false);

      // Number values
      test('6', 6, true);
      test('0', 0, true);
      test('-1356', -1356, true);
      test('0.22', 0.22, true);
      test('0.2199999999999', 0.22, false);
      test('0.333337', 0.333337, true);
      test('0.3333370001', 0.333337, false);
      test('20066648497.12135', 20066648497.12135, true);
      test('20066648497.12135', 20066648497.12136, false);
      test('on', 3, false);
      test('56', '56', true);
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

    it('should accept only events with not equal previousValue', () => {
      const test = (
        previousValue: string | null | undefined,
        filterValue: string | number | null | undefined,
        expected: boolean,
      ) => {
        const event = createEvent(null, previousValue);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .wasNot(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Undefined values
      test(undefined, undefined, false);
      test(undefined, null, true);
      test(undefined, 'null', true);
      test(undefined, 0, true);
      test(undefined, 'undefined', true);

      // Null values
      test(null, null, false);
      test(null, 'null', true);
      test(null, 0, true);
      test('null', null, true);

      // String values
      test('on', 'on', false);
      test('on', 'off', true);

      // Number values
      test('6', 6, false);
      test('0', 0, false);
      test('-1356', -1356, false);
      test('0.22', 0.22, false);
      test('0.2199999999999', 0.22, true);
      test('0.333337', 0.333337, false);
      test('0.3333370001', 0.333337, true);
      test('20066648497.12135', 20066648497.12135, false);
      test('20066648497.12135', 20066648497.12136, true);
      test('on', 3, true);
      test('56', '56', false);
    });
  });

  describe('isGreaterThan', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        expect(awaitingChange.isGreaterThan(randomIntRange(0, 100))).toBeInstanceOf(WithAttributesDefinition);
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
        awaitingChangeFilter.isGreaterThan(randomIntRange(0, 100));
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
        awaitingChangeFilter.isGreaterThan(randomIntRange(0, 100));
      }).toThrow();
    });

    it('should accept only events with newValue greater than specified', () => {
      const test = (newValue: string | null, filterValue: number, expected: boolean) => {
        const event = createEvent(newValue, undefined);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .isGreaterThan(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Null values
      test(null, 123, false);
      test(null, 321.35, false);
      test(null, -154, false);
      test(null, -553.44948, false);

      // String values
      test('active', 153, false);
      test('inactive', -556.8841, false);

      // Number values
      test('6', 6, false);
      test('6', 5, true);
      test('0', 1010.1, false);
      test('1010.1001', 1010.1, true);
      test('-1356', -1356, false);
      test('-1350', -1356, true);
      test('0.21', 0.22, false);
      test('0.23', 0.22, true);
    });
  });

  describe('wasGreaterThan', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        expect(awaitingChange.wasGreaterThan(randomIntRange(0, 100))).toBeInstanceOf(WithAttributesDefinition);
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
        awaitingChangeFilter.wasGreaterThan(randomIntRange(0, 100));
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
        awaitingChangeFilter.wasGreaterThan(randomIntRange(0, 100));
      }).toThrow();
    });

    it('should accept only events with previousValue greater than specified', () => {
      const test = (previousValue: string | null | undefined, filterValue: number, expected: boolean) => {
        const event = createEvent(null, previousValue);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .wasGreaterThan(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Undefined values
      test(undefined, 0, false);
      test(undefined, -1015, false);
      test(undefined, 3151, false);

      // Null values
      test(null, 123, false);
      test(null, 321.35, false);
      test(null, -154, false);
      test(null, -553.44948, false);

      // String values
      test('active', 153, false);
      test('inactive', -556.8841, false);

      // Number values
      test('6', 6, false);
      test('6', 5, true);
      test('0', 1010.1, false);
      test('1010.1001', 1010.1, true);
      test('-1356', -1356, false);
      test('-1350', -1356, true);
      test('0.21', 0.22, false);
      test('0.23', 0.22, true);
    });
  });

  describe('isLesserThan', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        expect(awaitingChange.isLesserThan(randomIntRange(0, 100))).toBeInstanceOf(WithAttributesDefinition);
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
        awaitingChangeFilter.isLesserThan(randomIntRange(0, 100));
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
        awaitingChangeFilter.isLesserThan(randomIntRange(0, 100));
      }).toThrow();
    });

    it('should accept only events with newValue lesser than specified', () => {
      const test = (newValue: string | null, filterValue: number, expected: boolean) => {
        const event = createEvent(newValue, undefined);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .isLesserThan(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Null values
      test(null, 123, false);
      test(null, 321.35, false);
      test(null, -154, false);
      test(null, -553.44948, false);

      // String values
      test('active', 153, false);
      test('inactive', -556.8841, false);

      // Number values
      test('6', 6, false);
      test('4', 5, true);
      test('0', 1010.1, true);
      test('1010.0999', 1010.1, true);
      test('-1350', -1356, false);
      test('-1358', -1356, true);
      test('0.21', 0.22, true);
      test('0.23', 0.22, false);
    });
  });

  describe('wasLesserThan', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        expect(awaitingChange.wasLesserThan(randomIntRange(0, 100))).toBeInstanceOf(WithAttributesDefinition);
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
        awaitingChangeFilter.wasLesserThan(randomIntRange(0, 100));
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
        awaitingChangeFilter.wasLesserThan(randomIntRange(0, 100));
      }).toThrow();
    });

    it('should accept only events with previousValue lesser than specified', () => {
      const test = (previousValue: string | null | undefined, filterValue: number, expected: boolean) => {
        const event = createEvent(null, previousValue);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .wasLesserThan(filterValue)
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Undefined values
      test(undefined, 0, false);
      test(undefined, -1015, false);
      test(undefined, 3151, false);

      // Null values
      test(null, 123, false);
      test(null, 321.35, false);
      test(null, -154, false);
      test(null, -553.44948, false);

      // String values
      test('active', 153, false);
      test('inactive', -556.8841, false);

      // Number values
      test('6', 6, false);
      test('4', 5, true);
      test('0', 1010.1, true);
      test('1010.0999', 1010.1, true);
      test('-1350', -1356, false);
      test('-1358', -1356, true);
      test('0.21', 0.22, true);
      test('0.23', 0.22, false);
    });
  });

  describe('increased', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        expect(awaitingChange.increased()).toBeInstanceOf(WithAttributesDefinition);
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
        awaitingChangeFilter.increased();
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
        awaitingChangeFilter.increased();
      }).toThrow();
    });

    it('should accept only events where numerical value has increased', () => {
      const test = (newValue: string | null, previousValue: string | null | undefined, expected: boolean) => {
        const event = createEvent(newValue, previousValue);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .increased()
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Undefined values
      test(null, undefined, false);
      test('on', undefined, false);
      test('-1', undefined, false);
      test('1.5', undefined, false);

      // Null values
      test(null, null, false);
      test('on', null, false);
      test('-1', null, false);
      test('1.5', null, false);

      // String values
      test(null, 'on', false);
      test('on', 'off', false);
      test('2', 'one', false);
      test('40', 'five', false);
      test('active', 'active', false);
      test('active', 'inactive', false);

      // Number values
      test(null, '6', false);
      test('on', '0', false);
      test('50', '4', true);
      test('0.00001', '0', true);
      test('15999', '1010.0999', true);
      test('-1351', '-1350', false);
      test('-1357.999', '-1358', true);
      test('1', '0.21', true);
      test('-6', '0.23', false);
    });
  });

  describe('decreased', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        expect(awaitingChange.decreased()).toBeInstanceOf(WithAttributesDefinition);
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
        awaitingChangeFilter.decreased();
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
        awaitingChangeFilter.decreased();
      }).toThrow();
    });

    it('should accept only events where numerical value has decreased', () => {
      const test = (newValue: string | null, previousValue: string | null | undefined, expected: boolean) => {
        const event = createEvent(newValue, previousValue);
        const withAttributes = getWithAttributes();
        const trigger = withAttributes
          .andWhere(event.attributeName)
          .decreased()
          .build() as HubitatDeviceTriggerDefinition;
        expect(trigger.lastAttribute?.lastGroup?.lastFilter?.match(event)).toBe(expected);
      };

      // Undefined values
      test(null, undefined, false);
      test('on', undefined, false);
      test('-1', undefined, false);
      test('1.5', undefined, false);

      // Null values
      test(null, null, false);
      test('on', null, false);
      test('-1', null, false);
      test('1.5', null, false);

      // String values
      test(null, 'on', false);
      test('on', 'off', false);
      test('2', 'one', false);
      test('40', 'five', false);
      test('active', 'active', false);
      test('active', 'inactive', false);

      // Number values
      test(null, '6', false);
      test('on', '0', false);
      test('50', '4', false);
      test('0.00001', '0', false);
      test('0', '0.00001', true);
      test('15999', '1010.0999', false);
      test('-1351', '-1350', true);
      test('-1357.999', '-1358', false);
      test('1', '0.21', false);
      test('-6', '0.23', true);
    });
  });

  describe('customFilter', () => {
    it('should add a new filter to the last group of a last attribute', () => {
      doTimes(15, () => {
        const withAttributes = getWithAttributes();
        const trigger = withAttributes.build() as HubitatDeviceTriggerDefinition;
        const awaitingChange = new AwaitChangeFilterDefinition(trigger);
        const filtersNumber = trigger.lastAttribute?.lastGroup?.filters.length ?? -30;
        const lastFilter = trigger.lastAttribute?.lastGroup?.lastFilter;
        expect(awaitingChange.customFilter(() => true)).toBeInstanceOf(WithAttributesDefinition);
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
        awaitingChangeFilter.customFilter(() => true);
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
        awaitingChangeFilter.customFilter(() => true);
      }).toThrow();
    });
  });
});
