/**
 * Environment-aware logging that minimizes console output in production
 * while providing detailed logs in development.
 */

// Only two log levels for simplicity: ERROR and INFO
enum LogLevel {
  ERROR = 0,
  INFO = 1,
}

// Get appropriate log level based on environment
const getLogLevel = (): LogLevel => {
  // In production, only show errors by default
  if (process.env.NODE_ENV === 'production') {
    return LogLevel.ERROR;
  }
  // In development, show all logs
  return LogLevel.INFO;
};

// Format log message with timestamp
const formatMessage = (level: string, message: string): string => {
  return `[${new Date().toISOString()}] [${level}] ${message}`;
};

// Simple logger object
export const logger = {
  // Always log errors in both environments
  error: (message: string, ...args: unknown[]) => {
    console.error(formatMessage('ERROR', message), ...args);
  },

  // Only log info in development or when explicitly enabled
  info: (message: string, ...args: unknown[]) => {
    if (getLogLevel() >= LogLevel.INFO) {
      console.info(formatMessage('INFO', message), ...args);
    }
  },
};