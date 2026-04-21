import crypto from "crypto";
import { TOKEN_EXPIRE_MINUTES } from "../config";

export const generateTocken = (): { token: string; expiresAt: Date } => {
  const part1 = crypto.randomInt(1000, 10000).toString();
  const part2 = crypto.randomInt(1000, 10000).toString();
  const token = `${part1}-${part2}`;

  const expiresAt = new Date(Date.now() + TOKEN_EXPIRE_MINUTES * 60 * 1000);

  return { token, expiresAt };
}; 