import Image from 'next/image';

import Header from '@/components/Header';
import { Navbar } from '@/components/Navbar';

import LandingImage from '../../public/images/Stereograph.webp';

export default function Index() {
  return (
    <main className="flex grow flex-col mix-blend-multiply">
      <Header />
      <Navbar enticeVolume />
      <div className="py-auto mx-auto mt-10 mb-14 flex max-h-175 max-w-xl grow items-center px-10">
        <Image
          src={LandingImage}
          alt="stereoscopic red/blue image of a parlor in 1901, with a woman sitting viewing a stereograph, from Library of Congress"
          height={517.33}
          width={496}
          loading="eager"
          sizes="(max-width: 600px) 80vw, 33vw"
        />
      </div>
    </main>
  );
}
