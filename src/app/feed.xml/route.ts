import { getDataOfAllVolumes } from '@/lib/mdxutils';
import { generateRss } from '@/lib/rssUtil';

export const dynamic = 'force-static';

export async function GET() {
  const data = await getDataOfAllVolumes();

  const rss = generateRss(data);

  return new Response(rss.rss2(), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
