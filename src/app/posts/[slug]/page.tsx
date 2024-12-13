import Image from 'next/image'
import { Metadata } from 'next'
import { OstDocument } from 'outstatic'
import Header from '@/components/Header'
import Layout from '@/components/Layout'
import markdownToHtml from '@/lib/markdownToHtml'
import { getDocumentSlugs, load } from 'outstatic/server'
import DateFormatter from '@/components/DateFormatter'
import { absoluteUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Post = {
  tags: { value: string; label: string }[]
} & OstDocument

interface Params {
  params: {
    slug: string
  }
}

export async function generateMetadata(params: Params): Promise<Metadata> {
  const post = await getData(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: absoluteUrl(`/posts/${post.slug}`),
      images: [
        {
          url: absoluteUrl(post?.coverImage || '/images/og-image.png'),
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: absoluteUrl(post?.coverImage || '/images/og-image.png')
    }
  }
}

export default async function Post(params: Params) {
  const post = await getData(params)
  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-5">
        <Header />
        <article className="mb-32">
          <div className="relative mb-2 h-52 w-full sm:mx-0 md:mb-4 md:h-96">
            <Image
              alt={post.title}
              src={post?.coverImage || ''}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          {Array.isArray(post?.tags)
            ? post.tags.map(({ label }) => (
                <span
                  key="label"
                  className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {label}
                </span>
              ))
            : null}
          <h1 className="font-primary mb-2 text-2xl font-bold md:text-4xl">
            {post.title}
          </h1>
          <div className="hidden text-slate-600 md:mb-12 md:block">
            Written on <DateFormatter dateString={post.publishedAt} /> by{' '}
            {post.author?.name || ''}.
          </div>
          <hr className="my-10 border-neutral-200" />
          <div className="mx-auto max-w-2xl">
            <div
              className="prose lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </Layout>
  )
}

async function getData({ params }: Params) {
  const db = await load()

  const post = await db
    .find<Post>({ collection: 'posts', slug: params.slug }, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage',
      'tags'
    ])
    .first()

  if (!post) {
    notFound()
  }

  const content = await markdownToHtml(post.content)

  return {
    ...post,
    content
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('posts')
  return posts.map((slug) => ({ slug }))
}
