import Header from '@/components/Header'
import Link from 'next/link'
import { getDocuments } from 'outstatic/server'

export default async function Index() {
  const poems = await getData()
  const list = poems.map((poem) => {
    const link = `volume1/${poem.slug}`
    return (
      <li
        key={poem.slug}
        className="w-full min-w-64 px-10 md:w-1/2"
      >
        <Link href={link} className="hover:underline">
          <h3>{poem.author?.name}</h3>
          <h2>{poem.title}</h2>
        </Link>
      </li>
    )
  })
  return (
    <div>
      <Header />
      <article className="prose grid max-w-none place-items-center prose-h1:mb-0 prose-h1:text-center prose-h3:mt-0">
        <h1>Volume 1</h1>
        <ul className="flex w-full max-w-7xl list-none flex-wrap justify-around p-0 after:flex-auto">
          {list}
        </ul>
      </article>
    </div>
  )
}

async function getData() {
  const posts = getDocuments('volume1', ['title', 'slug', 'author'])

  return posts
}
