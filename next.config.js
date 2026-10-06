/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'cpu-features', 'sshcrypto'];

    // Reduce chunk splitting to avoid 429 errors when accessed via tunnel
    if (config.optimization && config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        default: false,
        vendors: false,
      };
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.minSize = 30000;
      config.optimization.splitChunks.maxSize = 244000;
    }

    return config;
  },
}

module.exports = nextConfig
