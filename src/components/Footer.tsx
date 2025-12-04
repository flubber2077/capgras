const style = { filter: 'url(#turbulence)' };

const startXFreq = 0.02;
const startYFreq = 0.04;
const startFreq = `${startXFreq} ${startYFreq}`;
const finalFreq = `${startXFreq * 2} ${startYFreq * 2}`;

const Footer = () => (
  <div className="top-0 mt-2 flex w-full pb-4 perspective-normal">
    <h2
      style={style}
      className="-scale-y--100 font-header mx-auto rotate-x-10 text-5xl tracking-wide text-slate-800 transition-all duration-500 hover:duration-200 motion-safe:hover:tracking-widest sm:text-8xl md:text-9xl"
    >
      CAPGRAS
    </h2>
    <svg className="size-0">
      <filter id="turbulence" colorInterpolationFilters="sRGB">
        <feTurbulence
          id="sea-filter"
          numOctaves="1"
          baseFrequency={startFreq}
        />
        <feDisplacementMap scale="10" in="SourceGraphic" />
        <animate
          xlinkHref="#sea-filter"
          attributeName="baseFrequency"
          dur="60s"
          values={`${startFreq};${finalFreq};${startFreq}`}
          repeatCount="indefinite"
        />
      </filter>
    </svg>
  </div>
);

export default Footer;
