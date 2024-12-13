import Header from '@/components/Header'
import Link from 'next/link'
import { getDocuments } from 'outstatic/server'

export default async function Index() {
  const poems = await getData()
  const list = poems.map((poem) => {
    const link = `volume1/${poem.slug}`
    return (
      <h1 key={poem.slug}>
        <Link href={link}>{poem.title}</Link>
      </h1>
    )
  })
  return (
    <>
      <Header />
      {list}
    </>
  )
}

async function getData() {
  const posts = getDocuments('volume1', ['title', 'slug'])

  return posts
}
