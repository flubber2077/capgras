import Link from 'next/link'

const Header = () => {
  // cleanup tailwind
  return (
    <div className="top-0 mx-auto mt-4 flex w-full items-center justify-center py-2">
      <Link
        href="/"
        className="pb-2 tracking-wide transition-all duration-500 hover:tracking-widest hover:duration-200"
      >
        <h2 className="font-header text-5xl font-thin not-italic sm:text-8xl md:text-9xl">
          CAPGRAS
        </h2>
      </Link>
    </div>
  )
}

export default Header
