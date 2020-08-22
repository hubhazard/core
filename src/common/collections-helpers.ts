/**
 * The Common module contains classes and functions that provide a functionality
 * shared between other modules.
 *
 * @packageDocumentation
 * @module Common
 * @preferred
 */

/**
 * Checks if all elements of the collection return `true` for the provided
 * predicate.
 *
 * @param collection A collection of which values will be tested by the predicate.
 * @param predicate A function that for each collection item needs to return
 * a boolean value. Similar to
 * [Javascript's filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
 *
 * @example
 * Used on an array where all values match the predicate:
 * ```ts
 * import { all } from '@hubhazard/core';
 * const collection = [6, 74, 43, 331, 20];
 * const result = all(collection, element => element > 5);
 * // result equals true
 * ```
 *
 * @example
 * Used on a set with at least one value not matching the predicate:
 * ```ts
 * import { all } from '@hubhazard/core';
 * const collection = new Set([30, 21, 6, 100392]);
 * const isEven = (value) => value % 2 === 0;
 * const result = all(collection, isEven);
 * // result equals false
 * ```
 */
export function all<T>(collection: Iterable<T>, predicate: (collectionElement: T) => boolean): boolean {
  for (const element of collection) {
    if (!predicate(element)) return false;
  }
  return true;
}

/**
 * Check if any element of the collection returns `true` for the provided
 * predicate.
 *
 * @param collection A collection of which values will be tested by the predicate.
 * @param predicate A function that for each collection item needs to return
 * a boolean value. Similar to
 * [Javascript's filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).
 *
 * @example
 * Used on an array where all values match the predicate:
 * ```ts
 * import { any } from '@hubhazard/core';
 * const collection = ['three', 'three', 'three', 'three', 'three'];
 * const result = any(collection, element => element === 'one');
 * // result equals true
 * ```
 *
 * @example
 * Used on a set where only one value matches the predicate:
 * ```ts
 * import { any } from '@hubhazard/core';
 * const collection = new Set(['three', 'three', 'one', 'three']);
 * const result = any(collection, element => element === 'one');
 * // result equals true
 * ```
 */
export function any<T>(collection: Iterable<T>, predicate: (collectionElement: T) => boolean): boolean {
  for (const element of collection) {
    if (predicate(element)) return true;
  }
  return false;
}

/**
 * Pick random element of provided collection. Will return `undefined` if
 * collection is empty or invalid.
 *
 * @example
 * ```ts
 * import { pickRandom } from '@hubhazard/core';
 * const collection = ['one', 'two', 'three', 'four'];
 * const result = pickRandom(collection);
 * ```
 */
export function pickRandom<T>(collection: T[]): T | undefined {
  if (collection.length === 0) return undefined;
  if (collection.length === 1) return collection[0];
  const index = Math.round(Math.random() * (collection.length - 1));
  return collection[index];
}

/**
 * Create an array of `null` elements. The array will contain specified number
 * of elements. If specified number is lesser or equal to `0` empty array will
 * be returned. Non-integer numbers will be rounded down.
 *
 * @deprecated Replaced by {@link doTimes}. There's no need for this function.
 *
 * @example
 * ```ts
 * import { repeat } from '@hubhazard/core';
 * const collection = repeat(5).map(() => 'hello');
 * // collection: ['hello', 'hello', 'hello', 'hello', 'hello']
 * ```
 */
export function repeat(times: number): null[] {
  if (times <= 0) return [];
  times = Math.floor(times);
  const array: null[] = [];
  for (let i = 0; i < times; i++) {
    array.push(null);
  }
  return array;
}

/**
 * Performs provided action specified number of times. An index of the iteration
 * is passed to the action. If the action returns a value, the function will
 * returns an array of returned values.
 *
 * @param times Number of times to call the `action`.
 * @param action A function called `times` times. It can optionally receive
 * an iteration number in form of an `index` argument (starts from `0`).
 * Can return a value.
 * @returns An array of values returned by performed actions. If actions don't
 * return anything, the `void[]` will be returned.
 *
 * @example
 * Generate a list of values:
 * ```ts
 * import { doTimes } from '@hubhazard/core';
 * const collection = doTimes(5, () => 'hello');
 * // collection: ['hello', 'hello', 'hello', 'hello', 'hello']
 * ```
 *
 * @example
 * Use the iteration's index number:
 * ```ts
 * import { doTimes } from '@hubhazard/core';
 * const numbers = doTimes(6, index => index);
 * // collection: [0, 1, 2 ,3 ,4, 5]
 * ```
 *
 * @example
 * Perform an action 3 times:
 * ```ts
 * import { doTimes } from '@hubhazard/core';
 * doTimes(3, index => {
 *   console.log(`Iteration #${index}`);
 * });
 * // Console output:
 * // Iteration #0
 * // Iteration #1
 * // Iteration #2
 * ```
 */
export function doTimes<T>(times: number, action: (index: number) => T): T[] {
  if (times < 1) return [];
  const results: T[] = [];
  for (let i = 0; i < times; i++) {
    results.push(action(i));
  }
  return results;
}
