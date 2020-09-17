import { doTimes } from '../../common/collections-helpers';
import { randomIntRange } from '../../common/number-helpers';
import { ShortIntervalDefinition } from './short-interval.definition';
import { randomShortIntervalDefs } from './short-interval.definition.spec';
import { EShortIntervalUnit, TimerTrigger } from './timer-trigger';
import { TimerTriggerDefinition } from './timer-trigger-definition';

export function randomShortIntervalUnit(): ShortIntervalUnit {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return 'ms';
    case 1:
      return 'minutes';
    case 2:
      return 'seconds';
    case 3:
      return 'hours';
    default:
      throw new Error(`Failed to get random short interval unit.`);
  }
}

describe('TimerTrigger', () => {
  describe('every(...)', () => {
    it('should throw an error when the value is "0"', () => {
      expect(() => TimerTrigger.every(0, 'ms')).toThrow();
      expect(() => TimerTrigger.every(0, 'seconds')).toThrow();
      expect(() => TimerTrigger.every(0, 'minutes')).toThrow();
      expect(() => TimerTrigger.every(0, 'hours')).toThrow();
    });

    it('should return TTriggerShortInterval', () => {
      randomShortIntervalDefs(30).forEach((shortIntervalDef) => {
        expect(shortIntervalDef).toBeInstanceOf(ShortIntervalDefinition);
      });
    });

    const getTriggerDefinitions: (num: number) => TimerTriggerDefinition[] = (num: number) => {
      return randomShortIntervalDefs(num).map((interval) => interval.build() as TimerTriggerDefinition);
    };

    it('should return only one data entry', () => {
      getTriggerDefinitions(30).forEach((triggerDef) => {
        expect(triggerDef.data.length).toBe(1);
      });
    });

    it('the returned value should contain correct data entry', () => {
      doTimes(30, () => {
        const value = randomIntRange(1, 5000);
        const unit = randomShortIntervalUnit();
        const td = TimerTrigger.every(value, unit).build() as TimerTriggerDefinition;
        expect(td.data[0].value).toBe(value);
        expect(td.data[0].unit).toBe(unit);
      });
    });
  });
});
