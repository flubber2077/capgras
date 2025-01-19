import { formatCollections, getCollections } from '@/lib/mdxutils'
import Link from 'next/link'

export async function Navbar() {
  const collections = await getCollections()
  const links = formatDataIntoLinks(collections)
  return (
    <ul className="prose mx-auto flex w-2/3 max-w-xl justify-between p-0">
      {links}
    </ul>
  )
}

async function formatDataIntoLinks(collections: string[]) {
  return formatCollections(collections)
    .concat({ link: '', display: 'Home' })
    .map((page) => (
      <li key={page.link} className="pl-0 my-1">
        <Link
          className="no-underline hover:underline"
          href={{ pathname: `/${page.link}` }}
        >
          <h2 className="mb-0 mt-1">{page.display}</h2>
        </Link>
      </li>
    ))
    .reverse()
}
