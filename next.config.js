/** @type {import('next').NextConfig} */
const path = require('path');
const dotenv = require('dotenv');
const packageFile = require('./package.json');

let CDN_URL = '';

// if (process.env.APP_BUILD_ENV) {
//   const envFilePath = path.resolve(`./.env.${process.env.APP_BUILD_ENV}`);
//   dotenv.config({ path: envFilePath });
//   console.info(`Loaded env from ${envFilePath}`);

//   if (process.env.APP_BUILD_ENV === 'ci') {
//     CDN_URL = `https://goibibo.ibcdn.com/styleguide/css/${packageFile.version}/`;
//     console.info(`CDN URL set to ${CDN_URL}`);
//   }
// }

let envParsed = {};
if (process.env.NODE_ENV !== 'production') {
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
