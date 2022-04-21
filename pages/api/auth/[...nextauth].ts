import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

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
    }),
    {
      id: "iamblockchain",
      name: "IAM BLOCKCHAIN",
      type: "oauth",
      clientId: process.env.IAMBLOCKCHAIN_CLIENT_ID || "",
      clientSecret: process.env.IAMBLOCKCHAIN_CLIENT_SECRET || "",
      authorization: {
        url: `${process.env.IAMBLOCKCHAIN_HOST}/oauth/authorize`,
        params: { scope: "user" },
      },
      token: { url: `${process.env.IAMBLOCKCHAIN_HOST}/api/oauth/token` },
      userinfo: `${process.env.IAMBLOCKCHAIN_HOST}/api/user/`,
      profile(profile) {
        return {
          id: profile.address,
        };
      },
    },
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log("SESSION ", session);
      console.log("USER ", user);
      console.log("TOKEN ", token);
      return session;
    },
  },
});
