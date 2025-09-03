"use server";

import { unstable_cache as cache } from "next/cache";
import { API_CONFIG } from "@/constants/api.constants";

/**
 * Search packages without caching for real-time results
 */
export const searchPackage = async (packageName: string) => {
  try {
    if (!packageName || packageName.trim().length < 2) {
      return null;
    }

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_APP_URL
      }/api/proxy/search?q=${encodeURIComponent(packageName.trim())}`,
      {
        // Add timeout to prevent hanging requests
        signal: AbortSignal.timeout(15000),
      }
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
 * Get OG package info with optimized caching
 */
export const getOGPackageInfo = cache(
  async (packageName: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/proxy/npm?project=${encodeURIComponent(packageName)}`,
        {
          signal: AbortSignal.timeout(20000),
        }
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
 * Get package downloads with optimized caching
 */
export const getPackageDownloads = cache(
  async (packageName: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/proxy/downloads?packageName=${encodeURIComponent(packageName)}`,
        {
          signal: AbortSignal.timeout(20000),
        }
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
      throw err;
    }
  },
  ["package-downloads"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.DOWNLOADS,
    tags: ["package-downloads"],
  }
);

/**
 * Get package downloads with date range with optimized caching
 */
export const getPackageDownloadsWithRange = cache(
  async (packageName: string, startDate: string, endDate: string) => {
    try {
      if (!packageName || !startDate || !endDate) {
        throw new Error("Package name, start date, and end date are required");
      }

      const searchQuery = new URLSearchParams({
        packageName: packageName,
        startDate: startDate,
        endDate: endDate,
      }).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/downloads?${searchQuery}`,
        {
          signal: AbortSignal.timeout(25000),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch package downloads with range: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching package downloads with range:", err);
      throw err;
    }
  },
  ["package-downloads-range"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.DOWNLOADS,
    tags: ["package-downloads-range"],
  }
);

/**
 * Get NPM package data with optimized caching
 */
export const getNPMPackageData = cache(
  async (packageName: string) => {
    try {
      if (!packageName) {
        throw new Error("Package name is required");
      }

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/proxy/npm?project=${encodeURIComponent(packageName)}`,
        {
          signal: AbortSignal.timeout(20000),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch NPM package data: ${res.statusText}`
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
 * Get NPM package data with owner and repo with optimized caching
 */
export const getNPMPackageDataWithOwner = cache(
  async (packageName: string, owner: string, repo: string) => {
    try {
      if (!packageName || !owner || !repo) {
        throw new Error("Package name, owner, and repo are required");
      }

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/proxy/npm?project=${encodeURIComponent(
          packageName
        )}&owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
        {
          signal: AbortSignal.timeout(20000),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch NPM package data with owner: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching NPM package data with owner:", err);
      throw err;
    }
  },
  ["npm-package-data-owner"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.NPM_DATA,
    tags: ["npm-package-data-owner"],
  }
);

/**
 * Get GitHub package data with optimized caching
 */
export const getGitHubPackageData = cache(
  async (packageName: string, owner: string, repo: string) => {
    try {
      if (!packageName || !owner || !repo) {
        throw new Error("Package name, owner, and repo are required");
      }

      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/proxy/github?project=${encodeURIComponent(
          packageName
        )}&owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
        {
          signal: AbortSignal.timeout(20000),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch GitHub package data: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching GitHub package data:", err);
      throw err;
    }
  },
  ["github-package-data"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.GITHUB_DATA,
    tags: ["github-package-data"],
  }
);

/**
 * Get vulnerability score with optimized caching
 */
export const getVulnerabilityScore = cache(
  async (name: string, version: string) => {
    try {
      if (!name || !version) {
        throw new Error("Package name and version are required");
      }

      const params = new URLSearchParams({
        name: name,
        version: version,
      }).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/vulnerability-score?${params}`,
        {
          signal: AbortSignal.timeout(25000),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            `Failed to fetch vulnerability score: ${res.statusText}`
        );
      }

      return await res.json();
    } catch (err) {
      console.error("Error fetching vulnerability score:", err);
      throw err;
    }
  },
  ["vulnerability-score"],
  {
    revalidate: API_CONFIG.CACHE_DURATIONS.SECURITY_SCORE,
    tags: ["vulnerability-score"],
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
        `${
          process.env.NEXT_PUBLIC_APP_URL
        }/api/proxy/scan?project=${encodeURIComponent(
          packageName
        )}&owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
        {
          signal: AbortSignal.timeout(25000),
        }
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
