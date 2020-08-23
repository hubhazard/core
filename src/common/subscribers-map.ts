/**
 * @packageDocumentation
 * @module Common
 */

import { SubscribersSet } from './subscribers-set';

/**
 * This class is a generic map of generic subscribers sets
 * ({@link SubscribersSet `SubscribersSet<T>`}). This is an encapsulation of
 * `Map<T, SubscribersSet<U>>`.
 * ```ts
 * import { SubscribersMap } from '@hubhazard/core';
 * ```
 * @param T Key of the map.
 * @param U Type of the single subscriber.
 */
export class SubscribersMap<T, U> {
  private subscribersSets: Map<T, SubscribersSet<U>> = new Map<T, SubscribersSet<U>>();

  /**
   * Removes all subscribers sets.
   * @example
   * ```ts
   * subscribersMap.clear();
   * ```
   */
  public clear(): void {
    this.subscribersSets.clear();
  }

  /**
   * Returns a subscribers set for specified key. Returns `undefined` if there's
   * no subscribers set for that key.
   * @example
   * ```ts
   * const subscribers = subscribersMap.getSet('vegetables');
   * ```
   */
  public getSet(key: T): SubscribersSet<U> | undefined {
    return this.subscribersSets.get(key) ?? undefined;
  }

  /**
   * Returns a value whether there is a subscribers set for specified key.
   * @example
   * ```ts
   * if (subscribersMap.hasSet('vegetables')) {
   *   console.log('There are subscribers!');
   * }
   * ```
   */
  public hasSet(key: T): boolean {
    return this.subscribersSets.has(key);
  }

  /**
   * Adds provided subscriber to the subscribers set specified with by `key`
   * argument.
   * @example
   * ```ts
   * import { SubscribersMap } from '@hubhazard/core';
   * const subscribersMap = new SubscribersMap<number, string>();
   * // Create a subscribers set containing 'hello' and 'world' with the key of 33
   * subscribersMap.subscribe(33, 'hello');
   * subscribersMap.subscribe(33, 'world');
   * // Create a subscribers set containing 'bread', 'and' adn 'butter' with the key of 12
   * subscribersMap.subscribe(12, 'bread');
   * subscribersMap.subscribe(12, 'and');
   * subscribersMap.subscribe(12, 'butter');
   * ```
   */
  public subscribe(key: T, subscriber: U): void {
    let subscribersSet = this.subscribersSets.get(key);
    if (subscribersSet == null) {
      subscribersSet = new SubscribersSet<U>();
      this.subscribersSets.set(key, subscribersSet);
    }
    subscribersSet.subscribe(subscriber);
  }

  /**
   * Unsubscribes provided subscriber if already subscribed to specified key.
   * @returns `true` if unsubscribed existing subscriber or `false` if there was
   * no subscriber to unsubscribe.
   * @example
   * ```ts
   * subscribersMap.unsubscribe(33, 'world');
   * ```
   */
  public unsubscribe(key: T, subscriber: U): boolean {
    const subscribersSet = this.subscribersSets.get(key);
    if (subscribersSet == null) {
      return false;
    }
    subscribersSet.unsubscribe(subscriber);
    if (subscribersSet.size === 0) {
      this.subscribersSets.delete(key);
    }
    return true;
  }

  /**
   * Returns a list of all subscribers from all subscribers sets.
   * @param allowDuplicates A value specifying if duplicates of subscribers are
   * allowed. When set to `false` additional step of filtering duplicates out is
   * performed before returning.
   * @example
   * ```ts
   * import { SubscribersMap } from '@hubhazard/core';
   * const subscribersMap = new SubscribersMap<number, string>();
   * // Create a subscribers set containing 'hello' and 'world' with the key of 33
   * subscribersMap.subscribe(33, 'hello');
   * subscribersMap.subscribe(33, 'world');
   * // Create a subscribers set containing 'bread', 'and' adn 'butter' with the key of 12
   * subscribersMap.subscribe(35, 'hello');
   * subscribersMap.subscribe(35, 'bread');
   * const withDuplicates = subscribersMap.getSubscribers();
   * // withDuplicates equals: ['hello', 'world', 'hello', 'bread']
   * const withoutDuplicates = subscribersMap.getSubscribers(false);
   * // withoutDuplicates equals: ['hello', 'world', 'bread']
   * ```
   */
  public getSubscribers(allowDuplicates = true): U[] {
    const subscriberSets = [...this.subscribersSets.values()];
    const subscribersArrays = subscriberSets.map((subscriberSet) => [...subscriberSet]);
    let subscribers: U[] = [];
    subscribers = subscribers.concat(...subscribersArrays);
    if (allowDuplicates) {
      return subscribers;
    }
    return [...new Set<U>(subscribers)];
  }
}
