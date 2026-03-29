export interface User {
  email: string;
  password: string;
  displayName: string;
}

import { ENV } from "../config/env.config";

export function getEmptyUser(overrides: Partial<User> = {}): User {
  return {
    email: ENV.EMPTY_USER_EMAIL,
    password: ENV.EMPTY_USER_PASSWORD,
    displayName: ENV.EMPTY_USER_DISPLAY_NAME,
    ...overrides,
  };
}

export function getDemoUser(overrides: Partial<User> = {}): User {
  return {
    email: ENV.DEMO_USER_EMAIL,
    password: ENV.DEMO_USER_PASSWORD,
    displayName: ENV.DEMO_USER_DISPLAY_NAME,
    ...overrides,
  };
}
