import Link from 'next/link'

const Header = () => {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <ul className="flex flex-auto justify-around">
        <li className="">
          <Link href="/" className="text-3xl font-extrabold">
            <h2 className="drop-shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:duration-0">
              Capgras
            </h2>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
