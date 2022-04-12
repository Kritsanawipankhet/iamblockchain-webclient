const path = require("path");
require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,
  reactStrictMode: true,
  env: {
    HOSTNAME: process.env.HOSTNAME,
    TZ: process.env.TZ,
  },
};

module.exports = nextConfig;
