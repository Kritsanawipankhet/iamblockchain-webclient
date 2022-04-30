import NextAuth from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongoDBConnect from "@/libs/mongodb";
import { compare } from "bcryptjs";
import { getSession } from "next-auth/react";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers

    adapter: MongoDBAdapter(mongoDBConnect()),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        checks: ["state"],
        profile(profile) {
          return {
            id: profile.sub,
            email: profile.email,
            name: null,
            password: null,
            emailVerified: null,
          };
        },
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        checks: ["state"],
        profile(profile) {
          return {
            id: profile.id,
            email: profile.email,
            name: null,
            password: null,
            emailVerified: null,
          };
        },
      }),
      {
        id: "iamblockchain",
        name: "IAM BLOCKCHAIN",
        type: "oauth",
        version: "2.0",
        idToken: false,
        checks: ["state"],
        clientId: process.env.IAMBLOCKCHAIN_CLIENT_ID,
        clientSecret: process.env.IAMBLOCKCHAIN_CLIENT_SECRET,
        authorization: {
          url: `${process.env.IAMBLOCKCHAIN_HOST}/oauth/authorize`,
          params: { scope: "user" },
        },
        token: {
          url: `${process.env.IAMBLOCKCHAIN_HOST}/api/oauth/token`,
          params: { client_secret: process.env.IAMBLOCKCHAIN_CLIENT_SECRET },
          // async request(context) {
          //   console.log(context);
          //   return { tokens: {} };
          // },
        },
        userinfo: {
          url: `${process.env.IAMBLOCKCHAIN_HOST}/api/user`,
        },
        profile(profile) {
          return {
            id: profile.id,
            email: null,
            name: null,
            password: null,
            emailVerified: null,
          };
        },
      },
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        id: "credentials",
        name: "Account",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          // console.log({ credentials, req });

          const client = await mongoDBConnect();
          const user = await client
            .db()
            .collection("users")
            .findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with the email");
          }

          const checkPassword = await compare(
            credentials.password,
            user.password
          );
          if (!checkPassword) {
            throw new Error("Password doesnt match with the user");
          }

          //Incorrect password - send response

          // // If no error and we have user data, return it
          if (user) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              emailVerified: user.emailVerified,
            };
          }
          // Return null if user data could not be retrieved
          return null;
        },
      }),
    ],

    session: {
      // Use JSON Web Tokens for session instead of database sessions.
      // This option can be used with or without a database for users/accounts.
      // Note: `strategy` should be set to 'jwt' if no database is used.
      strategy: "jwt",

      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 60 * 60, // 30 days
      // maxAge: 24 * 60 * 60,
      // Seconds - Throttle how frequently to write to database to extend a session.
      // Use it to limit write operations. Set to 0 to always update the database.
      // Note: This option is ignored if using JSON Web Tokens
      updateAge: 60 * 60, // 24 hours
    },
    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signout",
      error: "/auth/signin",
      newUser: "/auth/newuser",
    },
    callbacks: {
      async jwt({ token, user, account, isNewUser, profile }) {
        // Persist the OAuth access_token to the token right after signin

        if (account) {
          token.accessToken = account.access_token;
          token.provider = account.provider;
        }
        return token;
      },
      async session({ session, user, token }) {
        // @ts-ignore
        session.user.provider = token.provider;
        return Promise.resolve(session);
      },
      async signIn({ user, account, profile, email, credentials }) {
        return Promise.resolve(true);
      },
      async redirect({ url, baseUrl }) {
        //console.log({ url, baseUrl });
        return baseUrl;
      },
    },
    events: {
      async signIn(message) {
        /* on successful sign in */
      },
      async signOut(message) {
        /* on signout */
      },
      async createUser(message) {
        /* user created */
      },
      async updateUser(message) {
        /* user updated - e.g. their email was verified */
      },
      async linkAccount(message) {
        /* account (e.g. Twitter) linked to a user */
      },
      async session(message) {
        /* session is active */
      },
    },
    debug: true,
  });
}
