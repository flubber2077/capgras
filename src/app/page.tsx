import { getCollections } from 'outstatic/server'
import Link from 'next/link'

export default function Index() {
  return (
    <article className="prose:max-w-none prose:text-center prose mx-auto mt-10 list-none p-5 text-center text-xl backdrop-blur-xl prose-ul:list-none">
      <h1 className="mb-20 text-slate-500">CAPGRAS</h1>
      <section>
        <ul className="p-0">{collections}</ul>
      </section>
    </article>
  )
}

const collections = getCollections()
  .filter((d) => d !== 'masthead')
  .concat('about')
  .map((d) => (
    <li key={d} className="pl-0">
      <Link className="hover:underline" href={{ pathname: `/${d}` }}>
        <h2>{d}</h2>
      </Link>
    </li>
  ))
