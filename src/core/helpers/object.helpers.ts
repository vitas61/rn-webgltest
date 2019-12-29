export function objectMap<T>(object, mapFn, arg: T): T {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(object[key], key);
    return result;
  }, arg);
}

export function objectForEach(object, fn) {
  Object.keys(object).forEach(key => {
    fn(object[key], key, object);
  });
}
