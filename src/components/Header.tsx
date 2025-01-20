import Link from 'next/link'

const Header = () => {
  // cleanup tailwind
  return (
    <div className="top-0 mx-auto mt-4 flex w-full items-center justify-center py-2">
      <Link
        href="/"
        className="pb-2 text-5xl tracking-wide transition-all duration-500 hover:tracking-widest hover:duration-200 sm:text-8xl md:text-9xl"
      >
        <h2 className="font-header font-thin">CAPGRAS</h2>
      </Link>
    </div>
  )
}

export default Header
