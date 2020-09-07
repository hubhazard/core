/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

/**
 * Convert the *enum list* received from Hubitat into the JS-friendly string list.
 * @param enumList An *enum list* from Hubitat in format: `[valueA, valueB, value C]`.
 * @returns Returns a list of values as strings: `["valueA", "valueB", "value C"]` .
 */
export function enumListToStringList(enumList: string): string[] {
  // Check if the enumList string is within []
  if (enumList.length < 2 || enumList.charAt(0) !== '[' || enumList.charAt(enumList.length - 1) !== ']') {
    console.error(`Failed to convert the enum list ("${enumList}") into string list.`);
    return [];
  }

  // Remove surrounding brackets
  enumList = enumList.substring(1, enumList.length - 1);

  // Extract values
  return enumList
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}
