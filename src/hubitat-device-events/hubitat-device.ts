/**
 * @packageDocumentation
 * @module HubitatDeviceEvents
 */

import { all } from '../common/collections-helpers';
import { DeviceInfoDto } from '../hubitat-api/dtos/device-info.dto';
import { HubitatApiService } from '../hubitat-api/hubitat-api.service';
import { ECapability } from './capability.enum';
import { HubitatDevicesService } from './hubitat-devices.service';

/**
 * A hubitat's device.
 */
export class HubitatDevice {
  /**
   * A unique id of the device.
   */
  readonly id: number;

  /**
   * Name of the device.
   */
  name: string;

  /**
   * Label of the device.
   */
  label: string;

  /**
   * Set of capabilities of the device.
   * @private
   */
  private capabilities: Set<string>;

  /**
   * A map of device's attributes and their values.
   * @private
   */
  private attributes: Map<string, string | null>;

  /**
   * A set of commands supported by the device.
   * @private
   */
  private commands: Set<string>;

  /**
   * A not-injected reference to the `HubitatApiService`.
   * @private
   */
  private readonly apiService: HubitatApiService;

  /**
   * A not-injected reference to the `HubitatDevicesService`.
   * @private
   */
  private readonly devicesService: HubitatDevicesService;

  constructor(dto: DeviceInfoDto, hubitatApiService: HubitatApiService, devicesService: HubitatDevicesService) {
    this.apiService = hubitatApiService;
    this.devicesService = devicesService;

    // Set basic data: id, name, label
    try {
      this.id = parseInt(dto.id, 10);
    } catch {
      throw new Error(`Can't create a device as can't parse it's id from the dto: ${JSON.stringify(dto)}`);
    }
    this.name = dto.name;
    this.label = dto.label;

    // Set capabilities
    this.capabilities =
      new Set<string>(dto.capabilities.filter((capability) => typeof capability === 'string') as string[]) ??
      new Set<string>();

    // Set attributes
    this.attributes = new Map<string, string>();
    if (dto.attributes != null) {
      for (const rawAttribute of dto.attributes) {
        this.attributes.set(
          rawAttribute.name,
          rawAttribute.currentValue == null ? null : `${rawAttribute.currentValue}`,
        );
      }
    }

    // Set commands
    this.commands = dto.commands == null ? new Set<string>() : new Set<string>(dto.commands);
  }

  /**
   * Returns a value of an attribute with specified name. Returns `undefined` if
   * there is no such attribute.
   */
  getAttribute(attributeName: string): string | null | undefined {
    return this.attributes.get(attributeName);
  }

  /**
   * Returns a list of all attribute names and their values.
   */
  getAttributes(): { attributeName: string; attributeValue: string | null }[] {
    return [...this.attributes.entries()].map((attribute) => ({
      attributeName: attribute[0],
      attributeValue: attribute[1],
    }));
  }

  /**
   * Gets value of the attribute as a floating point number. Returns `0` if
   * there's no such attribute or its value is not parsable.
   */
  getAttributeAsFloat(name: string): number {
    try {
      return parseFloat(this.getAttribute(name) ?? '');
    } catch (e) {
      console.error(`Couldn't parse attribute '${name}' of #${this.id} as a float.`);
      return 0;
    }
  }

  /**
   * Gets value of the attribute as an integer. Returns `0` if there's no such
   * attribute or its value is not parsable.
   */
  getAttributeAsInt(name: string): number {
    try {
      return parseInt(this.getAttribute(name) ?? '', 10);
    } catch (e) {
      console.error(`Couldn't parse attribute '${name}' of #${this.id} as an int.`);
      return 0;
    }
  }

  /**
   * Gets value of the attribute as a string. Returns `undefined` if there's no
   * such attribute or its value is empty.
   */
  getAttributeAsString(name: string): string | undefined {
    return this.getAttribute(name) ?? undefined;
  }

  /**
   * Return a value whether the device contains an attribute with the specified
   * name.
   */
  hasAttribute(attributeName: string): boolean {
    return this.attributes.has(attributeName);
  }

  /**
   * Returns a value whether the device contains the specified capability.
   */
  hasCapability(capability: ECapability): boolean {
    return this.capabilities.has(capability);
  }

  /**
   * Returns a value whether the device contains all of specified capabilities.
   */
  hasCapabilities(capabilities: Iterable<ECapability>): boolean {
    return all(capabilities, (capability) => this.hasCapability(capability));
  }

  /**
   * Returns a value whether the device supports the specified command.
   */
  hasCommand(command: string): boolean {
    return this.commands.has(command);
  }

  /**
   * Sends a command to the device on Hubitat.
   */
  async sendCommand(command: string, value?: string | number): Promise<void> {
    await this.apiService.sendDeviceCommand(this.id, command, value);
  }

  /**
   * Sets a value of an attribute and emit the device update event if the value
   * has changed.
   * @param attributeName A name of the attribute which value will be set.
   * @param newValue A new value of the attribute.
   * @param forceChangeAnnouncement If set to true it will send the device
   *        update event regardless whether the value changed or not.
   */
  setAttribute(attributeName: string, newValue: string | null, forceChangeAnnouncement = false): void {
    const previousValue = this.getAttribute(attributeName);
    if (!forceChangeAnnouncement && newValue === previousValue) return;
    this.attributes.set(attributeName, newValue);
    this.devicesService.announceAttributeUpdate(attributeName, this, newValue, previousValue);
  }

  /**
   * Updates the device with data from provided device. It throws an error if
   * there's a mismatch between id's of this and provided _source_ device.
   * @param sourceDevice A device to copy data from.
   * @param forceAttributeChangeAnnouncement  If set to `true`, it will force
   *        the device update event to be emitted. It's `false` by default.
   */
  update(sourceDevice: HubitatDevice, forceAttributeChangeAnnouncement = false): void {
    if (this.id !== sourceDevice.id) {
      throw new Error(
        `Can't update device #${this.id} with data from device #${sourceDevice.id}. These are 2 different devices.`,
      );
    }
    this.name = sourceDevice.name;
    this.label = sourceDevice.label;
    this.commands = sourceDevice.commands;
    this.capabilities = sourceDevice.capabilities;
    for (const { attributeName, attributeValue } of sourceDevice.getAttributes()) {
      this.setAttribute(attributeName, attributeValue, forceAttributeChangeAnnouncement);
    }
  }
}
