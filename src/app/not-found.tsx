/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Link from 'next/link';
import Image from 'next/image';
import guys from '../../public/images/1778632.svg';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-5xl">
        <Image src={guys as StaticImport} alt="" width={600} />
        <h1 className="mb-3 text-center">404 - Not Found</h1>
        <p className="mt-3 text-center">
          Could not find requested resource
          <br />
          <Link href="/">Return Home</Link>
        </p>
      </div>
    </div>
  );
}
