/**
 * Check if all elements of the collection return `true` for the provided predicate.
 * @todo TEST IT
 */
export function all<T>(collection: Iterable<T>, predicate: (collectionElement: T) => boolean): boolean {
  for (const element of collection) {
    if (!predicate(element)) return false;
  }
  return true;
}

/**
 * Check if any element of the collection returns `true` for the provided predicate.
 * @todo TEST IT
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
 * Performs provided action specified number of times. If the action returns a
 * value, the function will returns an array of returned values.
 */
export function doTimes<T>(times: number, action: (index: number) => T): T[] {
  if (times < 1) return [];
  const results: T[] = [];
  for (let i = 0; i < times; i++) {
    results.push(action(i));
  }
  return results;
}
