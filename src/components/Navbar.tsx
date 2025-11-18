import { subTitleFont } from '@/app/fonts';
import Link from 'next/link';

export function Navbar({ enticeVolume }: { enticeVolume: boolean }) {
  const links = formatDataIntoLinks(enticeVolume);
  return (
    <div className="mx-auto w-full max-w-xl">
      <ul className="mx-auto flex justify-around p-0 md:justify-between">
        {links}
      </ul>
      <hr className="mx-2 md:mx-0" />
    </div>
  );
}

const linkToHref = (link: string) => ({ pathname: `/${link}` });

function formatDataIntoLinks(enticeVolume: boolean) {
  return [
    { display: 'Home', link: '' },
    { display: 'Volumes', link: 'volumes' },
    { display: 'About', link: 'about' },
  ].map((page) => (
    <li
      key={page.link}
      className={`my-1 pl-0 ${enticeVolume ? 'motion-safe:even:animate-breathe' : ''}`}
    >
      <Link
        className="no-underline hover:underline"
        href={linkToHref(page.link)}
      >
        <h2
          style={subTitleFont.style}
          className="mb-0 text-2xl not-italic md:text-4xl"
        >
          {page.display}
        </h2>
      </Link>
    </li>
  ));
}
