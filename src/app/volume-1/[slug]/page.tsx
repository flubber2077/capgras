import { getMDX, getSlugsFromFolder } from '@/lib/mdxutils'
import { notFound } from 'next/navigation'

interface Params {
  params: Promise<{ slug: string }>
}

export default async function Poem({ params }: Params) {
  const { content, frontmatter } = await getData((await params).slug)
  const { title, lastName, firstName, description } = frontmatter

  return (
    <article className="prose w-full max-w-full">
      <section className="mx-auto w-fit max-w-4xl px-5">
        <h1 className="mb-0">{title}</h1>
        <h2 className="mt-0">{`${firstName} ${lastName}`}</h2>
        {content}
        <hr className="mt-48" />
        <p className="">{description}</p>
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
