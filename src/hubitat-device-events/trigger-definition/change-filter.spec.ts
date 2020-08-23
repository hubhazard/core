import { name as randomName } from 'faker';
import { doTimes, pickRandom } from '../../common/collections-helpers';
import { ChangeFilter } from './change-filter';

export function makeChangeFilter(name: string, value?: string | number): ChangeFilter {
  const filter = new ChangeFilter();
  filter.name = name;
  filter.value = value;
  return filter;
}

export function randomChangeFilter(): ChangeFilter {
  return makeChangeFilter(randomName.findName(), getRandomChangeFilterValue());
}

export function randomChangeFilters(num: number): ChangeFilter[] {
  return doTimes(num, () => randomChangeFilter());
}

export function getRandomChangeFilterValue(): string | number | undefined {
  return pickRandom([randomName.findName(), Math.random() * 10000]);
}

describe('ChangeFilter testing helpers', () => {
  describe('makeChangeFilter', () => {
    it('should create a valid filter', () => {
      doTimes(15, () => {
        const changeName = randomName.findName();
        const changeValue = getRandomChangeFilterValue();
        expect(makeChangeFilter(changeName, changeValue).name).toBe(changeName);
        expect(makeChangeFilter(changeName, changeValue).value).toBe(changeValue);
      });
    });
  });
});
