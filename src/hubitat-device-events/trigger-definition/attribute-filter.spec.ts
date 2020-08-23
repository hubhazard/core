import { name } from 'faker';
import { doTimes } from '../../common/collections-helpers';
import { randomIntRange } from '../../common/number-helpers';
import { AttributeFilter } from './attribute-filter';
import { ChangeGroup } from './change-group';
import { randomChangeGroup, randomChangeGroups } from './change-group.spec';

export function makeAttributeFilter(attributeNames: string[], groups: ChangeGroup[]): AttributeFilter | undefined {
  if (attributeNames.length === 0) return undefined;
  const attributeFilter = new AttributeFilter();
  attributeFilter.attributeNames = attributeNames;
  attributeFilter.changeGroups = groups;
  return attributeFilter;
}

function randomAttributeNames(): string[] {
  return doTimes(randomIntRange(1, 4), () => name.findName());
}

export function randomAttributeFilter(): AttributeFilter {
  const attributeFilter = makeAttributeFilter(randomAttributeNames(), randomChangeGroups(3));
  if (attributeFilter == null) throw new Error(`Couldn't create random attribute filter!`);
  return attributeFilter;
}

export function randomAttributeFilters(num: number): AttributeFilter[] {
  return doTimes(num, () => randomAttributeFilter());
}

describe('AttributeFilter testing helpers', () => {
  describe('makeAttributeFilter', () => {
    it('should create a valid group', () => {
      doTimes(15, () => {
        const attributeNames = randomAttributeNames();
        const groups = randomChangeGroups(randomIntRange(1, 4));
        const attributeFilter = makeAttributeFilter(attributeNames, groups);
        expect(attributeFilter).not.toBeUndefined();
        if (attributeFilter == null) throw new Error(`Couldn't create AttributeFilter!`);
        expect(attributeFilter.attributeNames).toBe(attributeNames);
        expect(attributeFilter.changeGroups).toBe(groups);
      });
    });
  });
});

describe('AttributeFilter', () => {
  describe('get lastGroup', () => {
    it('should return a last change filter group', () => {
      doTimes(15, () => {
        const attributeFilter = randomAttributeFilter();
        const lastGroup = randomChangeGroup();
        attributeFilter.changeGroups.push(lastGroup);
        expect(attributeFilter.lastGroup).not.toBeUndefined();
        expect(attributeFilter.lastGroup).toBe(lastGroup);
      });
    });

    it('should return undefined in case there are no groups', () => {
      doTimes(15, () => {
        const attributeFilter = randomAttributeFilter();
        attributeFilter.changeGroups = [];
        expect(attributeFilter.lastGroup).toBeUndefined();
      });
    });
  });
});
