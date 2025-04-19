/**
 * Minimizes console output in production while providing
 * helpful logs during development.
 */

// The logger object
export const logger = {
  // Always log errors, but with less detail in production
  error: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.error(
        `[${new Date().toISOString()}] [ERROR] ${message}`,
        ...args
      );
    } else {
      // In production, log minimal info
      console.error(`[ERROR] ${message}`);
    }
  },

  // Only log info messages in development
  info: (message: string, ...args: unknown[]) => {
    if (import.meta.env.DEV) {
      console.info(`[${new Date().toISOString()}] [INFO] ${message}`, ...args);
    }
  },
};
