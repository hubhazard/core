/**
 * @packageDocumentation
 * @module Common
 */

/**
 * An async version of `setTimeout`.
 * @param ms Delay in milliseconds.
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
