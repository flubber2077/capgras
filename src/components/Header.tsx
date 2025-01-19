import Link from 'next/link'

const Header = () => {
  // cleanup tailwind
  return (
    <div className="top-0 mx-auto mt-4 flex w-full items-center justify-center py-2">
      <Link
        href="/"
        className="border-solid pb-2 text-5xl tracking-wide transition-all duration-300 will-change-transform hover:tracking-widest"
      >
        <h2 className="font-header font-thin">Capgras</h2>
      </Link>
    </div>
  )
}

export default Header
