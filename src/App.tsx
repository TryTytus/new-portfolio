import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HackerAboutSection from './components/HackerAboutSection';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CyberMatrixBackground from './components/CyberMatrixBackground';

function App() {
  return (
    <div className="bg-background-dark min-h-screen text-text-light selection:bg-cta/30 selection:text-cta scanlines relative">
      <CyberMatrixBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        {/* <HackerAboutSection /> */}
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
