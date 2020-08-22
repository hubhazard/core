/**
 * @packageDocumentation
 * @module HubitatApi
 */

/**
 * DTO describing an attribute of the device's capability.
 */
export class DeviceInfoCapabilityAttributeDto {
  /**
   * Name of the attribute.
   */
  name: string;

  /**
   * Type of attribute value's data.
   */
  dataType: unknown | null;
}
