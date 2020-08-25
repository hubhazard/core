/**
 * @packageDocumentation
 * @module TimerEvents
 */

import { Injectable } from '@nestjs/common';
import { interval, Subscription } from 'rxjs';
import { Automation } from '../automations/automation';
import { AutomationsService } from '../automations/automations.service';
import { IEventsService } from '../automations/events-service.interface';
import { TriggerDefinition } from '../automations/trigger-definition';
import { TIMER_EVENT_TYPE, TimerEvent } from './timer-event';
import { TimerTriggerDefinition } from './triggers/timer-trigger-definition';

/**
 * An events service for timer events. Allows for registering actions triggered
 * periodically.
 */
@Injectable()
export class TimerEventsService implements IEventsService {
  /**
   * A map of interval subscriptions. The key is an automation name, while
   * the value is a list of subscriptions.
   * @private
   */
  private intervalSubscriptionsMap: Map<string, Subscription[]> = new Map<string, Subscription[]>();

  /**
   * A set of automations that are subscribed to timer events.
   * @private
   */
  private subscribedAutomations: Set<Automation> = new Set<Automation>();

  /**
   * Creates a service instance. Use only for testing as service's creation
   * is handled by the Dependency Injection.
   *
   * @param automationsService A reference to the {@link AutomationsService}
   * instance that this events service will registered to.
   */
  constructor(private readonly automationsService: AutomationsService) {
    automationsService.registerEventsService(this);
  }

  /**
   * Registers provided automation to this events service. If the automation
   * doesn't contain any valid timer triggers, it won't be registered.
   * @param automation The automation to be registered.
   */
  registerAutomation(automation: Automation): void {
    // Don't allow registering of same automation twice.
    if (this.subscribedAutomations.has(automation)) {
      throw new Error(`The "${automation.name}" automation is already registered. Consider unregistering first.`);
    }

    // Get timer triggers
    const triggers = this.getCompatibleTriggers(automation.builtTriggers);

    // If there's no timer trigger, abort registration
    if (triggers.length < 1) return;

    // Register automation
    this.subscribedAutomations.add(automation);

    // Create intervals and subscribe to them
    const triggerSubscriptions: Subscription[] = [];
    for (const trigger of triggers) {
      // Get interval length
      const intervalLength = this.getMilliseconds(trigger);
      if (intervalLength == null) {
        throw new Error(`Can't register automation "${automation.name}". One trigger is invalid.`);
      }

      // Create the trigger event with small delay and then register the correct interval.
      // This way the event will be fired once before waiting for next interval.
      // Without it in case of an interval of 24 hours the first automation call
      // would be after 24 hours which in most cases is not desirable.
      setTimeout(async () => {
        // Call for the first time TODO
        try {
          const event = new TimerEvent();
          await automation.handleEvent(event);
        } catch (e) {
          console.error(`The "${automation.name}" automation failed to handle the timer event.`);
        }

        // Create interval
        const triggerInterval = interval(intervalLength);

        // Subscribe to the interval
        const intervalSubscription = triggerInterval.subscribe(async () => {
          try {
            const event = new TimerEvent();
            await automation.handleEvent(event);
          } catch (e) {
            console.error(`The "${automation.name}" automation failed to handle the timer event.`);
          }
        });

        triggerSubscriptions.push(intervalSubscription);
      }, 500);
    }

    // Save intervals
    this.intervalSubscriptionsMap.set(automation.name, triggerSubscriptions);
  }

  /**
   * Unregisters provided automation from this events service.
   * @param automation The automation to be unregistered.
   */
  unregisterAutomation(automation: Automation): void {
    this.subscribedAutomations.delete(automation);
    const triggerSubscriptions = this.intervalSubscriptionsMap.get(automation.name);
    if (triggerSubscriptions != null) {
      for (const triggerSubscription of triggerSubscriptions) {
        triggerSubscription.unsubscribe();
      }
      this.intervalSubscriptionsMap.delete(automation.name);
    }
  }

  /**
   * Returns only timer trigger definitions found in provided list of trigger
   * definitions.
   * @private
   */
  private getCompatibleTriggers(triggerDefinitions: TriggerDefinition[]): TimerTriggerDefinition[] {
    const validTriggers = triggerDefinitions.filter((trigger) => trigger.triggerType === TIMER_EVENT_TYPE);
    return validTriggers as TimerTriggerDefinition[];
  }

  /**
   * Returns a number of milliseconds for an interval described in provided
   * trigger. Returns `undefined` in case the trigger is invalid.
   * @private
   */
  private getMilliseconds(trigger: TimerTriggerDefinition): number | undefined {
    // Multi-unit intervals are not supported yet.
    if (trigger.data.length !== 1) {
      console.error('Multi-unit intervals are not supported yet.');
      return undefined;
    }

    const data = trigger.data[0];
    let ms = 50;
    switch (data.unit) {
      case 'hours':
        ms = data.value * 1000 * 60 * 60;
        break;
      case 'minutes':
        ms = data.value * 1000 * 60;
        break;
      case 'seconds':
        ms = data.value * 1000;
        break;
      case 'ms':
        ms = data.value;
        break;
      default:
        break;
    }
    // Don't let the interval to be too small for the server to handle
    // TODO: Make configurable
    if (ms < 50) ms = 50;
    return ms;
  }
}
