import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getDataOfAllVolumes, getMDX, type PoemLocation } from '@/lib/mdxutils';

export async function generateStaticParams(): Promise<PoemLocation[]> {
  const volumes = await getDataOfAllVolumes();
  return volumes.flatMap(({ entries: poems }, i) => {
    const volumeNumber = volumes.length - i;
    return poems.map(({ urlTitle }) => ({
      urlTitle,
      volume: volumeNumber.toString(),
    }));
  });
}

interface Params {
  params: Promise<PoemLocation>;
}

const formatting = {
  Brady: '[&_p]:text-justify max-w-112',
  Tretbar: '[&_p]:text-justify',
};

function formatChild(input: string) {
  if (input in formatting) {
    return formatting[input as keyof typeof formatting];
  }
  return '';
}

const parseToHtml = (input: string) => ({ __html: input });

export default async function Poem({ params }: Params) {
  const awaitedParams = await params;
  const { content, frontmatter } = await getData(awaitedParams);
  const {
    title = 'missing title data',
    description = 'placeholder',
    subtitle,
    firstName = 'firstname',
    lastName = 'lastname',
  } = frontmatter;

  const formatting = formatChild(lastName);
  const fullName = `${firstName} ${lastName}`;

  return (
    <article className="mt-32 w-full max-w-full">
      <section className="mx-auto max-w-4xl px-5">
        <TitleAndAuthor title={title} subtitle={subtitle} fullName={fullName} />
        <div className={formatting}>{content}</div>
        <hr className="mx-auto mt-48 h-0.5 max-w-xl" />
        <p
          // allows links in the description
          dangerouslySetInnerHTML={parseToHtml(
            `<b>${fullName}</b> ${description}`,
          )}
        />
      </section>
    </article>
  );
}

function TitleAndAuthor({
  title,
  subtitle,
  fullName,
}: {
  title: string;
  subtitle?: string;
  fullName?: string;
}) {
  return (
    <div className="flex flex-col">
      <h1 className="mb-4" dangerouslySetInnerHTML={parseToHtml(title)} />
      <h2 className="order-first">{fullName || 'missing author data'}</h2>
      {subtitle ? (
        <h3 dangerouslySetInnerHTML={parseToHtml(subtitle)} />
      ) : undefined}
    </div>
  );
}

const getData = (location: PoemLocation) =>
  // oxlint-disable-next-line prefer-await-to-then
  getMDX(location).catch(() => notFound());

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const poem = await getData(await params);

  if (!poem) {
    return {};
  }

  const { firstName, lastName } = poem.frontmatter;
  const name =
    firstName.length + lastName.length < 15
      ? `${firstName} ${lastName}`
      : lastName;

  return { authors: { name }, title: `${name} | Capgras Mag` };
}
