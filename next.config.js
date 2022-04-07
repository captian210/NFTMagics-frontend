/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  // reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    loader: 'akamai',
    path: '/',
  },

  // SVGR
  webpack(config, { isServer }) {
    // if (!isServer) {
    //   config.resolve.fallback.fs = false;
    // }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};