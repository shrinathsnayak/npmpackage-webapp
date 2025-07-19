// API Configuration Constants
export const API_CONFIG = {
  // Cache durations in seconds
  CACHE_DURATIONS: {
    PACKAGE_DATA: 300, // 5 minutes
    GITHUB_DATA: 300, // 5 minutes
    VULNERABILITIES: 900, // 15 minutes
    SECURITY_SCAN: 600, // 10 minutes
    DOWNLOADS: 300, // 5 minutes
    NPM_DATA: 180, // 3 minutes
    SEARCH: 180, // 3 minutes
    OG_INFO: 600, // 10 minutes
    SECURITY_SCORE: 600, // 10 minutes
  },

  // Timeout durations in milliseconds
  TIMEOUTS: {
    PACKAGE: 55000, // 55 seconds
    GITHUB: 25000, // 25 seconds
    VULNERABILITIES: 40000, // 40 seconds
    SECURITY_SCAN: 35000, // 35 seconds
    DOWNLOADS: 55000, // 55 seconds
    PROGRESSIVE: 55000, // 55 seconds
  },

  // Max duration for API routes
  MAX_DURATIONS: {
    PACKAGE: 60, // 60 seconds
    GITHUB: 30, // 30 seconds
    VULNERABILITIES: 45, // 45 seconds
    SECURITY_SCAN: 40, // 40 seconds
    DOWNLOADS: 60, // 60 seconds
    PROGRESSIVE: 60, // 60 seconds
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
