'use client';
/* eslint-disable react-perf/jsx-no-new-object-as-prop */
import { useScroll } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';

const Header = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="top-0 mt-4 flex w-full pt-2">
      <motion.div
        style={{
          scaleX: scrollYProgress,
          height: 5,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          originX: 0,
          position: 'fixed',
          backgroundColor: '#447',
        }}
      />
      <Link href="/" className="mx-auto no-underline">
        <h2 className="font-header text-5xl tracking-wide text-slate-800 transition-all duration-500 hover:duration-200 motion-safe:hover:tracking-widest sm:text-8xl md:text-9xl">
          CAPGRAS
        </h2>
      </Link>
    </div>
  );
};

export default Header;
