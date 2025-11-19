import { getDataOfVolume } from '@/lib/mdxutils';
import { titleFont } from '../fonts';

export default async function About() {
  const workers = await getData();
  const formattedWorkers = workers.map((worker, i) => (
    <section className="mx-4 max-w-sm md:max-w-xs" key={i}>
      <div>
        <h2 style={titleFont.style} className="mt-8 text-3xl text-slate-700">
          {worker.author}
        </h2>
      </div>
      <p className="mt-4 text-xl leading-6 text-slate-700">{worker.content}</p>
    </section>
  ));

  return (
    <article className="mx-auto max-w-3xl px-3 text-center">
      <p className="mx-auto my-20 max-w-lg text-2xl leading-6 text-slate-700 italic">
        Capgras, or a “delusion of doubles”, is a misidentification syndrome. It
        is characterized by a false belief that a sinister duplicate has
        replaced someone or something significant to its beholder.
        <br />
        <br />
        Capgras is also a literary journal that hosts undiagnosable writing. The
        pieces published here seek to pry their glitched mirrors open.
      </p>
      <div className="flex flex-wrap justify-around">{formattedWorkers}</div>
    </article>
  );
}

async function getData() {
  const data = await getDataOfVolume('about');
  return data
    .toSorted(
      (a, b) =>
        a.frontmatter.lastName.codePointAt(0)! -
        b.frontmatter.lastName.codePointAt(0)!,
    )
    .map(({ frontmatter }) => {
      const { lastName, firstName, description, title } = frontmatter;
      return {
        author: `${firstName} ${lastName}`,
        content: description,
        title,
      };
    });
}
