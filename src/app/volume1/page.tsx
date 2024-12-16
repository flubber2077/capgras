import Header from '@/components/Header'
import Link from 'next/link'
import { getDocuments } from 'outstatic/server'

export default async function Index() {
  const poems = await getData()
  const list = poems.map((poem) => {
    const link = `volume1/${poem.slug}`
    return (
      <div key={poem.slug}>
        <Link href={link} className="hover:underline">
          <h2>{poem.author?.name}</h2>
          <h1>{poem.title}</h1>
        </Link>
      </div>
    )
  })
  return (
    <div className="h-screen bg-slate-300">
      <Header />
      <article className="grid place-items-center">{list}</article>
    </div>
  )
}

async function getData() {
  const posts = getDocuments('volume1', ['title', 'slug', 'author'])

  return posts
}
