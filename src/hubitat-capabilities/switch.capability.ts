import { HubitatDevice } from '../hubitat-device-events/hubitat-device';
import { getDevice } from './capabilities.helpers';

export function isAnySwitchOn(devices: (HubitatDevice | number)[]): boolean {
  return devices.some((device) => isSwitchOn(device));
}

export { isAnySwitchOn as isAnyOn } from './switch.capability';

/**
 Returns current switch status. True is 'on', false is 'off'.
 */
export function isSwitchOn(device: HubitatDevice): boolean;

/**
 Returns current switch status. True is 'on', false is 'off'.
 */
export function isSwitchOn(deviceId: number): boolean;

/**
 Returns current switch status. True is 'on', false is 'off'.
 */
export function isSwitchOn(deviceOrId: HubitatDevice | number): boolean;

export function isSwitchOn(deviceOrId: HubitatDevice | number): boolean {
  return getDevice(deviceOrId).getAttributeAsString('switch') === 'on';
}

export { isSwitchOn as isOn } from './switch.capability';

/**
 Sets switch to specified setting. True is 'on', false is 'off'.
 */
export async function setSwitch(device: HubitatDevice, setting: boolean | 'on' | 'off'): Promise<void>;

/**
 Sets switch to specified setting. True is 'on', false is 'off'.
 */
export async function setSwitch(deviceId: number, setting: boolean | 'on' | 'off'): Promise<void>;

export async function setSwitch(deviceOrId: HubitatDevice | number, setting: boolean | 'on' | 'off'): Promise<void> {
  if (typeof setting === 'boolean') setting = setting ? 'on' : 'off';
  const device = getDevice(deviceOrId);
  device.setAttribute('switch', setting);
  await device.sendCommand(setting);
}

/**
 Toggles the switch.
 */
export async function toggleSwitch(device: HubitatDevice): Promise<void>;

/**
 Toggles the switch.
 */
export async function toggleSwitch(deviceId: number): Promise<void>;

export async function toggleSwitch(deviceOrId: HubitatDevice | number): Promise<void> {
  const device = getDevice(deviceOrId);
  const currentSetting = isSwitchOn(device);
  if (currentSetting == null) return;
  await setSwitch(device, !currentSetting);
}

export { toggleSwitch as toggle } from './switch.capability';
