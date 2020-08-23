/**
 * @packageDocumentation
 * @module Common
 */

/**
 * This class is an iterable collection of generic subscribers. You can iterate
 * through this collection using the *for ... of* loop.
 * @param T A subscriber's type.
 * @example
 * ```ts
 * import { SubscribersSet } from '@hubhazard/core';
 * const subscribers = new SubscribersSet<string>();
 * // ...
 * for (const subscriber of subscribers) {
 *   console.log(`Handling subscriber: ${subscriber}`);
 * }
 * ```
 */
export class SubscribersSet<T> implements Iterable<T> {
  private subscribers: Set<T> = new Set<T>();

  /**
   * Returns a number of subscribers in the collection.
   * @example
   * ```ts
   * const numberOfSubscribers = subscribers.size;
   * ```
   */
  public get size(): number {
    return this.subscribers.size;
  }

  /**
   * Removes all subscribers from the collection.
   * @example
   * ```ts
   * subscribers.clear();
   * ```
   */
  public clear(): void {
    this.subscribers.clear();
  }

  /**
   * Adds a subscriber to the collection.
   * @example
   * ```ts
   * import { SubscribersSet } from '@hubhazard/core';
   * const subscribers = new SubscribersSet<string>();
   * subscribers.subscribe('hello');
   * subscribers.subscribe('world');
   * ```
   */
  public subscribe(subscriber: T): void {
    this.subscribers.add(subscriber);
  }

  /**
   * Removes a subscriber from the collection. Does nothing if provided subscriber
   * wasn't subscribed first.
   * @example
   * ```ts
   * import { SubscribersSet } from '@hubhazard/core';
   * subscribers.unsubscribe('hello');
   * ```
   */
  public unsubscribe(subscriber: T): void {
    this.subscribers.delete(subscriber);
  }

  /**
   * Returns an iterator that allows to iterate through all subscribers.
   * @example
   * ```ts
   * for (const subscriber of subscribers) {
   *   console.log(`Handling subscriber: ${subscriber}`);
   * }
   * ```
   */
  [Symbol.iterator](): Iterator<T> {
    return this.subscribers[Symbol.iterator]();
  }
}
