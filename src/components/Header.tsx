import Link from 'next/link'

const Header = () => {
  return (
    <nav className="sticky top-0 mx-auto flex w-full max-w-6xl items-center justify-center bg-slate-700 py-2 shadow-sm">
      <Link href="/" className="text-3xl font-extrabold">
        <h2 className="pb-2 text-slate-50 drop-shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-0.5 active:translate-y-0 active:duration-0">
          Capgras
        </h2>
      </Link>
    </nav>
  )
}

export default Header
