import { useEffect } from 'react'; // 4.1k (gzipped: 1.8k)
import Aos from 'aos';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './components/UI/Hero';
import Services from './components/UI/Services';
import Portfolio from './components/UI/Portfolio';
import Contact from './components/UI/Contact'


import './App.css';

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  return <>
  <Header/>
  <main>
    <Hero/>
    <Services/>
    <Portfolio />
    <Contact />
  </main>
  <Footer/>
  </>
}

export default App;
