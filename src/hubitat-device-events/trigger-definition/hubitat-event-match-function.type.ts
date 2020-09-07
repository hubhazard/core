/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { HubitatDeviceEvent } from '../hubitat-device-event';

/**
 * A function type used to verify if hubitat event matches requirements of a
 * trigger or it's part.
 */
export type HubitatEventMatchFunction = (event: HubitatDeviceEvent) => boolean;
