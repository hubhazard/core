/**
 * @packageDocumentation
 * @module Common
 */

export function randomFloat(): number {
  return Math.random();
}

export function randomFloatPositive(): number {
  return Math.abs(Math.random());
}

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

export function randomUInt(): number {
  return Math.round(Math.random());
}

export function randomSInt(): number {
  return Math.abs(Math.floor(Math.random()));
}

export function randomSIntExcZero(): number {
  return Math.abs(Math.abs(Math.floor(Math.random())) - 1) + 1;
}
