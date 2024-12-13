import Link from 'next/link'

const Header = () => {
  return (
    <nav className="layout flex items-center justify-between py-4">
      <ul className="flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="javascript:history.back()" className="hover:underline">
            Back
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
