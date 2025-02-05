import { getMetadataOfVolume } from '@/lib/mdxutils'
import { textFont, titleFont } from '../fonts'

export default async function About() {
  const workers = await getData()
  const formattedWorkers = workers.map((worker, i) => {
    return (
      <section className="mx-4 max-w-sm md:max-w-xs" key={i}>
        <div className="">
          <h2 className={`${titleFont.className} mt-8 text-3xl text-slate-700`}>
            {worker.author}
          </h2>
        </div>
        <p
          className={`leading-6 ${textFont.className} mt-8 text-xl text-slate-700`}
        >
          {worker.content}
        </p>
      </section>
    )
  })

  return (
    <article className="mx-auto max-w-3xl px-3 text-center">
      <p
        className={`${textFont.className} mx-auto my-20 max-w-lg text-2xl leading-6 text-slate-700`}
      >
        Capgras, or delusion of doubles, is a misidentification syndrome. It is
        characterized by a false belief that an identical duplicate has replaced
        someone significant to the patient. In Capgras Syndrome, the imposter
        can also replace an inanimate object or an animal.
      </p>
      <div className="flex flex-wrap justify-around">{formattedWorkers}</div>
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
