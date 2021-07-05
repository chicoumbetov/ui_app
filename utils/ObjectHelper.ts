import _, { concat } from 'lodash';

export function removeNull(obj: Object): Object {
  return Object.fromEntries(
    Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([k, v]) => v != null)
      .map(([k, v]) => [k, v === Object(v) ? removeNull(v) : v]),
  );
}

export function removeKey<T extends Object>(obj: T, key:string | string[]): T {
  if (Array.isArray(key)) {
    return <T>Object.fromEntries(
      Object.entries(obj)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([k]) => key.indexOf(k) <= -1)
        .map(([k, v]) => [k, v === Object(v) && !Array.isArray(v) ? removeKey(v, key) : v]),
    );
  }
  return <T>Object.fromEntries(
    Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([k]) => k !== key)
      .map(([k, v]) => [k, v === Object(v) && !Array.isArray(v) ? removeKey(v, key) : v]),
  );
}

export function removeKeyArray<T extends Object>(obj: T[], key:string): T[] {
  return obj.map<T>((v) => removeKey(v, key));
}

export function getPaths(obj: any, parentKey?: string) {
  let result: string[];
  if (_.isArray(obj)) {
    let idx = -1;
    result = _.flatMap(obj, (item) => {
      idx += 1;
      return getPaths(item, (parentKey ? `${parentKey}.` : '') + idx);
    });
  } else if (_.isPlainObject(obj)) {
    result = _.flatMap(_.keys(obj), (key) => _.map(getPaths(obj[key], key), (subkey) => (parentKey ? `${parentKey}.` : '') + subkey));
  } else {
    result = [parentKey || ''];
  }
  return result;
}

export default {
  removeNull,
  removeKey,
  removeKeyArray,
  getPaths,
};

// console.log(getPaths({
// main: [{ test: 'aa', test2: 'ab', test3: { cool: 1 } }, { test: 'ac', test2: 'ad' }]
// }));
