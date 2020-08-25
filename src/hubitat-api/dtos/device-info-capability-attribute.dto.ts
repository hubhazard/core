/**
 * @packageDocumentation
 * @module HubitatApi
 */

/**
 * DTO describing an attribute of the device's capability received from
 * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API) as
 * a part of {@link DeviceInfoCapabilityDto}.
 */
export class DeviceInfoCapabilityAttributeDto {
  /**
   * A name of the attribute.
   */
  name: string;

  /**
   * A type of attribute value's data.
   */
  dataType: unknown | null;
}
