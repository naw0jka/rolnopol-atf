export interface User {
  email: string;
  password: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    email: process.env.USER_EMAIL ?? "emptyuser@rolnopol.demo.pl",
    password: process.env.USER_PASSWORD ?? "demoPass123",
    ...overrides,
  };
}
