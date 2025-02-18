import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import LandingImage from '../../public/images/Stereograph.jpg';
import Header from '@/components/Header';

export default function Index() {
  return (
    <main className="flex flex-grow flex-col mix-blend-multiply">
      <Header />
      <Navbar enticeVolume={true} />
      <div className="py-auto mx-auto max-h-[700px] mt-10 mb-14 flex max-w-xl flex-grow items-center px-10">
        <Image
          src={LandingImage}
          // TODO:
          alt="negative image of a pair of hands clasped with index fingers almost touching"
          placeholder="blur"
          className="shadow-sm"
        />
      </div>
    </main>
  );
}
