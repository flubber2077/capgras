import Link from 'next/link'

const Header = () => {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <ul className="flex flex-auto justify-around text-lg">
        <li>
          <Link href="/" className="hover:underline">
            Capgras
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
