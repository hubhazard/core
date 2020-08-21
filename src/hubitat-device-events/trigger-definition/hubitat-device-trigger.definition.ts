import { TriggerDefinition } from '../../automations/trigger-definition';
import { HUBITAT_DEVICE_EVENT_TYPE } from '../hubitat-device-event';
import { AttributeFilter } from './attribute-filter';

/**
 * A class defining a hubitat device trigger.
 */
export class HubitatDeviceTriggerDefinition extends TriggerDefinition {
  triggerType = HUBITAT_DEVICE_EVENT_TYPE;

  /**
   * A list of device ids. This trigger will accept only events from those
   * device. If the list is empty, events won't be filtered by device id.
   */
  devices: number[] = [];

  /**
   * A list of attribute filters. This trigger will accept only events matching
   * those attributes. If the list is empty, events won't be filtered by their
   * attribute name and/or value.
   */
  attributes: AttributeFilter[] = [];

  /**
   * Returns a list of all attribute names contained in `attributes` field.
   * There are no duplicates on that list.
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
   * Returns the last attribute filter of this definition. Returns `undefined`
   * if there are no attribute filters.
   */
  get lastAttribute(): AttributeFilter | undefined {
    if (this.attributes.length === 0) return undefined;
    return this.attributes[this.attributes.length - 1];
  }
}
