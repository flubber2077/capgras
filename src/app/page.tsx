import Layout from '../components/Layout'
import { getCollections } from 'outstatic/server'
import Link from 'next/link'

import backgroundImage from '../../public/images/5krajasx.bmp'

export default function Index() {
  return (
    <Layout>
      <div
        className="grid h-screen place-items-center"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: '200px',
          backgroundPosition: '50vw'
        }}
      >
        <article className="prose prose-ul:list-none prose:max-w-none mx-auto p-5 text-xl backdrop-blur-xl list-none">
          <h1 className="mb-20 text-slate-500">CAPGRAS</h1>
          <section>
            <ul>{collections}</ul>
          </section>
        </article>
      </div>
    </Layout>
  )
}

const collections = getCollections()
  .filter((d) => d !== 'masthead')
  .map((d) => (
    <li key={d}>
      <Link
        className="prose prose-invert hover:underline"
        href={{ pathname: `/${d}` }}
      >
        <h2>{d}</h2>
      </Link>
    </li>
  ))
