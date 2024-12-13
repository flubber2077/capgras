import Layout from '../components/Layout'
import { getCollections } from 'outstatic/server'
import Link from 'next/link'
import Header from '@/components/Header'

export default async function Index() {
  return (
    <Layout>
      <Header />
      <div className="m8x-auto max-w-6xl px-5">
        <section>{collections}</section>
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
