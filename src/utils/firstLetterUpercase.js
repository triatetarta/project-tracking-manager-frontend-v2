export const convertString = (stringValue) => {
  return stringValue.replace(
    /^(\w)(.+)/,
    (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase()
  );
};
