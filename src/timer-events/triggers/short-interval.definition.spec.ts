import { TriggerDefinition } from '../../automations/trigger-definition';
import { doTimes } from '../../common/collections-helpers';
import { randomIntRange } from '../../common/number-helpers';
import { ShortIntervalDefinition } from './short-interval.definition';
import { TimerTrigger } from './timer-trigger';
import { TimerTriggerDefinition } from './timer-trigger-definition';
import { randomShortIntervalUnit } from './timer-trigger.spec';

export function randomShortIntervalDefs(num: number): ShortIntervalDefinition[] {
  return doTimes(num, () => TimerTrigger.every(randomIntRange(1, 5000), randomShortIntervalUnit()));
}

describe('ShortIntervalDefinition', () => {
  describe('constructor(...)', () => {
    it('should throw an error when trigger does not contain date entries', () => {
      doTimes(30, () => {
        const td = new TimerTriggerDefinition();
        expect(() => new ShortIntervalDefinition(td)).toThrow();
      });
    });
  });

  describe('build()', () => {
    it('should return TriggerDefinition', () => {
      randomShortIntervalDefs(30).forEach((shortIntervalDef) => {
        expect(shortIntervalDef.build()).toBeInstanceOf(TriggerDefinition);
      });
    });

    it('should return instance of TimerTriggerDefinition', () => {
      randomShortIntervalDefs(30).forEach((shordIntervalDef) => {
        expect(shordIntervalDef.build()).toBeInstanceOf(TimerTriggerDefinition);
      });
    });
  });
});
