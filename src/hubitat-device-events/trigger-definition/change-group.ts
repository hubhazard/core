/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { ChangeFilter } from './change-filter';
import { HubitatDeviceEvent } from '../hubitat-device-event';
import { all } from '../../common/collections-helpers';

/**
 * A group of {@link ChangeFilter change filters} configurations for the
 * attributes value change filtering. Learn more in {@link AttributeFilter} docs.
 */
export class ChangeGroup {
  /**
   * A list of filters to filter the attribute's value through. A value needs to
   * match all filters.
   */
  filters: ChangeFilter[] = [];

  /**
   * Returns the last filter of the group.
   * @returns Returns the last filter or `undefined` if there are no filters.
   */
  get lastFilter(): ChangeFilter | undefined {
    if (this.filters.length === 0) return undefined;
    return this.filters[this.filters.length - 1];
  }

  /**
   * Verifies if the provided event is matching the requirements of this group.
   * @param event An event to match.
   * @returns Returns a value indicating whether the event is a match.
   */
  match(event: HubitatDeviceEvent): boolean {
    if (this.filters.length === 0) return true;
    return all(this.filters, (filter) => filter.match(event));
  }
}
