/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { WithoutAttributesDefinition } from './without-attributes.definition';

/**
 * A hubitat device trigger definition builder. Used when describing trigger
 * definitions in automations.
 */
export class HubitatDeviceTrigger {
  /**
   * Creates a trigger accepting device events sent by any device.
   *
   * @example
   * Accept all device events from all devices:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.forAllDevices(),
   * ];
   * ```
   *
   * @example
   * Accept events from all devices but only about the `switch` attribute being
   * changed:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.forAllDevices()
   *     .where('switch').changes(),
   * ];
   * ```
   */
  static forAllDevices(): WithoutAttributesDefinition {
    return new WithoutAttributesDefinition(new HubitatDeviceTriggerDefinition());
  }

  /**
   * Creates a trigger accepting user-automations-module from specified devices. You need to
   * specify at least one device id.
   */
  /**
   * Creates a trigger accepting user-automations-module from specified devices.
   * You need to specify at least one device id.
   *
   * @example
   * Accept all device events from one device:
   * ```ts
   * readonly triggers = [
   *   HubitatDeviceTrigger.for(68),
   * ];
   * ```
   *
   * @example
   * Accept events from 3 devices but only about the `level` or 'switch'
   * attribute being changed:
   * ```ts
   * const DESK_LAMP = 61;
   * const DRESSER_LAMP = 62;
   * const TABLE_LAMP = 65;
   *
   * readonly triggers = [
   *   HubitatDeviceTrigger
   *     .for(DESK_LAMP, DRESSER_LAMP, TABLE_LAMP)
   *     .where('level', 'switch').changes(),
   * ];
   * ```
   *
   * @param deviceId An ID of the device to accepts events from. You
   * can specify more allowed device IDs using the `otherDevicesIds`.
   * @param otherDevicesIds Other device IDs in case you want to allow
   * device events from more than one device. Optional.
   */
  static for(deviceId: number, ...otherDevicesIds: number[]): WithoutAttributesDefinition {
    const trigger = new HubitatDeviceTriggerDefinition();
    trigger.devices = [deviceId, ...otherDevicesIds];
    return new WithoutAttributesDefinition(trigger);
  }
}
