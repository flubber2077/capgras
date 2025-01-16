import { formatCollections, getCollections } from '@/lib/mdxutils'
import Link from 'next/link'

export default async function Index() {
  const collections = await getCollections()
  const links = formatDataIntoLinks(collections)
  return (
    <main className="prose:max-w-none prose:text-center prose mx-auto mt-10 list-none text-center text-xl backdrop-blur-xl prose-ul:list-none">
      <h1 className="mb-20 font-header text-6xl font-medium text-slate-800 sm:text-8xl">
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
