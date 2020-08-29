/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { ChangeGroup } from './change-group';
import { HubitatDeviceEvent } from '../hubitat-device-event';
import { any } from '../../common/collections-helpers';

/**
 * A class defining the attribute names that are allowed to trigger the event
 * along with filters for specifying allowed values of those attributes.
 * The value filters ({@link ChangeFilter}) are divided into groups
 * ({@link ChangeGroup}). All filters within a group must be a *match* for the
 * event to be accepted as allowed to be passed to the automation.
 *
 * Group: { Filter_A AND Filter_B AND Filter_C }
 *
 * Each group is
 * an alternative to the previous group, as if previous group fails to be a
 * *match* the next group will be evaluated. It could be represented as:
 *
 * AttributeFilter: { Group_A OR Group_B OR Group C }
 */
export class AttributeFilter {
  /**
   * A list of attribute names accepted by the trigger.
   */
  attributeNames: string[] = [];

  /**
   * A list of groups of filters for matching the attributes' values.
   */
  changeGroups: ChangeGroup[] = [new ChangeGroup()];

  /**
   * Returns the last change group on the list.
   * @returns Returns the last group or `undefined` if the
   * {@link AttributeFilter.changeGroups} is an empty array.
   */
  get lastGroup(): ChangeGroup | undefined {
    if (this.changeGroups.length === 0) return undefined;
    return this.changeGroups[this.changeGroups.length - 1];
  }

  /**
   * Verifies if the provided event is matching the requirements of this attribute filter.
   * @param event An event to match.
   * @returns Returns a value indicating whether the event is a match.
   */
  match(event: HubitatDeviceEvent): boolean {
    if (!this.attributeNames.includes(event.attributeName)) return false;
    return any(this.changeGroups, (group) => group.match(event));
  }
}
