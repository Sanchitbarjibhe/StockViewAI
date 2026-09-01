import type { MetadataRoute } from 'next';

const isLive = process.env.NEXT_PUBLIC_APP_SOURCE === 'LIVE';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function robots(): MetadataRoute.Robots {
    if (!isLive || !siteUrl) {
        return { rules: { userAgent: '*', disallow: '/' } };
    }

    return {
        rules: { userAgent: '*', allow: '/' },
        sitemap: `${siteUrl.replace(/\/$/, '')}/sitemap.xml`,
    };
}
