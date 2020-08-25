/**
 * @packageDocumentation
 * @module HubitatApi
 */

import { DeviceInfoCapabilityAttributeDto } from './device-info-capability-attribute.dto';

/**
 * DTO describing a capability of a device received from
 * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API) as
 * a part of {@link DeviceInfoDto}.
 */
export class DeviceInfoCapabilityDto {
  /**
   * A list of attributes related to the capability.
   */
  attributes: DeviceInfoCapabilityAttributeDto[];
}
