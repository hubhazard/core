/**
 * @packageDocumentation
 * @module Common
 */

import { SubscribersSet } from './subscribers-set';

export class SubscribersMap<T, U> {
  private subscribersSets: Map<T, SubscribersSet<U>> = new Map<T, SubscribersSet<U>>();

  /**
   * Removes all subscribers sets.
   */
  public clear(): void {
    this.subscribersSets.clear();
  }

  /**
   * Returns a subscribers set for specified key. Returns `undefined` if
   * there's no subscribers set for that key.
   */
  public getSet(key: T): SubscribersSet<U> | undefined {
    return this.subscribersSets.get(key) ?? undefined;
  }

  /**
   * Returns a value whether there is a subscribers set for specified key.
   */
  public hasSet(key: T): boolean {
    return this.subscribersSets.has(key);
  }

  /**
   * Subscribes provided subscriber.
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
   * Unsubscribes provided subscriber if already subscribed.
   * @returns `true` if unsubscribed existing subscriber. `false` if there was
   *          no subscriber to unsubscribe.
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
   * Returns a list of all subscribers from all subscribers' sets.
   * @param allowDuplicates A value specifying if duplicates of subscribers are
   *                        allowed. When set to `false` additional step of
   *                        removing duplicates is performed before returning.
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
