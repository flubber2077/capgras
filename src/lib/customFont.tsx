import { comfortaaFont, courierFont, firaSansFont } from '@/app/fonts';

type FontProps = React.PropsWithChildren<{className: string}>;

export const Courier = ({ children, className }: FontProps) => (
  <span className={`${courierFont.className} ${className}`}>{children}</span>
);

export const Comfortaa = ({ children, className }: FontProps)=> (
  <span className={`${comfortaaFont.className} ${className}`}>{children}</span>
);

export const FiraSans = ({ children, className }: FontProps) => (
  <span className={`${firaSansFont.className} ${className}`}>{children}</span>
);
