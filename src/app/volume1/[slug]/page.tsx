import { getDocumentSlugs, load } from 'outstatic/server'
import { notFound } from 'next/navigation'
import markdownToHtml from '@/lib/markdownToHtml'
import { OstDocument } from 'outstatic'
import Layout from '@/components/Layout'
import Header from '@/components/Header'

type Poem = {
  tags: { value: string; label: string }[]
} & OstDocument

interface Params {
  params: { slug: string }
}

export default async function Poem(params: Params) {
  const poem = await getData(params)

  return (
    <Layout>
      <div>
        <Header />
        <article>
          <h1>{poem.title}</h1>
          <div>{poem.author?.name || ''}</div>
          <div>
            <div dangerouslySetInnerHTML={{ __html: poem.content }} />
          </div>
        </article>
      </div>
    </Layout>
  )
}

async function getData({ params }: Params) {
  const includeParameters = [
    'title',
    'description',
    'slug',
    'author',
    'content',
    'tags'
  ]
  // const poem = getDocumentBySlug('volume1', params.slug, includeParameters)
  const db = await load()
  const poem = await db
    .find({ collection: 'volume1', slug: params.slug }, includeParameters)
    .first()

  if (!poem) {
    notFound()
  }

  const content = await markdownToHtml(poem.content)

  return { ...poem, content }
}

export async function generateStaticParams() {
  const poems = getDocumentSlugs('volume1')
  return poems.map((slug) => ({ slug }))
}
