export function removeNull(obj: Object): Object {
  return Object.fromEntries(
    Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => v != null)
      .map(([k, v]) => [k, v === Object(v) ? removeNull(v) : v]),
  );
}

export function removeKey<T extends Object>(obj: T, key:string): T {
  return <T>Object.fromEntries(
    Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([k, v]) => k !== key)
      .map(([k, v]) => [k, v === Object(v) ? removeKey(v, key) : v]),
  );
}

export function removeKeyArray<T extends Object>(obj: T[], key:string): T[] {
  return obj.map<T>((v) => removeKey(v, key));
}

export default {
  removeNull,
  removeKey,
  removeKeyArray,
};

console.log(removeKey([{ test: 'aa', test2: 'ab' }, { test: 'ac', test2: 'ad' }], 'test2'));
