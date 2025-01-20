import { } from '@/lib/mdxutils'
import Link from 'next/link'

export async function Navbar() {
  const links = formatDataIntoLinks()
  return (
    <ul className="prose mx-auto flex max-w-xl justify-around p-0 md:justify-between">
      {links}
    </ul>
  )
}

async function formatDataIntoLinks() {
  return [{ link: '', display: 'Home' },{ link: 'volume-1', display: 'Volumes' },{ link: 'about', display: 'About' } ]
    .map((page) => (
      <li key={page.link} className="my-1 pl-0">
        <Link
          className="no-underline hover:underline"
          href={{ pathname: `/${page.link}` }}
        >
          <h2 className="mb-0 mt-1 not-italic">{page.display}</h2>
        </Link>
      </li>
    ))
}
