import { notFound } from "next/navigation";
import getPagesUris from "@/lib/queries/pages/getPagesUris";
import getPageId from "@/lib/queries/pages/getPageId";
import getPageMeta from "@/lib/queries/pages/getPageMeta";
import ComponentRenderer from "@/lib/ComponentRenderer";
import getPage from "@/lib/queries/pages/getPage";
import Header from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import getLocationsSlugs from "@/lib/queries/locations/getLocationsSlugs";
import getLocationData from "@/lib/queries/locations/getLocationData";
import getLocationMeta from "@/lib/queries/locations/getLocationMeta";

export async function generateStaticParams() {
  const pages = await getLocationsSlugs();

  const params = pages
    .filter((p) => p.slug.at(0))
    .map((page) => {
      return {
        slug: page.slug,
      };
    });

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const location = await getLocationData({ slug });

  if (location) {
    const metadata = await getLocationMeta({ slug });
    return {
      title: metadata.title,
      description: metadata.description || "",
      robots: {
        index: metadata.robots.index,
        follow: metadata.robots.follow,
      },
    };
  }
}

export default async function Location({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  const location = await getLocationData({ slug });

  switch (location?.template) {
    case "page-legal.php":
      return <>Hier folgt das Legal-Template!</>;
    case "page-blog.php":
      return <>Hier folgt das Blog-Template!</>;
    default:
      return (
        <main
          className={cn(
            location?.acf?.channel === "customer" && "bg-customer-bg",
            location?.acf?.channel === "partner" && "bg-partner-bg"
          )}
        >
          <Header channel={location?.acf?.channel} />
          <ComponentRenderer content={location?.acf?.content} title={location?.title.rendered} />
        </main>
      );
  }
}
