import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import LandingImage from '../../public/images/Stereograph.webp';
import Header from '@/components/Header';

export default function Index() {
  return (
    <main className="flex flex-grow flex-col mix-blend-multiply">
      <Header />
      <Navbar enticeVolume={true} />
      <div className="py-auto mx-auto mt-10 mb-14 flex max-h-[700px] max-w-xl flex-grow items-center px-10">
        <Image
          src={LandingImage}
          // TODO:
          alt="stereoscopic red/blue image of a parlor in 1901, with a woman sitting viewing a stereograph, from Library of Congress"
          placeholder="blur"
        />
      </div>
    </main>
  );
}
