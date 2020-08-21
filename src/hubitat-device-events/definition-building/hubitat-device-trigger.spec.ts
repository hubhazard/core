import { BuildableToTriggerDefinition } from '../../automations/buildable-to-trigger-definition';
import { TriggerDefinition } from '../../automations/trigger-definition';
import { doTimes, pickRandom } from '../../common/collections-helpers';
import { randomIntRange } from '../../common/number-helpers';
import { AttributeFilter } from '../trigger-definition/attribute-filter';
import { randomAttributeFilters } from '../trigger-definition/attribute-filter.spec';
import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { HubitatDeviceTrigger } from './hubitat-device-trigger';

export type DUTriggerType = 'all-device' | 'devices-only' | 'attributes-only' | 'devices-attributes' | 'random';

function randomDeviceId(): number {
  return randomIntRange(1, 500);
}

function randomDeviceIds(num: number): number[] {
  return doTimes(num, () => randomDeviceId());
}

function randomNumberOfDeviceIds(): number[] {
  return randomDeviceIds(randomIntRange(1, 6));
}

export function makeDeviceTriggerDef(
  devices: number[],
  attributeFilters: AttributeFilter[],
): HubitatDeviceTriggerDefinition {
  const trigger = new HubitatDeviceTriggerDefinition();
  trigger.devices = devices;
  trigger.attributes = attributeFilters;
  return trigger;
}

export function randomDeviceTriggerDef(type: DUTriggerType): HubitatDeviceTriggerDefinition {
  if (type === 'random') {
    type = pickRandom(['all-device', 'devices-only', 'attributes-only', 'devices-attributes']) ?? 'all-device';
  }
  switch (type) {
    case 'all-device':
      return makeDeviceTriggerDef([], []);
    case 'devices-only': {
      const devices = randomNumberOfDeviceIds();
      return makeDeviceTriggerDef(devices, []);
    }
    case 'attributes-only': {
      const attributes = randomAttributeFilters(randomIntRange(1, 6));
      return makeDeviceTriggerDef([], attributes);
    }
    case 'devices-attributes': {
      const devices = randomNumberOfDeviceIds();
      const attributes = randomAttributeFilters(randomIntRange(1, 6));
      return makeDeviceTriggerDef(devices, attributes);
    }
    default:
      throw new Error(`Can't generate random DU trigger. This error should not appear... ever.`);
  }
}

export function randomDeviceTriggerDefs(num: number): HubitatDeviceTriggerDefinition[] {
  return doTimes(num, () => randomDeviceTriggerDef('random'));
}

describe('HubitatDeviceTrigger test', () => {
  describe('makeDeviceTriggerDef', () => {
    it('should create a valid trigger when passed all arguments', () => {
      doTimes(30, () => {
        const devices = randomNumberOfDeviceIds();
        const attributes = randomAttributeFilters(randomIntRange(1, 6));
        const trigger = makeDeviceTriggerDef(devices, attributes);
        expect(trigger).toBeInstanceOf(HubitatDeviceTriggerDefinition);
        expect(trigger.devices).toBe(devices);
        expect(trigger.attributes).toBe(attributes);
      });
    });

    it('should create a valid trigger when passed just devices', () => {
      doTimes(30, () => {
        const devices = randomNumberOfDeviceIds();
        const trigger = makeDeviceTriggerDef(devices, []);
        expect(trigger).toBeInstanceOf(HubitatDeviceTriggerDefinition);
        expect(trigger.devices).toBe(devices);
        expect(trigger.attributes).toEqual([]);
      });
    });

    it('should create a valid trigger when passed just attributes', () => {
      doTimes(30, () => {
        const attributes = randomAttributeFilters(randomIntRange(1, 6));
        const trigger = makeDeviceTriggerDef([], attributes);
        expect(trigger).toBeInstanceOf(HubitatDeviceTriggerDefinition);
        expect(trigger.devices).toEqual([]);
        expect(trigger.attributes).toBe(attributes);
      });
    });

    it('should create a valid trigger when passed no devices & no attributes', () => {
      doTimes(30, () => {
        const trigger = makeDeviceTriggerDef([], []);
        expect(trigger).toBeInstanceOf(HubitatDeviceTriggerDefinition);
        expect(trigger.devices).toEqual([]);
        expect(trigger.attributes).toEqual([]);
      });
    });
  });
});

describe('HubitatDeviceTrigger', () => {
  describe('static forAllDevices', () => {
    it('should return a valid buildable trigger definition', () => {
      expect(HubitatDeviceTrigger.forAllDevices()).toBeInstanceOf(BuildableToTriggerDefinition);
      expect(HubitatDeviceTrigger.forAllDevices().build()).toBeInstanceOf(TriggerDefinition);
    });

    it('should return a trigger definition with no devices', () => {
      const td = HubitatDeviceTrigger.forAllDevices().build() as HubitatDeviceTriggerDefinition;
      expect(td.devices).toEqual([]);
    });

    it('should return a trigger definition with no attributes', () => {
      const td = HubitatDeviceTrigger.forAllDevices().build() as HubitatDeviceTriggerDefinition;
      expect(td.attributes).toEqual([]);
    });
  });

  describe('static for', () => {
    it('should return a valid buildable trigger definition given single device id', () => {
      doTimes(5, () => {
        expect(HubitatDeviceTrigger.for(randomDeviceId())).toBeInstanceOf(BuildableToTriggerDefinition);
        expect(HubitatDeviceTrigger.for(randomDeviceId()).build()).toBeInstanceOf(TriggerDefinition);
      });
    });

    it('should return a valid buildable trigger definition given multiple device ids', () => {
      doTimes(5, () => {
        expect(HubitatDeviceTrigger.for(randomDeviceId(), ...randomNumberOfDeviceIds())).toBeInstanceOf(
          BuildableToTriggerDefinition,
        );
        expect(HubitatDeviceTrigger.for(randomDeviceId(), ...randomNumberOfDeviceIds()).build()).toBeInstanceOf(
          TriggerDefinition,
        );
      });
    });

    it('should return a trigger definition with provided devices', () => {
      doTimes(5, () => {
        const device = randomDeviceId();
        const restOfDevices = randomNumberOfDeviceIds();
        const allDevices = [device, ...restOfDevices];
        expect((HubitatDeviceTrigger.for(device).build() as HubitatDeviceTriggerDefinition).devices).toEqual([device]);
        expect(
          (HubitatDeviceTrigger.for(device, ...restOfDevices).build() as HubitatDeviceTriggerDefinition).devices,
        ).toEqual(allDevices);
      });
    });

    it('should return a trigger definition with no attributes', () => {
      doTimes(5, () => {
        expect(
          (HubitatDeviceTrigger.for(randomDeviceId()).build() as HubitatDeviceTriggerDefinition).attributes,
        ).toEqual([]);
        expect(
          (HubitatDeviceTrigger.for(
            randomDeviceId(),
            ...randomNumberOfDeviceIds(),
          ).build() as HubitatDeviceTriggerDefinition).attributes,
        ).toEqual([]);
      });
    });
  });
});
