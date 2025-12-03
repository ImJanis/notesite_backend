import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { bearer, openAPI } from "better-auth/plugins";

import * as schema from "../db/schema";
import { db } from "../plugins/database";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    camelCase: false,
    usePlural: true,
    schema,
  }),
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
        input: true,
      },
      lastName: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  trustedOrigins: [
    "http://localhost:3000",
    "https://example.com",
    "http://localhost:4200",
    "http://localhost:4173",
  ],
  plugins: [bearer(), openAPI()],
});
