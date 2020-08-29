/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { Injectable } from '@nestjs/common';
import { Automation } from '../automations/automation';
import { AutomationsService } from '../automations/automations.service';
import { IEventsService } from '../automations/events-service.interface';
import { TriggerDefinition } from '../automations/trigger-definition';
import { SubscribersMap } from '../common/subscribers-map';
import { SubscribersSet } from '../common/subscribers-set';
import { HubitatDeviceEvent } from './hubitat-device-event';
import { HubitatDeviceTriggerDefinition } from './trigger-definition/hubitat-device-trigger.definition';
import { isHubitatDeviceEvent } from './is-hubitat-device-event.function';
import { any } from '../common/collections-helpers';

/**
 * An events service handling Hubitat's device events. It's responsible for
 * registering automations and routing the device events to listening
 * automations.
 */
@Injectable()
export class HubitatDeviceEventsService implements IEventsService {
  /**
   * A map of automations sets subscribed by device id.
   * @private
   */
  private subscriptionsByDeviceId: SubscribersMap<number, Automation> = new SubscribersMap<number, Automation>();

  /**
   * A map of automations sets subscribed by attribute name.
   * @private
   */
  private subscriptionsByAttributeName: SubscribersMap<string, Automation> = new SubscribersMap<string, Automation>();

  /**
   * A set of automations subscribed to all hubitat device events.
   * @private
   */
  private subscriptionsOfAllEvents: SubscribersSet<Automation> = new SubscribersSet<Automation>();

  /**
   * A set of all subscribed automations.
   * @private
   */
  private subscribedAutomations: Set<Automation> = new Set<Automation>();

  /**
   * Creates a new service instance. Use only for testing as service's creation
   * is handled by the Dependency Injection.
   *
   * @param automationsService A reference to the {@link AutomationsService}
   * instance that this events service will registered to.
   */
  constructor(private readonly automationsService: AutomationsService) {
    automationsService.registerEventsService(this);
  }

  /**
   * A method for handling new hubitat device events. It's responsible for routing
   * the event to matching automations.
   * @param event
   */
  public handleEvent(event: HubitatDeviceEvent): void {
    // Handle only device update user-automations-module
    if (!isHubitatDeviceEvent(event)) return;

    // Create working copy of all subscribing user-automations
    const unhandledAutomations = new Set(this.subscribedAutomations);

    const runMatchingAutomation = (automation: Automation) => {
      if (!unhandledAutomations.has(automation)) return;
      if (!this.matchEvent(automation, event)) return;
      unhandledAutomations.delete(automation);
      try {
        automation.handleEvent(event);
      } catch (e) {
        console.error(`Error occurred in the "${automation.name}" automation: ${e}`);
        throw new Error(`The automation "${automation.name}" failed to handle event: ${JSON.stringify(event)}`);
      }
    };

    // Handle the 'subscribed to all user-automations-module' user-automations
    for (const automation of this.subscriptionsOfAllEvents) {
      runMatchingAutomation(automation);
    }

    // Handle the 'subscribed to all user-automations-module of a device' user-automations
    const subscribersSetForDevices = this.subscriptionsByDeviceId.getSet(event.deviceId);
    if (subscribersSetForDevices != null) {
      for (const automation of subscribersSetForDevices) {
        runMatchingAutomation(automation);
      }
    }

    // Handle the 'subscribed to attribute name only' user-automations
    const subscribersSetForAttributeOnly = this.subscriptionsByAttributeName.getSet(event.attributeName);
    if (subscribersSetForAttributeOnly != null) {
      for (const automation of subscribersSetForAttributeOnly) {
        runMatchingAutomation(automation);
      }
    }
  }

  /**
   * Registers provided automation by automatically subscribing to event types
   * described by trigger definitions.
   * @param automation Automation to subscribe.
   */
  public registerAutomation(automation: Automation): void {
    // Don't allow registering of same automation twice.
    if (this.subscribedAutomations.has(automation)) {
      throw new Error(`The "${automation.name}" automation is already registered. Consider unregistering first.`);
    }

    const triggers = this.getCompatibleTriggers(automation.builtTriggers);
    if (triggers.length < 1) return;

    for (const trigger of triggers) {
      // All user-automations-module
      if (trigger.devices.length === 0 && trigger.attributes.length === 0) {
        this.subscribedAutomations.add(automation);
        this.subscriptionsOfAllEvents.subscribe(automation);
      }
      // HubitatDevice id user-automations-module
      else if (trigger.devices.length > 0) {
        this.subscribedAutomations.add(automation);
        for (const deviceId of trigger.devices) {
          this.subscriptionsByDeviceId.subscribe(deviceId, automation);
        }
      }
      // Attribute name user-automations-module
      else if (trigger.attributes.length > 0) {
        this.subscribedAutomations.add(automation);
        for (const attributeName of trigger.allAttributeNames) {
          this.subscriptionsByAttributeName.subscribe(attributeName, automation);
        }
      }
    }
  }

  /**
   * Unregisters provided automation by automatically unsubscribing from event
   * types described by trigger definitions.
   * @param automation Automation to unsubscribe.
   */
  public unregisterAutomation(automation: Automation): void {
    const triggers = this.getCompatibleTriggers(automation.builtTriggers);
    for (const trigger of triggers) {
      // All user-automations-module
      if (trigger.devices.length === 0 && trigger.attributes.length === 0) {
        this.subscriptionsOfAllEvents.unsubscribe(automation);
      }
      // HubitatDevice id user-automations-module
      else if (trigger.devices.length > 0) {
        for (const deviceId of trigger.devices) {
          this.subscriptionsByDeviceId.unsubscribe(deviceId, automation);
        }
      }
      // Attribute name user-automations-module
      else if (trigger.attributes.length > 0) {
        for (const attributeName of trigger.allAttributeNames) {
          this.subscriptionsByAttributeName.unsubscribe(attributeName, automation);
        }
      }
    }
    this.recreateSubscribedAutomationsSet();
  }

  private getCompatibleTriggers(triggerDefinitions: TriggerDefinition[]): HubitatDeviceTriggerDefinition[] {
    const validTriggers = triggerDefinitions.filter(isHubitatDeviceEvent);
    return validTriggers as HubitatDeviceTriggerDefinition[];
  }

  /**
   * Recreates subscribedAutomationsSet set from scratch by analyzing all
   * subscriptions.
   */
  private recreateSubscribedAutomationsSet(): void {
    const automations = new Set<Automation>(this.subscriptionsOfAllEvents);
    const deviceIdAutomations = this.subscriptionsByDeviceId.getSubscribers();
    const deviceAttributeNameAutomations = this.subscriptionsByAttributeName.getSubscribers();
    this.subscribedAutomations = new Set([...automations, ...deviceIdAutomations, ...deviceAttributeNameAutomations]);
  }

  private matchEvent(automation: Automation, event: HubitatDeviceEvent): boolean {
    const triggers = this.getCompatibleTriggers(automation.builtTriggers);
    if (triggers.length === 0) return false; // Don't run automations without triggers
    return any(triggers, (trigger) => trigger.match(event));
  }
}
