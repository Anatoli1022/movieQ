import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_API_MOVIE_KEY: process.env.NEXT_API_MOVIE_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
