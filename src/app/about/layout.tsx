import Header from '@/components/Header'
import { Navbar } from '@/components/Navbar'
import { Metadata } from 'next'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <nav>
        <Header />
        <Navbar enticeVolume={true} />
      </nav>
      <main className="h-max w-full flex-auto pt-3">{children}</main>
    </>
  )
}

export const metadata: Metadata = {
  title: 'About'
}
