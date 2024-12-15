import Layout from '../components/Layout'
import { getCollections } from 'outstatic/server'
import Link from 'next/link'

import backgroundImage from '../../public/images/5krajasx.bmp'

export default function Index() {

  return (
    <Layout>
      <div
        className="grid h-screen place-items-center bg-black"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: '200px',
          backgroundPosition: '50vw'
        }}
      >
        <div className="mx-auto max-w-lg p-5 text-center font-serif text-5xl text-slate-600 subpixel-antialiased backdrop-blur-xl">
          <section className='hover:underline'>
            <ul>{collections}</ul>
          </section>
        </div>
      </div>
    </Layout>
  )
}

const collections = getCollections()
  .filter((d) => d !== 'masthead')
  .map((d) => (
    <li key={d}>
      <Link href={{ pathname: `/${d}` }}>{d}</Link>
    </li>
  ))
