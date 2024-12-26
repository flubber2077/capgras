import { getMetadataOfVolume } from '@/lib/mdxutils'

export default async function About() {
  const workers = await getData()
  const formattedWorkers = workers.map((worker, i) => {
    return (
      <section key={i}>
        <h2>{worker.author}</h2>
        <h3>{worker.title}</h3>
        <p>{worker.content}</p>
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
  const data = await getMetadataOfVolume('about')

  return data.map((data) => {
    const { frontmatter } = data
    const { lastName, firstName, description, title } = frontmatter
    return { author: `${firstName} ${lastName}`, title, content: description }
  })
}
