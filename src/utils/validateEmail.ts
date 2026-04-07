import { ALLOWED_DOMAINS } from "../config";

export const validateEmail = (email: string) => {
  const normalized = email.toLowerCase().trim();
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(normalized)) {
    throw new Error("Invalid email format");
  }

  const [localPart, domain] = normalized.split("@");

  if (!localPart || !domain) {
    throw new Error("Invalid email structure");
  }

  if (!ALLOWED_DOMAINS.includes(domain)) {
    throw new Error("Only IIT emails are allowed");
  }

  return true;
};
