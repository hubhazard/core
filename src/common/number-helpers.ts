/**
 * @packageDocumentation
 * @module Common
 */

/**
 * Returns a random integer between `min` and `max` values. Both `min` and `max`
 * are inclusive.
 * @example
 * ```ts
 * import { randomIntRange } from '@hubhazard/core';
 * const x = randomIntRange(1, 5);
 * // Possible x values: 1, 2, 3, 4, 5
 * ```
 */
export function randomIntRange(min: number, max: number): number {
  min = Math.round(min);
  max = Math.round(max);
  const range = Math.abs(min - max);
  return Math.round(Math.random() * range + min);
}
