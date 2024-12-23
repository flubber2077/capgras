import markdownToHtml from '@/lib/markdownToHtml'
import { load } from 'outstatic/server'

export default async function About() {
  const workers = await getData()
  const formattedWorkers = workers.map((worker, i) => {
    return (
      <section key={i}>
        <h2>{worker.author?.name}</h2>
        <h3>{worker.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: worker.content }} />
      </section>
    )
  })

  return (
    <article className="prose mx-auto w-1/2 max-w-7xl bg-white px-3">
      {formattedWorkers}
    </article>
  )
}

async function getData() {
  const db = await load()
  const results = await db
    .find({ collection: 'masthead' }, [
      'title',
      'author',
      'coverImage',
      'content'
    ])
    .toArray()

  const workers = await Promise.all(
    results.map(async (result) => {
      const { author, coverImage, title } = result
      const content = await markdownToHtml(result.content)
      return { content, author, coverImage, title }
    })
  )
  return workers
}
