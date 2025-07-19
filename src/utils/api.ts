import { NextRequest, NextResponse } from "next/server";
import {
  API_CONFIG,
  API_ERROR_MESSAGES,
  HTTP_STATUS,
  CONTENT_TYPES,
} from "@/constants/api.constants";

/**
 * Create a timeout controller
 */
export function createTimeoutController(timeout: number): {
  controller: AbortController;
  timeoutId: NodeJS.Timeout;
} {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
}

/**
 * Handle API errors and return appropriate NextResponse
 */
export function handleAPIError(
  error: any,
  defaultMessage: string = API_ERROR_MESSAGES.FETCH_FAILED
): NextResponse {
  console.error("API Error:", error);

  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return NextResponse.json(
        { error: API_ERROR_MESSAGES.TIMEOUT },
        { status: HTTP_STATUS.TIMEOUT }
      );
    }

    return NextResponse.json(
      { error: error.message },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }

  return NextResponse.json(
    { error: defaultMessage },
    { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
  );
}

/**
 * Validate required query parameters
 */
export function validateRequiredParams(
  searchParams: URLSearchParams,
  requiredParams: string[]
): { isValid: boolean; error?: string } {
  for (const param of requiredParams) {
    if (!searchParams.get(param)) {
      return {
        isValid: false,
        error: `${param} is required`,
      };
    }
  }
  return { isValid: true };
}

/**
 * Build URL with query parameters
 */
export function buildURLWithParams(
  baseURL: string,
  params: Record<string, string | number | boolean | undefined>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${baseURL}?${queryString}` : baseURL;
}

/**
 * Parse and validate JSON response
 */
export async function parseJSONResponse<T = any>(
  response: Response
): Promise<T> {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes(CONTENT_TYPES.JSON)) {
    return response.json();
  } else {
    const text = await response.text();
    throw new Error(`${API_ERROR_MESSAGES.INVALID_JSON}: ${text}`);
  }
}

/**
 * Create a standardized API response
 */
export function createAPIResponse<T = any>(
  data: T,
  status: number = HTTP_STATUS.OK,
  headers?: Record<string, string>
): NextResponse {
  return NextResponse.json(data, { status, headers });
}

/**
 * Create an error API response
 */
export function createErrorResponse(
  error: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR
): NextResponse {
  return NextResponse.json({ error }, { status });
}
