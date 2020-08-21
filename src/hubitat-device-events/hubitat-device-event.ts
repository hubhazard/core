import { AutomationEvent } from '../automations/automation-event';
import { HubitatDevice } from './hubitat-device';

/**
 * A string value describing hubitat device event type.
 */
export const HUBITAT_DEVICE_EVENT_TYPE = 'hubitat-device';

/**
 * A Hubitat device event. It represents a single attribute value change in a
 * Hubitat device.
 */
export class HubitatDeviceEvent extends AutomationEvent {
  readonly eventType = HUBITAT_DEVICE_EVENT_TYPE;

  /**
   * Creates a new `HubitatDeviceEvent`
   * @param attributeName A name of the attribute which value has changed.
   * @param device A reference to the updated device.
   * @param deviceId An id of the changed device.
   * @param newValue A new value of the specified attribute.
   * @param previousValue A value of the specified attribute before the change
   *        appeared.
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
