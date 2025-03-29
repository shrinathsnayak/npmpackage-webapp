import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/package/",
      },
      {
        userAgent: "*",
        allow: "/sponsor",
      },
      {
        userAgent: "*",
        disallow: "/_next/*",
      },
      {
        userAgent: "*",
        disallow: "/*",
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
