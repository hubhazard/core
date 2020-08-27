import { TimerTriggerDefinition } from './timer-trigger-definition';
import { isTimerEvent } from '../is-timer-event.function';

describe('TimerTriggerDefinition', () => {
  describe('constructor()', () => {
    it('should create the trigger without any errors', () => {
      expect(() => new TimerTriggerDefinition()).not.toThrow();
    });

    it('should create trigger with empty data entries list', () => {
      expect(new TimerTriggerDefinition().data).toEqual([]);
    });
  });

  describe('triggerType', () => {
    it('should return Timer', () => {
      expect(isTimerEvent(new TimerTriggerDefinition())).toBeTruthy();
    });
  });
});
