import getLocationsSitemap from '@/lib/queries/locations/getLocationsSitemap';
import getPagesSitemap from '@/lib/queries/pages/getPagesSitemap';
import { formatLastmod } from '@/lib/utils';

export default async function sitemap() {
    const pages = await getPagesSitemap();
    const pageSitemap = pages
        .filter((page) => {
            return page?.yoast_head_json?.robots?.index === 'index';
        })
        .map((page) => {
            return {
                url: page.link,
                lastModified: formatLastmod(page?.modified),
                changeFrequency: 'monthly',
                priority: 1,
            };
        });

    const locations = await getLocationsSitemap();
    const locationsSitemap = locations
        .filter((page) => {
            return page?.yoast_head_json?.robots?.index === 'index';
        })
        .map((page) => {
            return {
                url: page.link,
                lastModified: formatLastmod(page?.modified),
                changeFrequency: 'monthly',
                priority: 1,
            };
        });

    return [...pageSitemap, ...locationsSitemap];
}
