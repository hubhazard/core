/**
 * DTO for the device update event from Hubitat's Maker API.
 */
export class DeviceEventDto {
  /**
   * Id of the device.
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
