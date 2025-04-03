import { betterAuth } from 'better-auth';
import { Pool } from 'pg';
import { passkey } from 'better-auth/plugins/passkey';
import sendEmail from './actions/sendEmail';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.BETTER_AUTH_STRING,
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: 'Verify your email address for points.credit',
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  user: {
    additionalFields: {
      cards: {
        type: 'string[]',
      },
    },
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
  },
  plugins: [passkey()],
});

export type User = (typeof auth.$Infer.Session)['user'];
