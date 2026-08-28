import type { MetadataRoute } from 'next';

const isLive = process.env.NEXT_PUBLIC_APP_SOURCE === 'LIVE';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
    if (!isLive || !siteUrl) {
        return [];
    }

    return [
        {
            url: siteUrl.replace(/\/$/, ''),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
    ];
}
