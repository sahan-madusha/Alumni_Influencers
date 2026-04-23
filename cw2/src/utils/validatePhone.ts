export const validatePhone = (phone: string): boolean => {
  const normalized = phone.trim();
  if (!normalized) return true;
  const regex = /^(?:\+94|0)?\d{9}$/;
  return regex.test(normalized);
};
