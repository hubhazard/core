import { HubitatDeviceTriggerDefinition } from '../trigger-definition/hubitat-device-trigger.definition';
import { WithoutAttributesDefinition } from './without-attributes.definition';

/**
 * A hubitat device trigger definition builder. Used when describing trigger
 * definitions in automations.
 */
export class HubitatDeviceTrigger {
  /**
   * Creates a trigger accepting trigger-definition user-automations-module from all devices.
   */
  static forAllDevices(): WithoutAttributesDefinition {
    return new WithoutAttributesDefinition(new HubitatDeviceTriggerDefinition());
  }

  /**
   * Creates a trigger accepting user-automations-module from specified devices. You need to
   * specify at least one device id.
   */
  static for(deviceId: number, ...otherDevicesIds: number[]): WithoutAttributesDefinition {
    const trigger = new HubitatDeviceTriggerDefinition();
    trigger.devices = [deviceId, ...otherDevicesIds];
    return new WithoutAttributesDefinition(trigger);
  }
}
