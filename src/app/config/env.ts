const envSchema = {
  type: "object",
  required: [
    "PORT",
    "DATABASE_URL",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_ENDPOINT",
    "R2_BUCKET",
  ],
  properties: {
    NODE_ENV: { type: "string", default: "development" },
    PORT: { type: "number", default: 3000 },
    LOGGING_LEVEL: {
      type: "string",
      default: "info",
      enum: ["trace", "debug", "info", "warn", "error", "fatal", "silent"],
    },
    DATABASE_URL: { type: "string" },
    R2_ACCESS_KEY_ID: { type: "string" },
    R2_SECRET_ACCESS_KEY: { type: "string" },
    R2_ENDPOINT: { type: "string" },
    R2_BUCKET: { type: "string" },
  },
};

export const envConfig = {
  schema: envSchema,
  dotenv: false,
  confKey: "config",
};
