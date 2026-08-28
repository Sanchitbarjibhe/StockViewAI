import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
} from 'next/constants';

import type { NextConfig } from 'next';

// 1. Current Environment Detect Kara
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || (
  process.env.VERCEL_ENV === 'production' ? 'production' :
    process.env.VERCEL_ENV === 'preview' ? 'beta' : 'development'
);

// 2. Terminal Console Log (Server Start hoto teva disel)
console.log(`\n==========================================`);
console.log(`🚀 RUNNING APP IN [ ${APP_ENV.toUpperCase()} ] MODE`);
console.log(`==========================================\n`);

// 3. Environment Specific Mongo URI Select Kara
const getMongoUri = () => {
  if (APP_ENV === 'production') {
    return process.env.LIVE_MONGODB_URI || process.env.MONGODB_URI;
  }
  if (APP_ENV === 'beta') {
    return process.env.BETA_MONGODB_URI || process.env.MONGODB_URI;
  }
  return process.env.DEV_MONGODB_URI || process.env.MONGODB_URI;
};

/**
 * @type {() => NextConfig}
 */
const getDevelopmentConfig = () => ({
  reactStrictMode: true,
  devIndicators: { buildActivity: true },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp'],
  },
  // Root Level Environment Expose
  env: {
    APP_ENV: APP_ENV,
    MONGODB_URI: getMongoUri() || '',
  },
});

/**
 * @type {() => NextConfig}
 */
const getProductionConfig = () => ({
  compress: true,
  swcMinify: true,
  trailingSlash: false,
  images: {
    formats: ['image/webp'],
  },
  productionBrowserSourceMaps: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ];
  },
  // Root Level Environment Expose
  env: {
    APP_ENV: APP_ENV,
    MONGODB_URI: getMongoUri() || '',
  },
});

/**
 * @param {string} phase
 * @returns {NextConfig}
 */
module.exports = (phase: string) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return getDevelopmentConfig();
  }

  if (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER) {
    return getProductionConfig();
  }

  return {
    reactStrictMode: true,
    APP_ENV: APP_ENV,
    MONGODB_URI: getMongoUri() || '',
  };
};
