import { formatCollections, getCollections } from '@/lib/mdxutils'
import Link from 'next/link'

export default async function Index() {
  const collections = await getCollections()
  const links = formatDataIntoLinks(collections)
  return (
    <main className="prose:max-w-none prose:text-center prose prose-ul:list-none mx-auto mt-10 list-none p-5 text-center text-xl backdrop-blur-xl">
      <h1 className="font-header mb-20 text-8xl font-medium text-slate-800">
        CAPGRAS
      </h1>
      <article>
        <ul className="p-0">{links}</ul>
      </article>
    </main>
  )
}

async function formatDataIntoLinks(collections: string[]) {
  return formatCollections(collections).map((page) => (
    <li key={page.link} className="pl-0">
      <Link
        className="no-underline hover:underline"
        href={{ pathname: `/${page.link}` }}
      >
        <h2 className="mb-0 mt-8">{page.display}</h2>
      </Link>
    </li>
  ))
}
