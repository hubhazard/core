/**
 * @packageDocumentation
 * @module HubitatCapabilities
 */

/**
 * Possible thermostat operating modes.
 */
export type EThermostatOperatingState =
  | 'heating'
  | 'pending cool'
  | 'pending heat'
  | 'vent economizer'
  | 'idle'
  | 'cooling'
  | 'fan only';
