import { subTitleFont } from '@/app/fonts'
import Link from 'next/link'

export async function Navbar({ enticeVolume }: { enticeVolume: boolean }) {
  const links = formatDataIntoLinks(enticeVolume)
  return (
    <div className="mx-auto max-w-xl">
      <ul className="mx-auto flex justify-around p-0 md:justify-between">
        {links}
      </ul>
      <hr className="mx-2 md:mx-0" />
    </div>
  )
}

async function formatDataIntoLinks(enticeVolume: boolean | undefined) {
  return [
    { link: '', display: 'Home' },
    { link: 'volume-1', display: 'Volumes' },
    { link: 'about', display: 'About' }
  ].map((page) => (
    <li
      key={page.link}
      className={`my-1 pl-0 ${enticeVolume ? 'even:animate-breathe' : ''}`}
    >
      <Link
        className="no-underline hover:underline"
        href={{ pathname: `/${page.link}` }}
      >
        <h2 className={`mb-0 text-4xl not-italic ${subTitleFont.className}`}>
          {page.display}
        </h2>
      </Link>
    </li>
  ))
}
