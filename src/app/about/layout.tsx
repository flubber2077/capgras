import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Navbar } from '@/components/Navbar';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <nav className="mix-blend-multiply">
        <Header />
        <Navbar enticeVolume={true} />
      </nav>
      <main className="h-max w-full flex-auto pt-3 mix-blend-multiply">
        {children}
      </main>
      <Footer />
    </>
  );
}

export const metadata: Metadata = {
  title: 'About',
};
