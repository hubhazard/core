import { name as randomName } from 'faker';
import { all, any, pickRandom, repeat } from './collections-helpers';

describe('Collections helpers', () => {
  describe('all', () => {
    it('should return true if all elements match the predicate', () => {
      const collection = [true, true, true];
      expect(all(collection, (collectionElement) => collectionElement)).toBeTruthy();
    });

    it('should return false if one element does not match the predicate', () => {
      const collection = [true, false, true, true];
      expect(all(collection, (collectionElement) => collectionElement)).toBeFalsy();
    });

    it('should return false if more than one element does not match the predicate', () => {
      const collection = [true, false, true, true, false, true, true];
      expect(all(collection, (collectionElement) => collectionElement)).toBeFalsy();
    });

    it('should return false if all elements do not match the predicate', () => {
      const collection = [false, false, false, false, false];
      expect(all(collection, (collectionElement) => collectionElement)).toBeFalsy();
    });

    it('should return true there are no elements', () => {
      const collection = [];
      expect(all(collection, (collectionElement) => collectionElement)).toBeTruthy();
    });
  });

  describe('any', () => {
    it('should return true if any element matches the predicate', () => {
      const collection = [false, false, true, false];
      expect(any(collection, (collectionElement) => collectionElement)).toBeTruthy();
    });

    it('should return true if more than one element matches the predicate', () => {
      const collection = [true, false, true, true, false, true, true];
      expect(any(collection, (collectionElement) => collectionElement)).toBeTruthy();
    });

    it('should return true if all elements match the predicate', () => {
      const collection = [true, true, true, true, true];
      expect(any(collection, (collectionElement) => collectionElement)).toBeTruthy();
    });

    it('should return false if no elements match the predicate', () => {
      const collection = [false, false, false, false, false, false];
      expect(any(collection, (collectionElement) => collectionElement)).toBeFalsy();
    });

    it('should return false if there are no elements', () => {
      const collection = [];
      expect(any(collection, (collectionElement) => collectionElement)).toBeFalsy();
    });
  });

  describe('pickRandom', () => {
    it('should return undefined for empty collection', () => {
      const collection1 = [];
      const collection2: string[] = [];
      const collection3: { value: number }[] = [];

      expect(pickRandom([])).toBeUndefined();
      expect(pickRandom(collection1)).toBeUndefined();
      expect(pickRandom(collection2)).toBeUndefined();
      expect(pickRandom(collection3)).toBeUndefined();
    });

    it('should return the only item for a collection of size 1', () => {
      const element = randomName.findName();
      expect(pickRandom([element])).toEqual(element);
    });

    it('should return any value from the collection', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const _ of repeat(15)) {
        const collection = repeat(Math.random() * 50 + 1).map(() => randomName.findName());
        expect(collection).toContainEqual(pickRandom(collection));
      }
    });
  });

  describe('repeat', () => {
    it('should return empty collection for a number below zero', () => {
      for (let i = 0; i < 30; i++) {
        const num = Math.floor(Math.random() * -1000);
        expect(repeat(num)).not.toBeNull();
        expect(repeat(num).length).toBe(0);
      }
    });

    it('should return empty collection for a number zero', () => {
      expect(repeat(0)).not.toBeNull();
      expect(repeat(0).length).toBe(0);
    });

    it('should return a collection with specified number of elements', () => {
      for (let i = 0; i < 30; i++) {
        const num = Math.floor(Math.random() * 1000);
        expect(repeat(num)).not.toBeNull();
        expect(repeat(num).length).toBe(num);
      }
    });

    it('should return a collection with floor of specified number of elements', () => {
      for (let i = 0; i < 30; i++) {
        const num = Math.random() * 1000;
        const numFloor = Math.floor(num);
        expect(repeat(num)).not.toBeNull();
        expect(repeat(num).length).toBe(numFloor);
      }
    });
  });
});
