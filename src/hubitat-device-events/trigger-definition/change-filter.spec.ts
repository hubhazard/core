import { ChangeFilter } from './change-filter';
import { doTimes } from '../../common/collections-helpers';

export function randomChangeFilter(): ChangeFilter {
  return new ChangeFilter(() => true);
}

export function randomChangeFilters(num: number): ChangeFilter[] {
  return doTimes(num, () => randomChangeFilter());
}

describe('ChangeFilter', () => {
  it('should assign the provided match function', () => {
    const func = () => true;
    expect(new ChangeFilter(func).match).toBe(func);
  });
});
