import Link from 'next/link'

const Header = () => {
  return (
    <nav className="flex items-center justify-between">
      <ul className="flex  flex-auto justify-around text-lg">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="javascript:history.back()" className="hover:underline">
            Back
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header
