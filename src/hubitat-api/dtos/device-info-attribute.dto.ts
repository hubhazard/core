type EDeviceAttributeDataType = 'ENUM' | 'JSON_OBJECT' | 'NUMBER' | 'STRING';

/**
 * DTO describing attributes of a device.
 */
export class DeviceInfoAttributeDto {
  /**
   * Name of the attribute.
   */
  name: string;

  /**
   * Current value of the attribute.
   */
  currentValue: string | number | null;

  /**
   * Type of the attribute value's data.
   */
  dataType: EDeviceAttributeDataType;

  /**
   * List of values of the attribute.
   */
  values?: string[];
}
