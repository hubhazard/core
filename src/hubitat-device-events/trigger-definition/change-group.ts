import { ChangeFilter } from './change-filter';

export class ChangeGroup {
  filters: ChangeFilter[] = [];

  get lastFilter(): ChangeFilter | undefined {
    if (this.filters.length === 0) return undefined;
    return this.filters[this.filters.length - 1];
  }
}
