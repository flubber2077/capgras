import Header from '@/components/Header'
import markdownToHtml from '@/lib/markdownToHtml'
import { load } from 'outstatic/server'

export default async function About() {
  const workers = await getData()
  const formattedWorkers = workers.map((worker, i) => {
    return (
      <>
        <h2 key={i}>{worker.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: worker.content }} />
      </>
    )
  })

  return (
    <>
      <Header />
      <article>
        <p>test</p>
        {formattedWorkers}
      </article>
    </>
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
