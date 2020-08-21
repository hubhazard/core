import { DeviceInfoAttributeDto } from './device-info-attribute.dto';
import { DeviceInfoCapabilityDto } from './device-info-capability.dto';

/**
 * DTO describing a device in full detail.
 */
export class DeviceInfoDto {
  /**
   * Id of the device.
   */
  id: string;

  /**
   * Name of the device.
   */
  name: string;

  /**
   * Label of the device.
   */
  label: string;

  /**
   * List of capabilities of the device.
   */
  capabilities: (string | DeviceInfoCapabilityDto)[];

  /**
   * List of attributes of the device.
   */
  attributes: DeviceInfoAttributeDto[];

  /**
   * List of commands supported by the device.
   */
  commands: string[];
}
