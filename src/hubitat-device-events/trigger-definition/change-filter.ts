/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { HubitatEventMatchFunction } from './hubitat-event-match-function.type';

/**
 * A class representing a configuration af a filter for the attributes value
 * change. Learn more in {@link AttributeFilter} docs.
 */
export class ChangeFilter {
  /**
   * Verifies if the provided event is matching the requirements of this filter.
   * @param event An event to match.
   * @returns Returns a value indicating whether the event is a match.
   */
  match: HubitatEventMatchFunction;

  /**
   * Creates a change filter with provided matching function.
   * @param matchFunction A function that verifies if provided event is matching
   * the requirements of this filter.
   */
  constructor(matchFunction: HubitatEventMatchFunction) {
    this.match = matchFunction;
  }
}
