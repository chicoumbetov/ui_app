export function removeNull(obj: Object): Object {
  return Object.fromEntries(
    Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, v]) => v != null)
      .map(([k, v]) => [k, v === Object(v) ? removeNull(v) : v]),
  );
}

export default {
  removeNull,
};
