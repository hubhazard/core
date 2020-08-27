/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { AutomationEvent } from '../automations/automation-event';
import { HubitatDevice } from './hubitat-device';
import { HUBITAT_DEVICE_EVENT_TYPE } from './hubitat-device-event-type.const';

/**
 * A Hubitat device event. It represents a single attribute value change in a
 * Hubitat device.
 */
export class HubitatDeviceEvent extends AutomationEvent {
  /**
   * A string value describing the hubitat device event type.
   */
  readonly eventType = HUBITAT_DEVICE_EVENT_TYPE;

  /**
   * Creates a new event instance.
   * @param attributeName A name of the attribute which value has changed.
   * @param device A reference to the updated device.
   * @param deviceId An id of the changed device.
   * @param newValue A new value of the specified attribute.
   * @param previousValue A value of the specified attribute before the change
   * appeared.
   */
  public constructor(
    public readonly attributeName: string,
    public readonly device: HubitatDevice,
    public readonly deviceId: number,
    public readonly newValue: string | null,
    public readonly previousValue: string | null | undefined,
  ) {
    super();
  }
}
