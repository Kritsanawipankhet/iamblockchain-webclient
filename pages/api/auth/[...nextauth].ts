import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    {
      id: "iamblockchain",
      name: "IAM BLOCKCHAIN",
      type: "oauth",
      clientId: process.env.IAMBLOCKCHAIN_CLIENT_ID || "",
      clientSecret: process.env.IAMBLOCKCHAIN_CLIENT_SECRET || "",
      authorization: `${process.env.IAMBLOCKCHAIN_HOST}/oauth/authorize`,
      token: "https://iamblockchain.vercel.app/oauth/token",
      userinfo: "https://iamblockchain.vercel.app/api/user/",
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
      return session;
    },
  },
});
