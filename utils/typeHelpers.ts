export type RequireSome<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};

export function hasKey<K extends string>(
  k: K,
  o: {},
): o is { [_ in K]: {} } {
  return typeof o === 'object' && k in o;
}
