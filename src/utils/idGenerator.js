export const generateId = (digits = 5) => {
  return Math.random()
    .toString(36)
    .substring(2, digits + 2);
};
