import { enumListToStringList } from './capabilities.helpers';

describe('capabilities-helpers', () => {

  describe('enumListToStringList', () => {

    it('should return empty list for empty string', () => {
      expect(enumListToStringList('')).toEqual([]);
    });

    it('should return empty list for missing surrounding brackets', () => {
      expect(enumListToStringList('[value, value3, aaald')).toEqual([]);
      expect(enumListToStringList('something, and yet, something else')).toEqual([]);
      expect(enumListToStringList('ddwda2, 2254d, 99kd]')).toEqual([]);
      expect(enumListToStringList('[')).toEqual([]);
      expect(enumListToStringList(']')).toEqual([]);
    });

    it('should return empty list for string with no values', () => {
      expect(enumListToStringList('[]')).toEqual([]);
      expect(enumListToStringList('[ ]')).toEqual([]);
      expect(enumListToStringList('[     ]')).toEqual([]);
      expect(enumListToStringList('[,]')).toEqual([]);
      expect(enumListToStringList('[ , ]')).toEqual([]);
      expect(enumListToStringList('[, ,    ,,]')).toEqual([]);
      expect(enumListToStringList('[,,,,,,,,,,]')).toEqual([]);
    });

    it('should skip empty values', () => {
      expect(enumListToStringList('[hello,,world]'))
        .toEqual(['hello', 'world']);
      expect(enumListToStringList('[,, ,how are you? ]'))
        .toEqual(['how are you?']);
      expect(enumListToStringList('[ , HubHazard , , Hubitat]'))
        .toEqual(['HubHazard', 'Hubitat']);
    });

    it('should return a valid list of values', () => {
      expect(enumListToStringList('[auto, on, heat, cool]'))
        .toEqual(['auto', 'on', 'heat', 'cool']);
      expect(enumListToStringList('[a, a, a , a,a,a ]'))
        .toEqual(['a', 'a', 'a', 'a', 'a', 'a']);
      expect(enumListToStringList('[get up, get down, get off, get on, get by, get, get set]'))
        .toEqual(['get up', 'get down', 'get off', 'get on', 'get by', 'get', 'get set']);
    });
  });
});
