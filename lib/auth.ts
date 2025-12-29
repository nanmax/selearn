import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        // Implement your email sending logic here
        await resend.emails.send({
          from: "Selearn <onboarding@selearn.com>",
          to: [email],
          subject: "Selearn - Verify your email",
          html: `<p>Your OTP is <strong>${otp}</strong></p>`,
        });
      },
    }),
    admin(),
  ],
});
