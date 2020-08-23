/**
 * @packageDocumentation
 * @module Common
 */

/**
 * An async version of [node's `setTimeout`](https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args).
 * Time is specified in milliseconds.
 * @example
 * ```ts
 * import { delay } from '@hubhazard/core';
 * await doSomething();
 * await delay(3000); // Wait 3 seconds
 * await doSomething();
 * ```
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
