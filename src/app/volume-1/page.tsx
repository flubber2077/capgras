import { getMetadataOfVolume } from '@/lib/mdxutils'
import Link from 'next/link'

export default async function Index() {
  const poems = await getData()
  return (
    <article className="prose grid max-w-none place-items-center prose-h1:mb-0 prose-h1:text-center prose-h3:mt-0">
      <h1>Volume 1</h1>
      <ul className="mt-0 flex w-full max-w-7xl list-none flex-wrap justify-around p-0">
        {poems.sort(sortPoems).map(formatPoemInfoIntoLink)}
      </ul>
    </article>
  )
}

type Poem = Awaited<ReturnType<typeof getData>>[number]

function sortPoems(a: Poem, b: Poem) {
  const aLast = a.frontmatter.lastName
  const bLast = b.frontmatter.lastName
  if (aLast < bLast) return -1
  if (aLast > bLast) return 1
  return 0
}

function formatPoemInfoIntoLink(poem: Poem) {
  const { slug, frontmatter } = poem
  return (
    <li key={slug} className="my-0 min-h-32 w-full min-w-64 p-6 pl-0 md:w-1/2">
      <Link
        href={`volume-1/${poem.slug}`}
        className="my-auto flex flex-col text-center no-underline hover:underline"
      >
        <h2 className="my-0">{frontmatter.title}</h2>
        <h3 className="my-0">{`${frontmatter.firstName} ${frontmatter.lastName}`}</h3>
      </Link>
    </li>
  )
}

async function getData() {
  return await getMetadataOfVolume('volume-1')
}
