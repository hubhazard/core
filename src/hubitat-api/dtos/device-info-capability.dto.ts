/**
 * @packageDocumentation
 * @module HubitatApi
 */

import { DeviceInfoCapabilityAttributeDto } from './device-info-capability-attribute.dto';

/**
 * DTO describing a capability of a device.
 */
export class DeviceInfoCapabilityDto {
  /**
   * List of attributes related to the capability.
   */
  attributes: DeviceInfoCapabilityAttributeDto[];
}
