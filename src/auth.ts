import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { passkey } from 'better-auth/plugins/passkey';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.BETTER_AUTH_STRING,
  }),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [passkey()],
});
