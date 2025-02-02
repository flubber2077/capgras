import { getMDX, getSlugsFromFolder } from '@/lib/mdxutils'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Params {
  params: Promise<{ slug: string }>
}

export default async function Poem({ params }: Params) {
  const { content, frontmatter } = await getData((await params).slug)
  const { title, description, subtitle, firstName, lastName } = frontmatter
  const fullName = `${firstName} ${lastName}`
  return (
    <article className="prose mt-32 w-full max-w-full">
      <section className="mx-auto max-w-4xl px-5">
        <div className="">
          <h1 className="">{fullName}</h1>
          <h2 className="mb-0 mt-4">{title}</h2>
          {subtitle ? <h3 className="mb-10 mt-0">{subtitle}</h3> : null}
        </div>
        {content}
        <hr className="mx-auto mt-48 h-0.5 max-w-xl rounded-full border-0 bg-rose-800" />
        <p
          className=""
          dangerouslySetInnerHTML={{
            __html: `<b>${fullName}</b> ` + (description || 'placeholder')
          }}
        />
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

export async function generateMetadata(params: Params): Promise<Metadata> {
  const poem = await getData((await params.params).slug)

  if (!poem) return {}

  const { title, description, firstName, lastName } = poem.frontmatter
  const name =
    firstName.length + lastName.length < 15
      ? `${firstName} ${lastName}`
      : lastName

  return {
    title: `${name} | Capgras Mag`,
    authors: { name }
  }
}
