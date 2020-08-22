/**
 * @packageDocumentation
 * @module Common
 */

export class SubscribersSet<T> implements Iterable<T> {
  private subscribers: Set<T> = new Set<T>();

  public get size(): number {
    return this.subscribers.size;
  }

  public clear(): void {
    this.subscribers.clear();
  }

  public subscribe(subscriber: T): void {
    this.subscribers.add(subscriber);
  }

  public unsubscribe(subscriber: T): void {
    this.subscribers.delete(subscriber);
  }

  [Symbol.iterator](): Iterator<T> {
    return this.subscribers[Symbol.iterator]();
  }
}
