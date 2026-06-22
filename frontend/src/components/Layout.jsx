import Footer from './Footer';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="app-shell">
      <div className="ambient ambient--top" />
      <div className="ambient ambient--bottom" />
      <Navbar />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
