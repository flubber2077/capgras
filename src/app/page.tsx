import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import TitlePageImage from '../../public/images/TitlePageImage.jpg'
import Header from '@/components/Header'

export default async function Index() {
  return (
    <main className="mx-auto">
      <Header />
      <Navbar />
      <Image
        src={TitlePageImage}
        alt="pic of two people"
        placeholder="blur"
        className="mx-auto mt-12"
      />
    </main>
  )
}
