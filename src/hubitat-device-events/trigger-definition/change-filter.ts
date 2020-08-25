/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

/**
 * A class representing a configuration af a filter for the attributes value
 * change. Learn more in {@link AttributeFilter} docs.
 */
export class ChangeFilter {
  /**
   * A name of the filter to apply.
   */
  name: string;

  /**
   * A value of the filter to apply. It's existence depends on the filter.
   */
  value?: string | number;
}
