import Header from './Header'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="mx-auto h-max w-full flex-auto pt-3">
        {children}
      </main>
    </>
  )
}

export default Layout
