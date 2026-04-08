import { ALLOWED_DOMAINS } from "../config";

export const validateEmail = (email: string): boolean => {
  const normalized = email.toLowerCase().trim();
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(normalized)) {
    return false;
  }

  const [localPart, domain] = normalized.split("@");

  if (!localPart || !domain) {
    return false;
  }

  if (!ALLOWED_DOMAINS.includes(domain)) {
    return false;
  }

  return true;
};
