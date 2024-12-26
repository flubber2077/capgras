import { getMetadataOfVolume } from '@/lib/mdxutils'
import Link from 'next/link'

export default async function Index() {
  const poems = await getData()
  return (
    <article className="prose grid max-w-none place-items-center prose-h1:mb-0 prose-h1:text-center prose-h3:mt-0">
      <h1>Volume 1</h1>
      <ul className="flex w-full max-w-7xl list-none flex-wrap justify-around p-0 after:flex-auto">
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
    <li key={slug} className="my-0 w-full min-w-64 lg:w-1/2">
      <div className="">
        <Link
          href={`volume-1/${poem.slug}`}
          className="flex min-h-20 justify-center no-underline hover:underline"
        >
          <h3 className="flex-1 text-right">{`${frontmatter.firstName} ${frontmatter.lastName}`}</h3>
          <h2 className="ml-3 flex-2">{frontmatter.title}</h2>
        </Link>
      </div>
    </li>
  )
}

async function getData() {
  return await getMetadataOfVolume('volume-1')
}
