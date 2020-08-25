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
 * A representation of a Hubitat's device.
 */
export class HubitatDevice {
  /**
   * A unique id of the device.
   */
  readonly id: number;

  /**
   * A name of the device.
   */
  name: string;

  /**
   * A label of the device.
   */
  label: string;

  /**
   * A set of capabilities of the device.
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
   * A reference to the {@link HubitatApiService} passed in the constructor.
   * @private
   */
  private readonly apiService: HubitatApiService;

  /**
   * A reference to the {@link HubitatDevicesService} passed in the constructor.
   * @private
   */
  private readonly devicesService: HubitatDevicesService;

  /**
   * Creates a new device instance.
   * @param dto A DTO with device data received from
   * [Hubitat's Maker API](https://docs.hubitat.com/index.php?title=Maker_API).
   * @param hubitatApiService A reference to the {@link HubitatApiService} so
   * that the device can send device commands to the Hubitat hub.
   * @param devicesService A reference to the {@link HubitatDevicesService} so
   * that the device can announce it's attribute changes.
   */
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
   * Returns a value of an attribute with specified name.
   * @param attributeName The name of the attribute.
   * @returns Returns a value of an attribute or `undefined` if
   * there is no such attribute.
   */
  getAttribute(attributeName: string): string | null | undefined {
    return this.attributes.get(attributeName);
  }

  /**
   * Returns a list of all attribute names and their values.
   * @returns Returns a list of all attribute names and their values. The list
   * can be empty.
   */
  getAttributes(): { attributeName: string; attributeValue: string | null }[] {
    return [...this.attributes.entries()].map((attribute) => ({
      attributeName: attribute[0],
      attributeValue: attribute[1],
    }));
  }

  /**
   * Gets a value of the attribute as a floating point number.
   * @param name Name of the attribute.
   * @returns Returns a value of the attribute as a floating number. Returns `0`
   * if there's no such attribute or its value is not parsable.
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
   * Gets a value of the attribute as an integer.
   * @param name Name of the attribute.
   * @returns Returns a value of the attribute as an integer. Returns `0` if
   * there's no such attribute or its value is not parsable.
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
   * Gets a value of the attribute as a string.
   * @param name Name of the attribute.
   * @returns Gets a value of the attribute as a string. Returns `undefined` if
   * there's no such attribute or its value is empty.
   */
  getAttributeAsString(name: string): string | undefined {
    return this.getAttribute(name) ?? undefined;
  }

  /**
   * Returns a value whether the device contains an attribute with the specified
   * name.
   * @param attributeName The name of the attribute.
   * @returns `true` if the device has the attribute; `false` if the device
   * doesn't have the attribute.
   */
  hasAttribute(attributeName: string): boolean {
    return this.attributes.has(attributeName);
  }

  /**
   * Returns a value whether the device contains the specified capability
   * @param capability The capability to check for.
   * @returns `true` if the device has the capability; `false` if the device
   * doesn't have the capability.
   */
  hasCapability(capability: ECapability): boolean {
    return this.capabilities.has(capability);
  }

  /**
   * Returns a value whether the device contains all of the specified capabilities.
   * @param capabilities A collection of capabilities to look for.
   * @returns `true` if the device has all the specified capabilities;
   * `false` if the device doesn't have all of the specified capabilities.
   */
  hasCapabilities(capabilities: Iterable<ECapability>): boolean {
    return all(capabilities, (capability) => this.hasCapability(capability));
  }

  /**
   * Returns a value whether the device supports the specified command.
   * @param command A command string.
   * @returns `true` if the device supports the specified command;
   * `false` if the device doesn't support the specified command.
   */
  hasCommand(command: string): boolean {
    return this.commands.has(command);
  }

  /**
   * Sends a command to the device on Hubitat.
   * @param command A command string to send.
   * @param value An optional value to send.
   */
  async sendCommand(command: string, value?: string | number): Promise<void> {
    await this.apiService.sendDeviceCommand(this.id, command, value);
  }

  /**
   * Sets a value of an attribute and emits (announces) the device update event
   * if the value has changed.
   * @param attributeName A name of the attribute.
   * @param newValue A new value of the attribute.
   * @param forceChangeAnnouncement If set to `true` it will announce the device
   * update event regardless whether the value changed or not.
   */
  setAttribute(attributeName: string, newValue: string | null, forceChangeAnnouncement = false): void {
    const previousValue = this.getAttribute(attributeName);
    if (!forceChangeAnnouncement && newValue === previousValue) return;
    this.attributes.set(attributeName, newValue);
    this.devicesService.announceAttributeUpdate(attributeName, this, newValue, previousValue);
  }

  /**
   * Updates the device with data from provided device.
   * @param sourceDevice A device to copy data from.
   * @param forceAttributeChangeAnnouncement  If set to `true`, it will force
   * the device update event to be emitted. It's `false` by default.
   * @throws Throws an error if
   * there's a mismatch between id's of this and provided *source* device.
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
