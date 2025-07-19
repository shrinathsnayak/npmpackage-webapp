"use server";

import { unstable_cache as cache } from "next/cache";
import { API_CONFIG } from "@/constants/api.constants";

/**
 * Search packages without caching for real-time results
 */
export const searchPackage = async (packageName: string) => {
  try {
    if (!packageName) {
      return null;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/search?q=${packageName}`
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to search packages: ${res.statusText}`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("Error searching packages:", err);
    return null;
  }
};

/**
 * Get package downloads with optimized caching
 */
export const getPackageDownloads = cache(
  async (packageName: string) => {
    try {
      if (!packageName) {
        return null;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/downloads?packageName=${packageName}`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
          `Failed to fetch package downloads: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching package downloads:", err);
      return null;
    }
  },
  ["package-downloads"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.DOWNLOADS,
    tags: ["package-downloads"],
  }
);

/**
 * Get package download statistics with optimized caching
 */
export const getPackageDownloadStats = cache(
  async (packageName: string, startDate?: string, endDate?: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const params: Record<string, string> = { packageName };
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const searchQuery = new URLSearchParams(params);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/downloads?${searchQuery}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch download statistics");
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching download statistics:", err);
      throw err;
    }
  },
  ["download-stats"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.DOWNLOADS,
    tags: ["download-stats"],
  }
);

/**
 * Get OG package info with optimized caching
 */
export const getOGPackageInfo = cache(
  async (packageName: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/npm?project=${packageName}`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
          `Failed to fetch OG package info: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching OG package info:", err);
      throw err;
    }
  },
  ["og-package-info"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.OG_INFO,
    tags: ["og-package-info"],
  }
);

/**
 * Get NPM package data with optimized caching
 */
export const getNpmPackageData = cache(
  async (packageName: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/npm?project=${packageName}`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch NPM data: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching NPM package data:", err);
      throw err;
    }
  },
  ["npm-package-data"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.NPM_DATA,
    tags: ["npm-package-data"],
  }
);

/**
 * Get GitHub data with optimized caching
 */
export const getGitHubData = cache(
  async (packageName: string, owner?: string, repo?: string) => {
    try {
      if (!packageName || !owner || !repo) {
        throw new Error("Package name, owner, and repo are required");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/github?project=${packageName}&owner=${owner}&repo=${repo}`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Failed to fetch GitHub data: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      throw err;
    }
  },
  ["github-data"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.GITHUB_DATA,
    tags: ["github-data"],
  }
);

/**
 * Get vulnerability data with optimized caching
 */
export const getVulnerabilityData = cache(
  async (packageName: string, version?: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL
        }/api/proxy/vulnerabilities?name=${packageName}${version ? `&version=${version}` : ""
        }`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
          `Failed to fetch vulnerability data: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching vulnerability data:", err);
      throw err;
    }
  },
  ["vulnerability-data"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.VULNERABILITIES,
    tags: ["vulnerability-data"],
  }
);

/**
 * Get vulnerability score data with optimized caching
 */
export const getVulnerabilityScoreData = cache(
  async (packageName: string, version?: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const params = new URLSearchParams({ name: packageName });
      if (version) {
        params.set("version", version);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/vulnerability-score?${params}`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
          `Failed to fetch vulnerability score data: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching vulnerability score data:", err);
      throw err;
    }
  },
  ["vulnerability-score-data"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.VULNERABILITIES,
    tags: ["vulnerability-score-data"],
  }
);

/**
 * Get security scan data with optimized caching
 */
export const getSecurityScanData = cache(
  async (packageName: string, owner?: string, repo?: string) => {
    try {
      if (!packageName || !owner || !repo) {
        throw new Error("Package name, owner, and repo are required");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/scan?project=${packageName}&owner=${owner}&repo=${repo}`
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
          `Failed to fetch security scan data: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching security scan data:", err);
      throw err;
    }
  },
  ["security-scan-data"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.SECURITY_SCAN,
    tags: ["security-scan-data"],
  }
);
