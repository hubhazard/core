import { doTimes } from '../../common/collections-helpers';
import { randomIntRange } from '../../common/number-helpers';
import { randomDeviceTriggerDef } from '../definition-building/hubitat-device-trigger.spec';
import { randomAttributeFilter, randomAttributeFilters } from './attribute-filter.spec';
import { isHubitatDeviceEvent } from '../is-hubitat-device-event.function';

describe('HubitatDeviceTriggerDefinition', () => {
  describe('triggerType', () => {
    it('should return DeviceUpdate', () => {
      expect(isHubitatDeviceEvent(randomDeviceTriggerDef('random'))).toBeTruthy();
    });
  });

  describe('get allAttributeNames', () => {
    it('should return an empty array if attributes are an empty array', () => {
      doTimes(5, () => {
        const td = randomDeviceTriggerDef('random');
        td.attributes = [];
        expect(td.allAttributeNames).toEqual([]);
      });
    });

    it('should return correct attributes and correct number of attribute names', () => {
      doTimes(15, () => {
        const trigger = randomDeviceTriggerDef('random');
        const attributeFilters = randomAttributeFilters(randomIntRange(0, 5));
        trigger.attributes = attributeFilters;
        const allAttributes = new Set<string>();
        for (const filter of attributeFilters) {
          for (const attributeName of filter.attributeNames) {
            allAttributes.add(attributeName);
          }
        }
        const numberOfAttributes = allAttributes.size;
        expect(trigger.allAttributeNames.length).toBe(numberOfAttributes);
        expect(trigger.allAttributeNames.sort()).toEqual(Array.from(allAttributes).sort());
      });
    });
  });

  describe('get lastAttribute', () => {
    it('should return an undefined if attributes property is an empty array', () => {
      doTimes(15, () => {
        const trigger = randomDeviceTriggerDef('random');
        trigger.attributes = [];
        expect(trigger.lastAttribute).toBeUndefined();
      });
    });

    it('should return the last attribute', () => {
      doTimes(15, () => {
        const trigger = randomDeviceTriggerDef('random');
        const lastAttribute = randomAttributeFilter();
        trigger.attributes.push(lastAttribute);
        expect(trigger.lastAttribute).toBe(lastAttribute);
      });
    });
  });
});
