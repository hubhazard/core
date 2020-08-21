import { TIMER_EVENT_TYPE } from '../timer-event';
import { TimerTriggerDefinition } from './timer-trigger-definition';

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
      expect(new TimerTriggerDefinition().triggerType).toEqual(TIMER_EVENT_TYPE);
    });
  });
});
