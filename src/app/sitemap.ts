import { MetadataRoute } from "next";
import { getAllPopularPackages } from "@/services/supbase";

/**
 * The function `sitemap` generates a sitemap with links to the main site URL and popular package URLs.
 * @returns An array of objects representing links in a sitemap, with each object containing a URL and
 * lastModified date.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
    },
  ];

  const packages: any = await getAllPopularPackages();

  if (packages && packages.length > 0) {
    packages?.forEach((packageName: any) => {
      links.push({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/package/${packageName?.package_id}`,
        lastModified: new Date(packageName?.updated_at),
      });
    });
  }

  return links;
}
