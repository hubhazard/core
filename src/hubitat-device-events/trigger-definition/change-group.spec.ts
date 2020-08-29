import { doTimes } from '../../common/collections-helpers';
import { randomIntRange } from '../../common/number-helpers';
import { ChangeFilter } from './change-filter';
import { randomChangeFilter, randomChangeFilters } from './change-filter.spec';
import { ChangeGroup } from './change-group';

export function makeChangeGroup(filters: ChangeFilter[]): ChangeGroup {
  const group = new ChangeGroup();
  group.filters = filters;
  return group;
}

export function randomChangeGroup(): ChangeGroup {
  return makeChangeGroup(randomChangeFilters(randomIntRange(1, 8)));
}

export function randomChangeGroups(num: number): ChangeGroup[] {
  return doTimes(num, () => randomChangeGroup());
}

describe('ChangeGroup testing helpers', () => {
  describe('makeChangeGroup', () => {
    it('should create a valid group', () => {
      doTimes(15, () => {
        const filters = randomChangeFilters(randomIntRange(0, 5));
        expect(makeChangeGroup(filters).filters).toBe(filters);
      });
    });
  });
});

describe('ChangeGroup', () => {
  describe('get lastFilter', () => {
    it('should return a last change filter', () => {
      doTimes(15, () => {
        const group = randomChangeGroup();
        const lastChangeFilter = randomChangeFilter();
        group.filters.push(lastChangeFilter);
        expect(group.lastFilter).not.toBeNull();
        expect(group.lastFilter).toBe(lastChangeFilter);
      });
    });

    it('should return undefined in case there are no filters', () => {
      doTimes(15, () => {
        const group = randomChangeGroup();
        group.filters = [];
        expect(group.lastFilter).toBeUndefined();
      });
    });
  });
});
