import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import LandingImage from '../../public/images/Landing.webp';
import Header from '@/components/Header';

export default function Index() {
  return (
    <main className="mix-blend-multiply">
      <Header />
      <Navbar enticeVolume={true} />
      <div className="mx-auto my-10 max-w-3xl px-10">
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
