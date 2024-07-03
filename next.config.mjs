import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_API_MOVIE_KEY: process.env.NEXT_API_MOVIE_KEY,
  },
};

export default nextConfig;
