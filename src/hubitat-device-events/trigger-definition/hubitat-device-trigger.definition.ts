/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { TriggerDefinition } from '../../automations/trigger-definition';
import { AttributeFilter } from './attribute-filter';
import { HUBITAT_DEVICE_EVENT_TYPE } from '../hubitat-device-event-type.const';
import { HubitatDeviceEvent } from '../hubitat-device-event';
import { any } from '../../common/collections-helpers';

/**
 * A class defining a hubitat device trigger.
 */
export class HubitatDeviceTriggerDefinition extends TriggerDefinition {
  /**
   * A string value describing the hubitat device event type.
   */
  triggerType = HUBITAT_DEVICE_EVENT_TYPE;

  /**
   * A list of device IDs. This trigger will accept only events from those
   * devices. If the list is empty, events won't be filtered by device ID.
   */
  devices: number[] = [];

  /**
   * A list of attribute filters. This trigger will accept only events matching
   * at least one of those attributes. If the list is empty, events won't be
   * filtered by their attribute name and/or value.
   */
  attributes: AttributeFilter[] = [];

  /**
   * Returns a list of all attribute names contained in
   * {@link HubitatDeviceTriggerDefinition.attributes `attributes`} field.
   * There are no duplicates on that list.
   * @returns Returns a list of all attributes without duplicates.
   */
  get allAttributeNames(): string[] {
    if (this.attributes.length === 0) return [];
    const attributeNamesInChunks = this.attributes.map((attribute) => attribute.attributeNames);
    let attributeNames: string[] = [];
    attributeNames = attributeNames.concat(...attributeNamesInChunks);
    const attributeNamesSet = new Set(attributeNames);
    return [...attributeNamesSet];
  }

  /**
   * Returns the last attribute filter of this definition.
   * @returns Returns the last attribute filter or `undefined`
   * if there are no attribute filters.
   */
  get lastAttribute(): AttributeFilter | undefined {
    if (this.attributes.length === 0) return undefined;
    return this.attributes[this.attributes.length - 1];
  }

  /**
   * Verifies if the provided event is matching the requirements of this trigger.
   * @param event An event to match.
   * @returns Returns a value indicating whether the event is a match.
   */
  match(event: HubitatDeviceEvent): boolean {
    // Filter devices
    if (this.devices.length > 0 && !this.devices.includes(event.deviceId)) return false;
    // Filter attributes
    if (this.attributes.length > 0) {
      return any(this.attributes, (attribute) => attribute.match(event));
    }
    // No filters specified, pass everything
    return true;
  }
}
