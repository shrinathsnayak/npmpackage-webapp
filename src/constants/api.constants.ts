// API Configuration Constants
export const API_CONFIG = {
  // Cache durations in seconds
  CACHE_DURATIONS: {
    PACKAGE_DATA: 300, // 5 minutes
    GITHUB_DATA: 300, // 5 minutes
    VULNERABILITIES: 900, // 15 minutes
    SECURITY_SCAN: 600, // 10 minutes
    DOWNLOADS: 120, // 2 minutes (reduced for frequently changing data)
    NPM_DATA: 120, // 2 minutes (reduced for frequently changing data)
    SEARCH: 180, // 3 minutes
    OG_INFO: 600, // 10 minutes
    SECURITY_SCORE: 600, // 10 minutes
  },

  // Timeout durations in milliseconds (reduced for lower CPU usage)
  TIMEOUTS: {
    PACKAGE: 30000, // 30 seconds (reduced from 55)
    GITHUB: 20000, // 20 seconds (reduced from 25)
    VULNERABILITIES: 30000, // 30 seconds (reduced from 40)
    SECURITY_SCAN: 25000, // 25 seconds (reduced from 35)
    DOWNLOADS: 30000, // 30 seconds (reduced from 55)
    PROGRESSIVE: 30000, // 30 seconds (reduced from 55)
  },

  // Max duration for API routes (reduced for lower CPU usage)
  MAX_DURATIONS: {
    PACKAGE: 35, // 35 seconds (reduced from 60)
    GITHUB: 25, // 25 seconds (reduced from 30)
    VULNERABILITIES: 35, // 35 seconds (reduced from 45)
    SECURITY_SCAN: 30, // 30 seconds (reduced from 40)
    DOWNLOADS: 35, // 35 seconds (reduced from 60)
    PROGRESSIVE: 35, // 35 seconds (reduced from 60)
  },

  // Development cache duration (shorter for faster development)
  DEV_CACHE_DURATION: 60, // 1 minute
} as const;

// Error Messages
export const API_ERROR_MESSAGES = {
  PACKAGE_NAME_REQUIRED: "Package name is required",
  TIMEOUT: "Request timeout - external API took too long to respond",
  FETCH_FAILED: "Failed to fetch data",
  INVALID_JSON: "Response is not valid JSON",
  NETWORK_ERROR: "Network error occurred",
  RATE_LIMITED: "Rate limit exceeded",
  SERVER_ERROR: "Internal server error",
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 408,
  RATE_LIMITED: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Content Types
export const CONTENT_TYPES = {
  JSON: "application/json",
  TEXT: "text/plain",
  HTML: "text/html",
} as const;
