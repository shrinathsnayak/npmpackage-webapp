import { NextRequest, NextResponse } from "next/server";
import {
  API_CONFIG,
  API_ERROR_MESSAGES,
  HTTP_STATUS,
} from "@/constants/api.constants";

// Enable edge runtime for better performance and lower CPU usage
export const runtime = "edge";

// Reduce timeout for faster response and lower CPU usage
const REDUCED_TIMEOUT = 30000; // 30 seconds instead of 55

const PARAMETER_MAPPING: Record<string, Record<string, string>> = {
  npm: {
    q: "project", // Map 'q' parameter to 'project' for npm endpoint
  },
  github: {
    q: "project", // Map 'q' parameter to 'project' for github endpoint
    owner: "owner", // Keep 'owner' parameter as is for github endpoint
    repo: "repo", // Keep 'repo' parameter as is for github endpoint
  },
  scan: {
    q: "project", // Map 'q' parameter to 'project' for scan endpoint
    owner: "owner", // Keep 'owner' parameter as is for scan endpoint
    repo: "repo", // Keep 'repo' parameter as is for scan endpoint
  },
  vulnerabilities: {
    q: "name", // Map 'q' parameter to 'name' for vulnerabilities endpoint
  },
  "vulnerability-score": {
    name: "name", // Keep 'name' parameter as is for vulnerability-score endpoint
    version: "version", // Keep 'version' parameter as is for vulnerability-score endpoint
  },
  package: {
    q: "q", // Keep 'q' parameter as is for package endpoint
    owner: "owner", // Keep 'owner' parameter as is for package endpoint
    repo: "repo", // Keep 'repo' parameter as is for package endpoint
  },
  downloads: {
    packageName: "packageName", // Keep 'packageName' parameter as is
  },
  search: {
    q: "q", // Keep 'q' parameter as is for search endpoint
  },
};

// Endpoints that should not be cached
const NO_CACHE_ENDPOINTS = ["search"];

// Endpoints that should have shorter cache duration
const SHORT_CACHE_ENDPOINTS = ["downloads", "npm"];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Validate API_ENDPOINT environment variable
    if (!process.env.API_ENDPOINT) {
      console.error("API_ENDPOINT environment variable is not configured");
      return NextResponse.json(
        { error: "Backend API endpoint not configured" },
        { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
      );
    }

    const { searchParams } = new URL(request.url);
    const resolvedParams = await params;
    const path = resolvedParams.path.join("/");
    const endpoint = path.split("/")[0]; // Get the first part of the path

    // Build the backend URL
    const backendUrl = `${process.env.API_ENDPOINT}/${path}`;

    // Map parameters according to the endpoint
    const mappedParams = new URLSearchParams();
    const mapping = PARAMETER_MAPPING[endpoint] || {};

    for (const [key, value] of searchParams.entries()) {
      const mappedKey = mapping[key] || key;
      mappedParams.set(mappedKey, value);
    }

    // Add mapped query parameters
    const queryString = mappedParams.toString();
    const fullUrl = queryString ? `${backendUrl}?${queryString}` : backendUrl;

    // Set timeout with reduced duration
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REDUCED_TIMEOUT);

    try {
      // Determine cache duration based on endpoint
      let cacheDuration = API_CONFIG.CACHE_DURATIONS.PACKAGE_DATA;
      if (SHORT_CACHE_ENDPOINTS.includes(endpoint)) {
        cacheDuration = 120; // 2 minutes for frequently changing data
      }

      const response = await fetch(fullUrl, {
        method: "GET",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        next:
          NO_CACHE_ENDPOINTS.includes(endpoint) ||
          process.env.NODE_ENV === "development"
            ? undefined
            : {
                revalidate: cacheDuration,
                tags: [`proxy-${path}`],
              },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(
          `Backend API error for ${fullUrl}: ${response.status} ${response.statusText}`
        );
        return NextResponse.json(
          { error: `Backend API error: ${response.statusText}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json(data, { status: response.status });
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  } catch (error) {
    console.error("Proxy API Error:", error);

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
      { error: API_ERROR_MESSAGES.NETWORK_ERROR },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    );
  }
}
