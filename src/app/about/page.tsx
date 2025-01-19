import { getMetadataOfVolume } from '@/lib/mdxutils'

export default async function About() {
  const workers = await getData()
  const formattedWorkers = workers.map((worker, i) => {
    return (
      <section className="mx-12" key={i}>
        <h2>{worker.author.toLocaleUpperCase()}</h2>
        <p className="leading-7">{worker.content}</p>
      </section>
    )
  })

  return (
    <article className="prose mx-auto mt-56 max-w-2xl bg-white px-3 text-center">
      <p className="mx-auto max-w-lg italic leading-6">
        Capgras syndrome, or delusion of doubles, is a misidentification
        syndrome. It is characterized by a false belief that an identical
        duplicate has replaced someone significant to the patient. In Capgras
        Syndrome, the imposter can also replace an inanimate object or an
        animal.
      </p>
      <div className="mt-32 flex">{formattedWorkers}</div>
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
