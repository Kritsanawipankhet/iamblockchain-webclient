const path = require("path");
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,
  reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    HOSTNAME: process.env.HOSTNAME,
    TZ: process.env.TZ,
    MONGODB_URI: process.env.MONGODB_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    IAMBLOCKCHAIN_CLIENT_ID: process.env.IAMBLOCKCHAIN_CLIENT_ID,
    IAMBLOCKCHAIN_CLIENT_SECRET: process.env.IAMBLOCKCHAIN_CLIENT_SECRET,
    IAMBLOCKCHAIN_HOST: process.env.IAMBLOCKCHAIN_HOST,
  },
};

module.exports = nextConfig;
