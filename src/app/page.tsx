import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import LandingImage from '../../public/images/Landing.webp'
import Header from '@/components/Header'

export default async function Index() {
  return (
    <main className='mix-blend-multiply'>
      <Header />
      <Navbar enticeVolume={true} />
      <Image
        src={LandingImage}
        // TODO:
        alt="pic of two people"
        placeholder="blur"
        className="mx-auto mt-12 max-w-3xl p-5"
      />
    </main>
  )
}
