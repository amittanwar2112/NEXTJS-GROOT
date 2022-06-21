/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');

let envParsed = {};
if (process.env.NODE_ENV !== 'production') {
  envParsed = dotenv.config({ path: '.env.local' }).parsed;
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gos3.ibcdn.com']
  },
  webpack(config, { webpack }) {
    config.plugins.push(new webpack.EnvironmentPlugin(envParsed));
    return config;
  }
};

module.exports = nextConfig;
