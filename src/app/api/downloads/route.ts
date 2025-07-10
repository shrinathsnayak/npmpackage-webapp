import { NextRequest, NextResponse } from "next/server";
import { generateAPIOptions } from "@/constants/services.constants";

export const maxDuration = 60; // 60 seconds timeout

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const packageName = searchParams.get("packageName");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!packageName) {
      return NextResponse.json(
        { error: "Package name is required" },
        { status: 400 }
      );
    }

    const options = generateAPIOptions(packageName);
    const requestObj: Record<string, string> = { packageName };

    if (startDate) requestObj.startDate = startDate;
    if (endDate) requestObj.endDate = endDate;
    const searchQuery = new URLSearchParams(requestObj);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 55000); // 55 second timeout

    const response = await fetch(
      `${process.env.API_ENDPOINT}/downloads?${searchQuery}`,
      {
        ...options,
        signal: controller.signal,
        next: {
          revalidate: 300, // Cache for 5 minutes
          tags: [`downloads-${packageName}-${startDate}-${endDate}`],
        },
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching package download stats:", err);

    if (err instanceof Error && err.name === "AbortError") {
      return NextResponse.json(
        { error: "Request timeout - external API took too long to respond" },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch download statistics" },
      { status: 500 }
    );
  }
}
