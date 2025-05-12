/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles/theme'),
      '@services': path.resolve(__dirname, 'src/services'),
    };
    return config;
  },
};
