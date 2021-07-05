const uniqueValues = <T extends string | number>(a: T[]) => {
  const seen: { [key: string]: boolean } = {};
  return a.filter((item) => {
    if (Object.prototype.hasOwnProperty.call(seen, item)) {
      return false;
    }
    seen[item] = true;
    return true;
  });
};

export default {
  uniqueValues,
};
