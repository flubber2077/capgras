import { getMetadataOfVolume } from '@/lib/mdxutils';
import Link from 'next/link';
import { textFont } from '../fonts';

export default async function Index() {
  const poems = await getData();
  return (
    <article className="mt-12 grid max-w-none place-items-center">
      <h1 className="text-2xl font-semibold">Volume One</h1>
      <ul className="mt-4 max-w-7xl list-none flex-wrap justify-around p-0">
        {poems.sort(sortPoems).map(formatPoemInfoIntoLink)}
      </ul>
    </article>
  );
}

function formatPoemInfoIntoLink(poem: Poem) {
  const { slug, frontmatter } = poem;
  return (
    <li key={slug} className="my-1.5 min-w-64 p-0 text-center">
      <Link
        href={`volume-1/${poem.slug}`}
        className={`text-xl no-underline hover:underline ${textFont.className}`}
      >
        {`${frontmatter.firstName} ${frontmatter.lastName}`}
      </Link>
    </li>
  );
}

type Poem = Awaited<ReturnType<typeof getData>>[number];

function sortPoems(a: Poem, b: Poem) {
  const aLast = a.frontmatter.lastName;
  const bLast = b.frontmatter.lastName;
  if (aLast < bLast) return -1;
  if (aLast > bLast) return 1;
  return 0;
}

async function getData() {
  return await getMetadataOfVolume('volume-1');
}
