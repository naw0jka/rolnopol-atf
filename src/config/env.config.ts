import dotenv from "dotenv";

dotenv.config();

const REQUIRED_ENV_VARS = [
  "BASE_URL",
  "USER_EMAIL",
  "USER_PASSWORD",
  "USER_DISPLAY_NAME",
] as const;

type EnvVarName = (typeof REQUIRED_ENV_VARS)[number];

function validateEnv(): Record<EnvVarName, string> {
  for (const name of REQUIRED_ENV_VARS) {
    const value = process.env[name];
    if (!value || value.trim() === "") {
      throw new Error(
        `Environment variable "${name}" is not set or is empty. ` +
          `Please define it in your .env file or system environment.`,
      );
    }
  }

  return Object.fromEntries(
    REQUIRED_ENV_VARS.map((name) => [name, process.env[name]!.trim()]),
  ) as Record<EnvVarName, string>;
}

export const ENV = validateEnv();
