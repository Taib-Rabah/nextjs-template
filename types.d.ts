type Obj<Key = string, Value = string> = Record<Key, Value>;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};