/**
 * @packageDocumentation
 * @module HubitatApi
 */

/**
 * DTO for the device update event received from the
 * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API).
 */
export class DeviceEventDto {
  /**
   * Id of the device. Should be parsable into an integer.
   */
  deviceId: string;

  /**
   * Name of the device's attribute for the event.
   */
  name: string;

  /**
   * New value of the device's attribute.
   */
  value: string | null;
}
