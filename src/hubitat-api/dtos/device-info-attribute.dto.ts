/**
 * @packageDocumentation
 * @module HubitatApi
 */

/**
 * All possible values of the {@link DeviceInfoAttributeDto.dataType}.
 */
type EDeviceAttributeDataType = 'ENUM' | 'JSON_OBJECT' | 'NUMBER' | 'STRING';

/**
 * DTO describing attributes of a device received from
 * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API) as
 * a part of {@link DeviceInfoDto}.
 */
export class DeviceInfoAttributeDto {
  /**
   * A name of the attribute.
   */
  name: string;

  /**
   * Current value of the attribute.
   */
  currentValue: string | number | null;

  /**
   * A type of the attribute value's data.
   */
  dataType: EDeviceAttributeDataType;

  /**
   * A list of values of the attribute.
   */
  values?: string[];
}
