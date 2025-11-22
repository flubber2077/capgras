// oxlint-disable max-lines-per-function
// oxlint-disable require-await
// oxlint-disable sort-keys
import { Feed } from 'feed';
import { writeFileSync } from 'fs';
import type { getDataOfAllVolumes } from './mdxutils';
import { capitalize } from 'es-toolkit';
import { getFullName, numberToWrittenWord } from './utils';

export const generateRss = async (input: Awaited<ReturnType<typeof getDataOfAllVolumes>>) => {
  const feed = new Feed({
    title: 'Capgras Mag',
    description: 'A Literary Journal of Undiagnosable Writing',
    id: 'https://capgrasmag.com',
    link: 'https://capgrasmag.com',
    language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
    copyright: 'All rights reserved',
  });

  input.forEach(({ meta, entries }, index) => {
    feed.addItem({
      title: `Capgras Volume ${capitalize(numberToWrittenWord(input.length - index))}`,
      link: 'https://www.capgrasmag.com/volumes',
      date: new Date(meta?.date as string ?? undefined),
      description: `with works from ${entries.map(({frontmatter}) => getFullName(frontmatter)).join(', ')}`,
      contributor: entries.map(({ frontmatter }) => ({
        name: getFullName(frontmatter),
      })),
    });
  });

  writeFileSync('./public/rss.xml', feed.rss2());

  return feed;
};
