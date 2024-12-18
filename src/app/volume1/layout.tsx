import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function HeaderFooterLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
