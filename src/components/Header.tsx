import Link from 'next/link'

const Header = () => {
  // cleanup tailwind
  return (
    <nav className="top-0 mx-auto flex w-full items-center justify-center py-2">
      <Link
        href="/"
        className="pb-2 text-5xl tracking-wide transition-all duration-300 will-change-transform hover:tracking-widest"
      >
        <h2 className="font-header font-thin">Capgras</h2>
      </Link>
    </nav>
  )
}

export default Header
