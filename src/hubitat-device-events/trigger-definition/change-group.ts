/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { ChangeFilter } from './change-filter';

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
}
