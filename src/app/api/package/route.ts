import { NextRequest, NextResponse } from "next/server";
import { generateAPIOptions } from "@/constants/services.constants";

export const maxDuration = 60; // 60 seconds timeout

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageName = searchParams.get("q");

    if (!packageName) {
      return NextResponse.json(
        { error: "Package name is required" },
        { status: 400 }
      );
    }

    const options = generateAPIOptions(packageName);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55 second timeout

    const res = await fetch(
      `${process.env.API_ENDPOINT}/package?q=${packageName}`,
      {
        ...options,
        signal: controller.signal,
        next: {
          revalidate: 300, // Cache for 5 minutes
          tags: [`package-${packageName}`],
        },
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return NextResponse.json(data);
    } else {
      const text = await res.text();
      throw new Error(`Response is not valid JSON: ${text}`);
    }
  } catch (err) {
    console.error("Error fetching package data:", err);

    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timeout - external API took too long to respond" },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch package data" },
      { status: 500 }
    );
  }
}
