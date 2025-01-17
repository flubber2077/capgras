import { getMDX, getSlugsFromFolder } from '@/lib/mdxutils'
import { notFound } from 'next/navigation'

interface Params {
  params: Promise<{ slug: string }>
}

export default async function Poem({ params }: Params) {
  const { content, frontmatter } = await getData((await params).slug)
  const { title, description } = frontmatter
  return (
    <article className="prose w-full max-w-full">
      <section className="mx-auto max-w-4xl px-5">
        <h1 className="my-12 text-2xl italic">{title}</h1>
          {content}
        <hr className="mt-48 border-zinc-500" />
        <p  className="my-10 leading-5" dangerouslySetInnerHTML={{__html: description || 'placeholder'}}></p>
      </section>
    </article>
  )
}

async function getData(slug: string) {
  try {
    return await getMDX('volume-1', slug)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    notFound()
  }
}

export async function generateStaticParams() {
  return await getSlugsFromFolder('volume-1')
}

// export async function generateMetadata(params: Params): Promise<Metadata> {
//   const poem = await getData(params)

//   if (!poem) return {}

//   const { title, description, slug, coverImage } = poem
//   const url = absoluteUrl(`/posts/${slug}`)
//   const imageUrl = absoluteUrl(coverImage || '/images/title-placeholder.png')

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       type: 'article',
//       url,
//       images: [
//         {
//           url: imageUrl,
//           width: 1200,
//           height: 630,
//           alt: title
//         }
//       ]
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title,
//       description,
//       images: imageUrl
//     }
//   }
// }
