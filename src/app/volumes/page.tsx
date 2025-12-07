/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { capitalize } from 'es-toolkit';
import * as motion from 'motion/react-client';
import Link from 'next/link';

import type PoemData from '@/interfaces/poem';
import { getDataOfAllVolumes, type PoemLocation } from '@/lib/mdxutils';
import { numberToWrittenWord } from '@/lib/utils';

import { textFont } from '../fonts';

export default async function Index() {
  const volumes = await getDataOfAllVolumes();
  const formatted = volumes.map(({ entries }, i) => (
    // should this be an ordered list filled with unordered lists? check accessibility i guess
    <div className="mx-auto" key={i}>
      <h1 className="text-center text-3xl font-semibold underline">
        Volume {capitalize(numberToWrittenWord(volumes.length - i))}
      </h1>
      <ul className="max-w-7xl list-none flex-wrap justify-around p-0">
        {entries
          .toSorted(sortPoems)
          .map((poem, j) => formatPoemInfoIntoLink(poem, i, j))}
      </ul>
    </div>
  ));
  return (
    <article className="mx-auto mt-6 grid place-items-center">
      {formatted}
    </article>
  );
}

const formatPoemInfoIntoLink = (
  { urlTitle, volume, frontmatter }: Poem,
  volumeNumber: number,
  j: number,
) => {
  return (
    <motion.li
      key={urlTitle}
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        delay: 0.05 * (volumeNumber * 10 + j),
        duration: 0.5,
        type: 'spring',
        bounce: 0.4,
      }}
      className="my-1.5 min-w-64 p-0 text-center"
    >
      <Link
        href={`volumes/${volume}/${urlTitle}`}
        style={textFont.style}
        className="text-xl no-underline hover:underline"
      >
        {`${frontmatter.firstName} ${frontmatter.lastName}`}
      </Link>
    </motion.li>
  );
};

interface Poem extends PoemLocation {
  frontmatter: PoemData;
  urlTitle: string;
}

function sortPoems(a: Poem, b: Poem) {
  const aLast = a.frontmatter.lastName;
  const bLast = b.frontmatter.lastName;
  if (aLast < bLast) {
    return -1;
  }
  if (aLast > bLast) {
    return 1;
  }
  return 0;
}
