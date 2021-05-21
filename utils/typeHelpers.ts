export type RequireSome<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};
