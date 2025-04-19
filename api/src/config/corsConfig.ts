import { logger } from '../utils/logger';

// In development
const devOrigins = ['http://localhost:5173'];

// In production
const containerOrigins = ['http://wheresdaftpunk-frontend:3000'];

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? containerOrigins
    : devOrigins;

if (process.env.NODE_ENV === 'production' && allowedOrigins.length === 0) {
  logger.error(
    'FATAL CORS ERROR: No CORS origins configured for production. Container-to-container communication will fail!',
  );
  throw new Error('Production CORS origins (including container hostnames) are not configured!');
}

export const corsOptionsBase = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

// console.log(`CORS allowed origins: ${JSON.stringify(allowedOrigins)}`); // Uncomment for debugging
