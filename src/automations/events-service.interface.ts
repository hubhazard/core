/**
 * @packageDocumentation
 * @module Automations
 */

import { Automation } from './automation';

/**
 * An interface defining basic capabilities of every events service.
 */
export interface IEventsService {
  /**
   * Registers the provided automation to this events service.
   * @param automation An automation to register.
   */
  registerAutomation(automation: Automation): void;

  /**
   * Unregister the provided automation from this events service.
   * @param automation An automation to unregister.
   */
  unregisterAutomation(automation: Automation): void;
}
