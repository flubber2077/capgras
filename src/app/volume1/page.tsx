import Link from 'next/link'
import { OstDocument } from 'outstatic'
import { getDocuments } from 'outstatic/server'

export default async function Index() {
  const poems = await getData()
  return (
    <article className="prose grid max-w-none place-items-center prose-h1:mb-0 prose-h1:text-center prose-h3:mt-0">
      <h1>Volume 1</h1>
      <ul className="flex w-full max-w-7xl list-none flex-wrap justify-around p-0 after:flex-auto">
        {poems.map(formatPoemInfoIntoLink)}
      </ul>
    </article>
  )
}

const formatPoemInfoIntoLink = (poem: OstDocument) => {
  return (
    <li key={poem.slug} className="my-0 w-full min-w-64 lg:w-1/2">
      <div className="">
        <Link
          href={`volume1/${poem.slug}`}
          className="flex min-h-20 justify-center no-underline hover:underline"
        >
          <h3 className="flex-1 text-right">{poem.author?.name}</h3>
          <h2 className="ml-3 flex-2">{poem.title}</h2>
        </Link>
      </div>
    </li>
  )
}

async function getData() {
  const posts = getDocuments('volume1', ['title', 'slug', 'author'])

  return posts
}
