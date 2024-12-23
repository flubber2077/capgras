import Link from 'next/link'

const Header = () => {
  return (
    <nav className="sticky top-0 mb-5 flex w-full items-center justify-center bg-white pb-1 shadow-sm">
      <Link href="/" className="text-3xl font-extrabold">
        <h2 className="drop-shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:duration-0">
          Capgras
        </h2>
      </Link>
    </nav>
  )
}

export default Header
