import { ChangeGroup } from './change-group';

export class AttributeFilter {
  attributeNames: string[] = [];

  changeGroups: ChangeGroup[] = [new ChangeGroup()];

  /**
   * Returns the last group of the `changeGroups`. Returns `undefined` if the
   * `changeGroups` is an empty array.
   */
  public get lastGroup(): ChangeGroup | undefined {
    if (this.changeGroups.length === 0) return undefined;
    return this.changeGroups[this.changeGroups.length - 1];
  }
}
