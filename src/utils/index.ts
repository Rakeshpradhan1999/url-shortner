export const generateShortcode = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};
