/**
 * @packageDocumentation
 * @module HubitatApi
 */

/**
 * DTO describing a device in the devices list received from
 * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API).
 */
export class DevicesListItemDto {
  /**
   * An ID of the device.
   */
  id: string;

  /**
   * A name of the device.
   */
  name: string;

  /**
   * A label of the device.
   */
  label: string;
}
