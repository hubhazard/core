// eslint-disable-next-line max-classes-per-file
import { AutomationEvent } from './automation-event';

describe('AutomationEvent', () => {
  const noAdditionalsType = 'no-additionals';
  const withAdditionals = 'with-additionals';

  class EventWithNoAdditionals extends AutomationEvent {
    readonly eventType = noAdditionalsType;
  }

  class EventWithAdditionals extends AutomationEvent {
    readonly eventType = withAdditionals;

    additionalField = 0;
  }

  it('should force-cast to matching type', () => {
    let event: AutomationEvent = new EventWithNoAdditionals();
    expect(event.handleAs(EventWithNoAdditionals)).toBeInstanceOf(EventWithNoAdditionals);

    event = new EventWithAdditionals();
    expect(event.handleAs(EventWithAdditionals)).toBeInstanceOf(EventWithAdditionals);
  });

  it('should throw an error when force-casting to wrong type', () => {
    let event: AutomationEvent = new EventWithNoAdditionals();
    expect(() => event.handleAs(EventWithAdditionals)).toThrow();

    event = new EventWithAdditionals();
    expect(() => event.handleAs(EventWithNoAdditionals)).toThrow();
  });
});
