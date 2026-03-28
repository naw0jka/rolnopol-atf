export interface User {
  email: string;
  password: string;
  displayName: string;
}

import { ENV } from "../config/env.config";

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: ENV.USER_EMAIL,
    password: ENV.USER_PASSWORD,
    displayName: ENV.USER_DISPLAY_NAME,
    ...overrides,
  };
}
