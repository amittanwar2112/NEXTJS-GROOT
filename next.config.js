/** @type {import('next').NextConfig} */
const path = require('path');
const dotenv = require('dotenv');
const packageFile = require('./package.json');

const isProd = process.env.NODE_ENV === 'production'

let CDN_URL = '', envParsed = {};

if (isProd) {
  CDN_URL = `https://goibibo.ibcdn.com/styleguide/css/${packageFile.version}/`;
  console.info(`CDN URL set to ${CDN_URL}`);
}

if (!isProd) {
  envParsed = dotenv.config({ path: '.env.local' }).parsed;
}

const nextConfig = {
  env: {},
  devIndicators: {
    autoPrerender: false
  },
  pwa: {
    dest: 'public'
  },
  reactStrictMode: true,
  images: {
    domains: ['gos3.ibcdn.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  assetPrefix: CDN_URL,
  webpack(config, { webpack }) {
    config.plugins.push(new webpack.EnvironmentPlugin(envParsed));
    return config;
  }
};

module.exports = nextConfig;
