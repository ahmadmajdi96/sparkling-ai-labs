import { Navbar } from '@/components/Navbar';
import { WebGLBackground } from '@/components/WebGLBackground';
import { Hero } from '@/components/Hero';
import { NeuralAdvantages } from '@/components/NeuralAdvantages';
import { NeuralPortals } from '@/components/NeuralPortals';
import { CTASection } from '@/components/CTASection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <Hero />
      <NeuralAdvantages />
      <NeuralPortals />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
