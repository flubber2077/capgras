import { getDocumentBySlug, getDocumentSlugs } from 'outstatic/server'
import { notFound } from 'next/navigation'
import markdownToHtml from '@/lib/markdownToHtml'
import { OstDocument } from 'outstatic'
import Layout from '@/components/Layout'
import Header from '@/components/Header'
import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/utils'

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
  const poem = getDocumentBySlug('volume1', params.slug, includeParameters)

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

export async function generateMetadata(params: Params): Promise<Metadata> {
  const poem = await getData(params)

  if (!poem) return {}

  const { title, description, slug, coverImage } = poem
  const url = absoluteUrl(`/posts/${slug}`)
  const imageUrl = absoluteUrl(coverImage || '/images/og-image.png')

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl
    }
  }
}
