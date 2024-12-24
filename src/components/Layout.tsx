import Footer from './Footer'
import Header from './Header'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="mx-auto h-max w-full max-w-6xl flex-auto bg-white pt-3">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
