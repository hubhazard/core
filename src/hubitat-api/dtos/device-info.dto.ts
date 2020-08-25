/**
 * @packageDocumentation
 * @module HubitatApi
 */

import { DeviceInfoAttributeDto } from './device-info-attribute.dto';
import { DeviceInfoCapabilityDto } from './device-info-capability.dto';

/**
 * DTO describing a device in full detail as received from
 * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API).
 */
export class DeviceInfoDto {
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

  /**
   * A list of capabilities of the device.
   */
  capabilities: (string | DeviceInfoCapabilityDto)[];

  /**
   * A list of attributes of the device.
   */
  attributes: DeviceInfoAttributeDto[];

  /**
   * A list of commands supported by the device.
   */
  commands: string[];
}
