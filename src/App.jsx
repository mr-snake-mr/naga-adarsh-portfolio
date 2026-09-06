import TopBar from './components/TopBar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import CnnLab from './components/CnnLab';
import ClientWork from './components/ClientWork';
import Proof from './components/Proof';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">skip to content</a>
      <TopBar />
      <main id="main">
        <Hero />
        <Projects />
        <CnnLab />
        <ClientWork />
        <Proof />
      </main>
      <Footer />
    </div>
  );
}
