import { getCollections } from '@/lib/mdxutils'
import Link from 'next/link'

export default async function Index() {
  return (
    <main className="prose:max-w-none prose:text-center prose mx-auto mt-10 list-none p-5 text-center text-xl backdrop-blur-xl prose-ul:list-none">
      <h1 className="mb-20 text-slate-800">CAPGRAS</h1>
      <article>
        <ul className="p-0">{collections}</ul>
      </article>
    </main>
  )
}

const collections = (await getCollections())
  .sort()
  .reverse()
  .concat('test')
  .map((d) => (
    <li key={d} className="pl-0">
      <Link
        className="no-underline hover:underline"
        href={{ pathname: `/${d.replaceAll(' ', '')}` }}
      >
        <h2 className="mb-0 mt-8">{d}</h2>
      </Link>
    </li>
  ))
