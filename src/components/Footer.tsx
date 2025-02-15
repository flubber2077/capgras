import { url } from 'inspector';

const Footer = () => {
  return (
    <div className="top-0 mx-auto mt-4 flex w-full items-center justify-center pb-4 pt-2 perspective-normal">
      <h2
        style={{ filter: 'url(#turbulence)' }}
        className=" -scale-y--100 -rotate-x-20 font-header text-5xl tracking-wide text-slate-800 transition-all duration-500 hover:tracking-widest hover:duration-200 sm:text-8xl md:text-9xl"
      >
        CAPGRAS
      </h2>
      <svg className="size-0">
        <filter id="turbulence" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            id="sea-filter"
            numOctaves="1"
            seed="2"
            baseFrequency="0.02 0.05"
          />
          <feDisplacementMap scale="20" in="SourceGraphic" />
          <animate
            xlinkHref="#sea-filter"
            attributeName="baseFrequency"
            dur="60s"
            keyTimes="0;0.5;1"
            values="0.02 0.06;0.04 0.08;0.02 0.06"
            repeatCount="indefinite"
          />
        </filter>
      </svg>
    </div>
  );
};

export default Footer;
