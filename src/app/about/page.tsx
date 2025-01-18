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
      <p>
        Capgras syndrome, or dulusion of doubles, is a misidentification
        syndrome. It is characterized by a false beliefe that an identical
        duplicate has replaced someone significant to the patient. In Capgras
        Syndrome, the imposter can also replace an inanimate object or an
        animal.
      </p>
      {formattedWorkers}
    </article>
  )
}

async function getData() {
  const data = await getMetadataOfVolume('about')

  return data
    .sort(
      (a, b) =>
        a.frontmatter.lastName.charCodeAt(0) -
        b.frontmatter.lastName.charCodeAt(0)
    )
    .map((data) => {
      const { frontmatter } = data
      const { lastName, firstName, description, title } = frontmatter
      return { author: `${firstName} ${lastName}`, title, content: description }
    })
}
