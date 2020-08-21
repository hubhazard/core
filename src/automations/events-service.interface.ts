import { Automation } from './automation';

/**
 * An interface defining basic capabilities of every events service.
 */
export interface IEventsService {
  /**
   * Register automation to this events service.
   */
  registerAutomation(automation: Automation): void;

  /**
   * Unregister automation from this events service.
   */
  unregisterAutomation(automation: Automation): void;
}
