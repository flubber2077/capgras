import Footer from './Footer';
import Header from './Header';
import { Navbar } from './Navbar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <nav>
        <Header />
        <Navbar enticeVolume={false} />
      </nav>
      <main className="h-max w-full flex-auto pt-3">{children}</main>
      <Footer/>
    </>
  );
};

export default Layout;
