import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.id,
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
      clientId: process.env.IAMBLOCKCHAIN_CLIENT_ID || "",
      clientSecret: process.env.IAMBLOCKCHAIN_CLIENT_SECRET || "",
      authorization: {
        url: `${process.env.IAMBLOCKCHAIN_HOST}/oauth/authorize`,
        params: { scope: "user" },
      },
      token: {
        url: `${process.env.IAMBLOCKCHAIN_HOST}/api/oauth/token`,
      },
      userinfo: {
        url: `${process.env.IAMBLOCKCHAIN_HOST}/api/user`,
      },
      profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.id,
        };
      },
    },
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("/your/endpoint", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  // pages: {
  //   signIn: "/auth/signin",
  //   signOut: "/auth/signout",
  //   error: "/auth/error",
  //   newUser: "/auth/newuser",
  // },
  callbacks: {
    async session({ session, user, token }) {
      console.log("SESSION ", session);
      console.log("USER ", user);
      console.log("TOKEN ", token);
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn----------------");
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("Redirect ------------", url, baseUrl);
      return baseUrl;
    },
  },
});
