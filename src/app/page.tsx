import { Navbar } from '@/components/Navbar'
import Image from 'next/image'
import TitlePageImage from '../../public/images/TitlePageImage.jpg'

export default async function Index() {
  return (
    <main className="prose:max-w-none prose:text-center prose mx-auto mt-10 list-none text-center text-xl backdrop-blur-xl prose-ul:list-none">
      <h1 className="mb-20 font-header text-6xl font-medium text-slate-800 sm:text-8xl">
        CAPGRAS
      </h1>
      <Navbar/>
      <Image src={TitlePageImage} alt="pic of two people" placeholder='blur'/>
    </main>
  )
}
